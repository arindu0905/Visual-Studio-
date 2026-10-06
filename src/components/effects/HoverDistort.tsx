"use client";

import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `
precision mediump float;
uniform sampler2D uTex;
uniform vec2 uMouse;
uniform vec2 uCover;
uniform float uZoom;
uniform float uHover;
uniform float uTime;
varying vec2 vUv;
void main() {
  // object-fit: cover mapping + base zoom of the underlying <img>
  vec2 uv = (vUv - 0.5) * uCover / uZoom + 0.5;
  // gentle push-in while hovered
  uv = (uv - 0.5) * (1.0 - 0.05 * uHover) + 0.5;
  vec2 delta = vUv - uMouse;
  float d = length(delta);
  vec2 dir = d > 0.0001 ? delta / d : vec2(0.0);
  float falloff = smoothstep(0.55, 0.0, d);
  // liquid ripple travelling outward from the cursor
  uv += dir * sin(d * 26.0 - uTime * 3.2) * 0.010 * uHover * falloff;
  // chromatic split, strongest near the cursor
  float s = 0.007 * uHover * falloff;
  float r = texture2D(uTex, uv + dir * s).r;
  float g = texture2D(uTex, uv).g;
  float b = texture2D(uTex, uv - dir * s).b;
  gl_FragColor = vec4(r, g, b, 1.0);
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  return sh;
}

/**
 * WebGL liquid/RGB-split hover effect for the image it sits next to.
 * Place it as a sibling directly after a next/image `fill` <img>, inside an
 * element marked `data-distort-root` (usually the card link). The GL context is
 * only created while hovered and destroyed afterwards, so dozens of cards cost
 * nothing until touched. Mouse/trackpad only; no-op for touch and reduced motion.
 */
export function HoverDistort() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = canvas?.closest<HTMLElement>("[data-distort-root]");
    const img = canvas?.previousElementSibling as HTMLImageElement | null;
    if (!canvas || !root || !img || img.tagName !== "IMG") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let gl: WebGLRenderingContext | null = null;
    let raf = 0;
    let hover = 0;
    let target = 0;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    let uni: Record<string, WebGLUniformLocation | null> = {};
    const t0 = performance.now();

    const setup = () => {
      if (gl) return true;
      if (!img.complete || !img.naturalWidth) return false;
      gl = canvas.getContext("webgl", { premultipliedAlpha: false, antialias: false });
      if (!gl) return false;
      const prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return false;
      gl.useProgram(prog);
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, "aPos");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      try {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      } catch {
        return false; // cross-origin image — leave the plain <img>
      }
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      for (const n of ["uMouse", "uCover", "uZoom", "uHover", "uTime"]) uni[n] = gl.getUniformLocation(prog, n);
      resize();
      return true;
    };

    const resize = () => {
      if (!gl) return;
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(r.width * dpr));
      canvas.height = Math.max(1, Math.round(r.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      const boxA = r.width / r.height;
      const imgA = img.naturalWidth / img.naturalHeight;
      gl.uniform2f(uni.uCover, boxA > imgA ? 1 : boxA / imgA, boxA > imgA ? imgA / boxA : 1);
      // Account for any CSS scale already on the <img> (e.g. letterbox crop).
      const ir = img.getBoundingClientRect();
      gl.uniform1f(uni.uZoom, Math.max(1, ir.width / r.width));
    };

    const frame = () => {
      if (!gl) return;
      hover += (target - hover) * 0.08;
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;
      gl.uniform1f(uni.uHover, hover);
      gl.uniform2f(uni.uMouse, mouse.x, mouse.y);
      gl.uniform1f(uni.uTime, (performance.now() - t0) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      canvas.style.opacity = "1";
      if (target === 0 && hover < 0.01) {
        teardown();
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    const teardown = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      canvas.style.opacity = "0";
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
      gl = null;
      uni = {};
    };

    const point = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = 1 - (e.clientY - r.top) / r.height;
    };

    const enter = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      point(e);
      mouse.x = mouse.tx;
      mouse.y = mouse.ty;
      target = 1;
      if (setup() && !raf) raf = requestAnimationFrame(frame);
    };
    const leave = () => {
      target = 0;
    };

    root.addEventListener("pointerenter", enter);
    root.addEventListener("pointermove", point);
    root.addEventListener("pointerleave", leave);
    return () => {
      root.removeEventListener("pointerenter", enter);
      root.removeEventListener("pointermove", point);
      root.removeEventListener("pointerleave", leave);
      teardown();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full opacity-0 transition-opacity duration-300"
    />
  );
}
