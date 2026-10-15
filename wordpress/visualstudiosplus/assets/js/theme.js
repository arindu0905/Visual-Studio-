/**
 * Visual Studios Plus — front-end behaviour.
 * Vanilla port of the Next.js site's Framer Motion / React interactions.
 * Everything degrades gracefully: without JS the content is fully visible,
 * and prefers-reduced-motion switches off parallax, autoplay and the cursor.
 */
(function () {
  "use strict";

  var html = document.documentElement;
  var cfg = window.VSP || {};
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = matchMedia("(hover: hover) and (pointer: fine)").matches;

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function pad(n, l) { n = String(n); while (n.length < (l || 2)) n = "0" + n; return n; }

  /** Eases a 2D value towards its target (a light stand-in for Framer springs). */
  function follower(apply, k) {
    var cur = { x: 0, y: 0 }, tgt = { x: 0, y: 0 }, raf = 0;
    function step() {
      cur.x += (tgt.x - cur.x) * k;
      cur.y += (tgt.y - cur.y) * k;
      apply(cur.x, cur.y);
      if (Math.abs(tgt.x - cur.x) > 0.01 || Math.abs(tgt.y - cur.y) > 0.01) raf = requestAnimationFrame(step);
      else { raf = 0; apply(tgt.x, tgt.y); }
    }
    return {
      set: function (x, y) { tgt.x = x; tgt.y = y; if (!raf) raf = requestAnimationFrame(step); },
      jump: function (x, y) { cur.x = tgt.x = x; cur.y = tgt.y = y; apply(x, y); },
    };
  }

  /* ---------------------------------------------------------------------
   * Smooth scrolling (Lenis) for mouse/trackpad; native scroll otherwise.
   * ------------------------------------------------------------------ */
  var lenis = null;
  if (fine && !reduced && window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.1, wheelMultiplier: 1, anchors: { offset: -80 } });
    (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(performance.now());
  }

  var locks = 0;
  function lock() { if (locks++ === 0) { document.body.style.overflow = "hidden"; if (lenis) lenis.stop(); } }
  function unlock() { if (locks > 0 && --locks === 0) { document.body.style.overflow = ""; if (lenis) lenis.start(); } }

  /* ---------------------------------------------------------------------
   * Scroll-linked effects: all reads, then all writes, once per frame.
   * ------------------------------------------------------------------ */
  var tracked = [];
  var ticking = false;
  function track(el, fn) { tracked.push({ el: el, fn: fn, r: null }); }
  function update() {
    ticking = false;
    var vh = window.innerHeight;
    for (var i = 0; i < tracked.length; i++) tracked[i].r = tracked[i].el.getBoundingClientRect();
    for (var j = 0; j < tracked.length; j++) tracked[j].fn(tracked[j].r, vh);
  }
  function requestUpdate() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);

  /* ---------------------------------------------------------------------
   * Intro: preloader once per session, then hero animations.
   * ------------------------------------------------------------------ */
  function introDone() {
    html.classList.add("intro-done");
    document.dispatchEvent(new CustomEvent("vsp:intro"));
  }

  var pre = $(".preloader");
  if (!pre || html.classList.contains("intro-seen") || html.classList.contains("curtain") || getComputedStyle(pre).display === "none") {
    introDone();
  } else {
    lock();
    var count = $(".pl-count", pre), bar = $(".pl-bar", pre), t0 = performance.now(), DURATION = 1500;
    (function tick(t) {
      var p = Math.min(1, (t - t0) / DURATION);
      var n = Math.round((1 - Math.pow(1 - p, 3)) * 100);
      count.textContent = pad(n, 3);
      bar.style.width = n + "%";
      if (p < 1) return requestAnimationFrame(tick);
      try { sessionStorage.setItem("vsp-intro", "1"); } catch (e) {}
      pre.classList.add("is-done");
      unlock();
      setTimeout(introDone, 250);
      setTimeout(function () { pre.remove(); }, 1400);
    })(t0);
  }

  // Incoming-page curtain: remove it once it has lifted.
  if (html.classList.contains("curtain")) {
    setTimeout(function () { html.classList.remove("curtain"); }, 1000);
  }

  // Mark in-site navigations so the next page plays the curtain.
  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
    var u;
    try { u = new URL(a.href, location.href); } catch (err) { return; }
    if (u.origin !== location.origin || (u.pathname === location.pathname && u.search === location.search)) return;
    if (/\/wp-(admin|login)|\.(jpe?g|png|webp|gif|mp4|pdf|zip)$/i.test(u.pathname)) return;
    try { sessionStorage.setItem("vsp-nav", "1"); } catch (err) {}
  });

  /* ---------------------------------------------------------------------
   * Header: condenses after 40px, hides on scroll down, returns on scroll up.
   * ------------------------------------------------------------------ */
  var header = $(".site-header");
  var menuOpen = false;
  if (header) {
    var lastY = window.scrollY;
    track(header, function () {
      var y = window.scrollY;
      header.classList.toggle("is-scrolled", y > 40);
      if (y > 400 && y > lastY + 4 && !menuOpen) header.classList.add("is-hidden");
      else if (y < lastY - 4 || y <= 400) header.classList.remove("is-hidden");
      lastY = y;
    });
  }

  /* Mobile menu with focus trap */
  var toggle = $("[data-menu-toggle]");
  var menu = $("#mobile-menu");
  function setMenu(open) {
    if (!toggle || !menu || open === menuOpen) return;
    menuOpen = open;
    html.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? toggle.dataset.labelClose : toggle.dataset.labelOpen);
    if (open) {
      lock();
      var first = $("a", menu);
      if (first) first.focus({ preventScroll: true });
    } else {
      unlock();
    }
  }
  if (toggle && menu) {
    toggle.addEventListener("click", function () { setMenu(!menuOpen); });
    document.addEventListener("keydown", function (e) {
      if (!menuOpen) return;
      if (e.key === "Escape") { setMenu(false); toggle.focus(); }
      if (e.key === "Tab") {
        var f = [toggle].concat($$("a", menu));
        var i = f.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    });
    matchMedia("(min-width: 64rem)").addEventListener("change", function (m) { if (m.matches) setMenu(false); });
  }

  /* Back to top */
  $$("[data-back-to-top]").forEach(function (b) {
    b.addEventListener("click", function () {
      if (lenis) lenis.scrollTo(0);
      else window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    });
  });

  /* ---------------------------------------------------------------------
   * Reveal on scroll: fades, word splits, image clip wipes.
   * ------------------------------------------------------------------ */
  var io = "IntersectionObserver" in window
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
        });
      }, { rootMargin: "0px 0px -40px 0px" })
    : null;
  function reveal(el) { if (io) io.observe(el); else el.classList.add("is-in"); }
  $$("[data-reveal], [data-split='view'], [data-clip]").forEach(reveal);

  /* Parallax image frames */
  if (!reduced) {
    $$("[data-parallax]").forEach(function (frame) {
      var inner = $(".px-inner", frame);
      var s = parseFloat(frame.getAttribute("data-parallax")) || 12;
      if (!inner) return;
      track(frame, function (r, vh) {
        if (r.bottom < -200 || r.top > vh + 200) return;
        var p = clamp((vh - r.top) / (vh + r.height), 0, 1);
        inner.style.transform = "translate3d(0," + (-s + 2 * s * p).toFixed(3) + "%,0)";
      });
    });
  }

  /* Paragraph whose words light up as it travels through the viewport */
  $$("[data-highlight]").forEach(function (p) {
    if (reduced) return;
    var words = $$(".hl-w", p), n = words.length;
    track(p, function (r, vh) {
      var prog = clamp((0.9 * vh - r.top) / (0.35 * vh + r.height), 0, 1);
      for (var i = 0; i < n; i++) words[i].style.opacity = (0.28 + 0.72 * clamp((prog - i / n) * n, 0, 1)).toFixed(3);
    });
  });

  /* ---------------------------------------------------------------------
   * Hero: background reel, parallax, rotating word.
   * ------------------------------------------------------------------ */
  var hero = $("[data-hero]");
  if (hero) {
    var bg = $(".hero-bg", hero), content = $(".hero-content", hero);
    track(hero, function (r) {
      var p = clamp(-r.top / r.height, 0, 1);
      if (!reduced) {
        bg.style.transform = "translate3d(0," + (25 * p).toFixed(2) + "%,0)";
        content.style.transform = "translate3d(0," + (-30 * p).toFixed(2) + "%,0)";
      }
      content.style.opacity = String(1 - clamp(p / 0.7, 0, 1));
    });

    // Only stream the reel when motion is welcome and the connection allows it,
    // and only after the page has loaded so it never competes with the poster.
    var video = $(".hero-video", hero);
    var conn = navigator.connection;
    if (video && !reduced && !(conn && conn.saveData)) {
      var loop = cfg.loop || [63, 80];
      var startReel = function () {
        setTimeout(function () {
          video.addEventListener("loadedmetadata", function () {
            video.currentTime = loop[0];
            var pr = video.play();
            if (pr && pr.catch) pr.catch(function () {});
          }, { once: true });
          video.addEventListener("playing", function () { video.classList.add("is-playing"); }, { once: true });
          video.addEventListener("timeupdate", function () { if (video.currentTime >= loop[1]) video.currentTime = loop[0]; });
          video.preload = "metadata";
          video.src = video.getAttribute("data-src");
        }, 400);
      };
      if (document.readyState === "complete") startReel();
      else window.addEventListener("load", startReel, { once: true });
    }
  }

  $$("[data-rotate]").forEach(function (wrap) {
    var words = $$(".rw-word", wrap);
    if (reduced || words.length < 2) return;
    var i = 0;
    setInterval(function () {
      var prev = words[i];
      i = (i + 1) % words.length;
      prev.classList.remove("is-active");
      prev.classList.add("is-exit");
      words[i].classList.add("is-active");
      setTimeout(function () {
        // Park the old word below again without animating.
        prev.style.transition = "none";
        prev.classList.remove("is-exit");
        void prev.offsetWidth;
        prev.style.transition = "";
      }, 950);
    }, 2600);
  });

  /* ---------------------------------------------------------------------
   * Showreel: full-screen modal + the inset band that grows to full-bleed.
   * ------------------------------------------------------------------ */
  var modal = $("#showreel-modal");
  if (modal) {
    var mVideo = $("video", modal), mClose = $("[data-reel-close]", modal), prevFocus = null;
    var openReel = function () {
      prevFocus = document.activeElement;
      if (!mVideo.getAttribute("src")) mVideo.src = cfg.showreel;
      modal.classList.add("is-open");
      lock();
      mClose.focus({ preventScroll: true });
      var pr = mVideo.play();
      if (pr && pr.catch) pr.catch(function () {});
    };
    var closeReel = function () {
      if (!modal.classList.contains("is-open")) return;
      modal.classList.remove("is-open");
      mVideo.pause();
      unlock();
      if (prevFocus && prevFocus.focus) prevFocus.focus({ preventScroll: true });
    };
    $$("[data-showreel]").forEach(function (b) { b.addEventListener("click", openReel); });
    modal.addEventListener("click", closeReel);
    mVideo.addEventListener("click", function (e) { e.stopPropagation(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeReel(); });
  }

  $$("[data-reel-band]").forEach(function (wrap) {
    var btn = $(".reel-band", wrap), v = $("video", wrap);
    if (reduced) return;
    track(wrap, function (r, vh) {
      var p = clamp((vh - r.top) / (vh / 2 + r.height / 2), 0, 1);
      var inset = (12 * (1 - p)).toFixed(2), radius = (24 * (1 - p)).toFixed(1);
      btn.style.clipPath = "inset(" + inset + "% " + inset + "% " + inset + "% " + inset + "% round " + radius + "px)";
    });
    if (v && "IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        if (es[0].isIntersecting) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); }
        else v.pause();
      }, { threshold: 0.2 }).observe(v);
    }
  });

  /* ---------------------------------------------------------------------
   * Services index: floating preview that follows the cursor.
   * ------------------------------------------------------------------ */
  $$("[data-service-list]").forEach(function (list) {
    if (!fine) return;
    var preview = $(".sl-preview", list), imgs = $$(".sl-img", list), moved = false;
    var pos = follower(function (x, y) { preview.style.transform = "translate3d(" + x + "px," + y + "px,0)"; }, 0.16);
    var setActive = function (i) {
      preview.classList.toggle("is-active", i !== null);
      imgs.forEach(function (im, j) { im.classList.toggle("is-active", j === i); });
    };
    list.addEventListener("pointermove", function (e) {
      if (!moved) { pos.jump(e.clientX, e.clientY); moved = true; } else pos.set(e.clientX, e.clientY);
    });
    list.addEventListener("pointerleave", function () { setActive(null); });
    $$("a[data-index]", list).forEach(function (a) {
      a.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") setActive(+a.dataset.index); });
      a.addEventListener("focus", function () { setActive(null); });
    });
  });

  /* ---------------------------------------------------------------------
   * Photography reel: endless glide, pause on hover, drag to browse.
   * ------------------------------------------------------------------ */
  $$("[data-reel]").forEach(function (viewport) {
    var track_ = $(".reel-track", viewport);
    var SPEED = 55;
    var offset = 0, speed = reduced ? 0 : SPEED, targetSpeed = speed, visible = false, raf = 0, last = performance.now(), drag = null;
    var half = function () {
      var kids = track_.children, n = kids.length / 2;
      return n ? kids[n].offsetLeft - kids[0].offsetLeft : 0;
    };
    var wrap = function () {
      var h = half();
      if (h <= 0) return;
      while (offset <= -h) offset += h;
      while (offset > 0) offset -= h;
    };
    var apply = function () { track_.style.transform = "translate3d(" + offset + "px,0,0)"; };
    var tick = function (t) {
      var dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      speed += (targetSpeed - speed) * 0.06;
      if (!drag) offset -= speed * dt;
      wrap();
      apply();
      raf = visible ? requestAnimationFrame(tick) : 0;
    };
    var start = function () { if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); } };
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible) start(); }).observe(viewport);
    var pause = function () { targetSpeed = 0; };
    var resume = function () { targetSpeed = reduced ? 0 : SPEED; };

    viewport.addEventListener("pointerdown", function (e) {
      if (e.button !== 0) return;
      drag = { x: e.clientX, offset: offset, moved: false };
      pause();
    });
    window.addEventListener("pointermove", function (e) {
      if (!drag) return;
      var dx = e.clientX - drag.x;
      if (Math.abs(dx) > 6) drag.moved = true;
      offset = drag.offset + dx;
      wrap();
      apply();
    }, { passive: true });
    window.addEventListener("pointerup", function (e) {
      if (!drag) return;
      var moved = drag.moved;
      drag = null;
      if (e.pointerType !== "mouse") resume();
      if (moved) {
        // Swallow the click that follows a drag so it doesn't open a photo.
        var stop = function (ev) { ev.preventDefault(); ev.stopPropagation(); };
        viewport.addEventListener("click", stop, { capture: true, once: true });
        setTimeout(function () { viewport.removeEventListener("click", stop, { capture: true }); }, 50);
      }
    });
    viewport.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") pause(); });
    viewport.addEventListener("pointerleave", function () { drag = null; resume(); });
    viewport.addEventListener("focusin", pause);
    viewport.addEventListener("focusout", resume);
    viewport.addEventListener("dragstart", function (e) { e.preventDefault(); });
    window.addEventListener("resize", function () { wrap(); apply(); });
  });

  /* ---------------------------------------------------------------------
   * Photography archive: filters, load more, lightbox.
   * ------------------------------------------------------------------ */
  var gallery = $("[data-gallery]");
  if (gallery) {
    var PAGE = parseInt(gallery.dataset.page, 10) || 24;
    var filter = gallery.dataset.filter || "all";
    var shown = PAGE;
    var items = $$(".g-item", gallery);
    var tabs = $$(".g-tab", gallery);
    var tabBar = $(".g-tabs", gallery);
    var pill = $(".g-pill", gallery);
    var moreWrap = $(".g-more-wrap", gallery);
    var current = [];

    var movePill = function (animate) {
      var t = tabs.filter(function (x) { return x.dataset.tab === filter; })[0];
      if (!t || !pill) return;
      if (!animate) pill.style.transition = "none";
      pill.style.width = t.offsetWidth + "px";
      pill.style.transform = "translateX(" + t.offsetLeft + "px)";
      if (!animate) { void pill.offsetWidth; pill.style.transition = ""; }
      pill.classList.add("is-ready");
      tabBar.classList.add("pill-ready");
    };

    var render = function (from) {
      current = items.filter(function (it) { return filter === "all" || it.dataset.cat === filter; });
      items.forEach(function (it) { it.classList.add("is-off"); });
      current.forEach(function (it, i) {
        var on = i < shown;
        it.classList.toggle("is-off", !on);
        var num = $(".g-num", it);
        if (num) num.textContent = pad(i + 1, 3);
        if (on && i >= from && !reduced) {
          it.setAttribute("data-reveal", "");
          it.style.setProperty("--d", (i % 3) * 0.06 + "s");
          it.style.setProperty("--ry", "30px");
          it.classList.remove("is-in");
          reveal(it);
        }
      });
      var remaining = current.length - shown;
      moreWrap.classList.toggle("is-visible", remaining > 0);
      $(".g-remaining", gallery).textContent = Math.max(0, remaining);
      requestUpdate();
    };

    tabs.forEach(function (t) {
      t.addEventListener("click", function (e) {
        e.preventDefault();
        filter = t.dataset.tab;
        shown = PAGE;
        tabs.forEach(function (x) { x.setAttribute("aria-pressed", String(x === t)); });
        movePill(true);
        var url = new URL(location.href);
        if (filter === "all") url.searchParams.delete("category");
        else url.searchParams.set("category", filter);
        history.replaceState(null, "", url);
        render(0);
      });
    });
    $(".g-more", gallery).addEventListener("click", function () {
      var from = shown;
      shown += PAGE;
      render(from);
    });
    window.addEventListener("resize", function () { movePill(false); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { movePill(false); });
    movePill(false);
    render(0);

    /* Lightbox */
    var lb = null, lbIndex = 0, lbSlide = null, lbPrevFocus = null;
    var x = '<svg aria-hidden="true" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
    var arrow = function (d) {
      return '<svg aria-hidden="true" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + d + "</svg>";
    };
    var buildLightbox = function () {
      lb = document.createElement("div");
      lb.className = "lightbox fixed inset-0 z-[90] flex flex-col bg-ink/97 backdrop-blur-md";
      lb.setAttribute("role", "dialog");
      lb.setAttribute("aria-modal", "true");
      lb.setAttribute("aria-label", "Photo viewer");
      lb.setAttribute("data-lenis-prevent", "");
      lb.innerHTML =
        '<div class="container-x flex h-20 shrink-0 items-center justify-between">' +
        '<p class="lb-count eyebrow tabular-nums text-bone/70" aria-live="polite"></p>' +
        '<button type="button" class="lb-close inline-flex items-center gap-2 rounded-full border border-bone/30 px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-bone hover:text-ink">Close ' + x + "</button></div>" +
        '<div class="lb-stage relative flex-1 touch-pan-y overflow-hidden">' +
        '<button type="button" aria-label="Previous photograph" class="lb-prev absolute left-3 top-1/2 z-10 hidden size-14 -translate-y-1/2 place-items-center rounded-full border border-bone/20 bg-ink/40 transition-colors hover:bg-bone hover:text-ink md:grid">' + arrow('<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>') + "</button>" +
        '<button type="button" aria-label="Next photograph" class="lb-next absolute right-3 top-1/2 z-10 hidden size-14 -translate-y-1/2 place-items-center rounded-full border border-bone/20 bg-ink/40 transition-colors hover:bg-bone hover:text-ink md:grid">' + arrow('<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>') + "</button></div>";
      document.body.appendChild(lb);
      var stage = $(".lb-stage", lb);
      $(".lb-close", lb).addEventListener("click", closeLightbox);
      $(".lb-prev", lb).addEventListener("click", function (e) { e.stopPropagation(); go(-1); });
      $(".lb-next", lb).addEventListener("click", function (e) { e.stopPropagation(); go(1); });

      // Tap the backdrop to close; swipe/drag to change photo.
      var down = null, swiped = false;
      stage.addEventListener("pointerdown", function (e) { if (e.target.closest("button")) return; down = { x: e.clientX }; swiped = false; });
      stage.addEventListener("pointermove", function (e) {
        if (!down || !lbSlide) return;
        var dx = e.clientX - down.x;
        if (Math.abs(dx) > 6) swiped = true;
        lbSlide.style.transition = "none";
        lbSlide.style.transform = "translate3d(" + dx * 0.4 + "px,0,0)";
      });
      var up = function (e) {
        if (!down) return;
        var dx = e.clientX - down.x;
        down = null;
        if (lbSlide) { lbSlide.style.transition = ""; lbSlide.style.transform = ""; }
        if (dx < -80) go(1);
        else if (dx > 80) go(-1);
      };
      stage.addEventListener("pointerup", up);
      stage.addEventListener("pointercancel", up);
      stage.addEventListener("click", function (e) {
        if (swiped) { swiped = false; return; }
        if (e.target.tagName !== "IMG" && !e.target.closest("button")) closeLightbox();
      });
    };
    var show = function (dir) {
      var it = current[lbIndex], a = $(".g-open", it), img = $("img", it);
      var stage = $(".lb-stage", lb);
      var slide = document.createElement("div");
      slide.className = "lb-slide absolute inset-0 px-4 pb-6 md:px-24 md:pb-10" + (dir ? " is-enter" : "");
      slide.style.setProperty("--dir", dir);
      var im = document.createElement("img");
      im.src = a.dataset.full;
      im.alt = img.alt;
      im.draggable = false;
      im.className = "size-full select-none object-contain";
      slide.appendChild(im);
      stage.insertBefore(slide, stage.firstChild);
      if (lbSlide) {
        var old = lbSlide;
        old.style.setProperty("--dir", dir);
        old.classList.add("is-leave");
        setTimeout(function () { old.remove(); }, 600);
      }
      lbSlide = slide;
      if (dir) { void slide.offsetWidth; slide.classList.remove("is-enter"); }
      $(".lb-count", lb).textContent = pad(lbIndex + 1, 3) + " / " + pad(current.length, 3) + " — " + (a.dataset.label || "");
    };
    var go = function (d) {
      if (!current.length) return;
      lbIndex = (lbIndex + d + current.length) % current.length;
      show(d);
    };
    var onKey = function (e) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    var openLightbox = function (i) {
      if (!lb) buildLightbox();
      lbPrevFocus = document.activeElement;
      lbIndex = i;
      $$(".lb-slide", lb).forEach(function (s) { s.remove(); });
      lbSlide = null;
      show(0);
      void lb.offsetWidth;
      lb.classList.add("is-open");
      lock();
      $(".lb-close", lb).focus({ preventScroll: true });
      document.addEventListener("keydown", onKey);
    };
    function closeLightbox() {
      if (!lb || !lb.classList.contains("is-open")) return;
      lb.classList.remove("is-open");
      document.removeEventListener("keydown", onKey);
      unlock();
      setTimeout(function () { if (!lb.classList.contains("is-open")) $$(".lb-slide", lb).forEach(function (s) { s.remove(); }); }, 400);
      if (lbPrevFocus && lbPrevFocus.focus) lbPrevFocus.focus({ preventScroll: true });
    }
    // Hidden until opened (keeps it out of the accessibility tree).
    var lbHide = function () { if (lb && !lb.classList.contains("is-open")) lb.style.visibility = "hidden"; };
    document.addEventListener("transitionend", function (e) { if (lb && e.target === lb) lbHide(); });

    items.forEach(function (it) {
      var a = $(".g-open", it);
      a.addEventListener("click", function (e) {
        e.preventDefault();
        if (lb) lb.style.visibility = "";
        openLightbox(current.indexOf(it));
      });
    });
  }

  /* ---------------------------------------------------------------------
   * Film page: load the (privacy-enhanced) YouTube player on demand.
   * ------------------------------------------------------------------ */
  $$("[data-video-embed]").forEach(function (box) {
    var id = box.getAttribute("data-video-embed"), btn = $("button", box);
    if (!id || !btn) return;
    btn.addEventListener("click", function () {
      var f = document.createElement("iframe");
      f.className = "absolute inset-0 size-full";
      f.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) + "?autoplay=1&rel=0&modestbranding=1";
      f.title = box.getAttribute("data-title") || "";
      f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      f.allowFullscreen = true;
      box.innerHTML = "";
      box.appendChild(f);
    });
  });

  /* ---------------------------------------------------------------------
   * Contact form: send without leaving the page.
   * ------------------------------------------------------------------ */
  $$("[data-contact-form]").forEach(function (form) {
    var status = $(".form-status", form), btn = $("button[type=submit]", form);
    form.addEventListener("submit", function (e) {
      if (!window.fetch || !cfg.ajaxUrl) return;
      e.preventDefault();
      btn.disabled = true;
      status.textContent = "Sending…";
      fetch(cfg.ajaxUrl, { method: "POST", body: new FormData(form), credentials: "same-origin" })
        .then(function (r) { return r.json(); })
        .then(function (r) {
          status.textContent = (r.data && r.data.message) || "";
          if (r.success) form.reset();
        })
        .catch(function () {
          status.textContent = "Sorry, the message could not be sent. Please email us at " + (cfg.email || "") + ".";
        })
        .then(function () { btn.disabled = false; });
    });
  });

  /* ---------------------------------------------------------------------
   * Pointer niceties (mouse/trackpad only, never with reduced motion).
   * ------------------------------------------------------------------ */
  if (fine && !reduced) {
    /* Magnetic buttons */
    $$("[data-magnetic]").forEach(function (el) {
      var f = follower(function (x, y) { el.style.transform = x || y ? "translate3d(" + x + "px," + y + "px,0)" : ""; }, 0.18);
      el.addEventListener("pointermove", function (e) {
        if (e.pointerType !== "mouse") return;
        var r = el.getBoundingClientRect();
        f.set((e.clientX - (r.left + r.width / 2)) * 0.35, (e.clientY - (r.top + r.height / 2)) * 0.35);
      });
      el.addEventListener("pointerleave", function () { f.set(0, 0); });
    });

    /* 3D tilt with a moving glare */
    $$("[data-tilt]").forEach(function (el) {
      var inner = $(".tilt-inner", el), glare = $(".tilt-glare", el);
      var f = follower(function (px, py) {
        inner.style.transform = "rotateX(" + ((0.5 - py) * 18).toFixed(2) + "deg) rotateY(" + ((px - 0.5) * 18).toFixed(2) + "deg)";
        if (glare) glare.style.background = "radial-gradient(circle at " + (px * 100).toFixed(1) + "% " + (py * 100).toFixed(1) + "%, rgba(255,255,255,0.18), transparent 55%)";
      }, 0.12);
      f.jump(0.5, 0.5);
      el.addEventListener("pointermove", function (e) {
        if (e.pointerType !== "mouse") return;
        var r = el.getBoundingClientRect();
        f.set((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
      });
      el.addEventListener("pointerleave", function () { f.set(0.5, 0.5); });
    });

    /* Custom cursor */
    var cursor = $(".vsp-cursor");
    if (cursor) {
      html.classList.add("has-custom-cursor");
      var label = $(".vsp-cursor-label", cursor), firstMove = true, state = "";
      var LABELS = { view: "View", play: "Play" };
      var cf = follower(function (x, y) { cursor.style.transform = "translate3d(" + x + "px," + y + "px,0)"; }, 0.35);
      window.addEventListener("pointermove", function (e) {
        if (firstMove) { cf.jump(e.clientX, e.clientY); firstMove = false; } else cf.set(e.clientX, e.clientY);
        cursor.classList.add("is-visible");
        var el = e.target instanceof Element ? e.target : null;
        var tagged = el && el.closest("[data-cursor]");
        var next = tagged ? tagged.getAttribute("data-cursor") : el && el.closest("a, button, [role='button'], input, textarea, select, label") ? "link" : "default";
        if (next !== state) {
          state = next;
          cursor.setAttribute("data-state", state);
          if (LABELS[state]) label.textContent = LABELS[state];
        }
      }, { passive: true });
      html.addEventListener("pointerleave", function () { cursor.classList.remove("is-visible"); });
    }

    /* WebGL liquid / RGB-split hover on images. The GL context only exists while hovered. */
    $$("canvas[data-distort]").forEach(initDistort);
  }

  function initDistort(canvas) {
    var root = canvas.closest("[data-distort-root]");
    var img = canvas.previousElementSibling;
    if (!root || !img || img.tagName !== "IMG") return;

    var VERT = "attribute vec2 aPos;varying vec2 vUv;void main(){vUv=aPos*0.5+0.5;gl_Position=vec4(aPos,0.0,1.0);}";
    var FRAG = [
      "precision mediump float;",
      "uniform sampler2D uTex;uniform vec2 uMouse;uniform vec2 uCover;uniform float uZoom;uniform float uHover;uniform float uTime;varying vec2 vUv;",
      "void main(){",
      "vec2 uv=(vUv-0.5)*uCover/uZoom+0.5;",
      "uv=(uv-0.5)*(1.0-0.05*uHover)+0.5;",
      "vec2 delta=vUv-uMouse;float d=length(delta);vec2 dir=d>0.0001?delta/d:vec2(0.0);",
      "float falloff=smoothstep(0.55,0.0,d);",
      "uv+=dir*sin(d*26.0-uTime*3.2)*0.010*uHover*falloff;",
      "float s=0.007*uHover*falloff;",
      "float r=texture2D(uTex,uv+dir*s).r;float g=texture2D(uTex,uv).g;float b=texture2D(uTex,uv-dir*s).b;",
      "gl_FragColor=vec4(r,g,b,1.0);}",
    ].join("\n");

    var gl = null, raf = 0, hover = 0, target = 0, broken = false, uni = {};
    var mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    var t0 = performance.now();

    function compile(type, src) { var sh = gl.createShader(type); gl.shaderSource(sh, src); gl.compileShader(sh); return sh; }
    function fail() { broken = true; teardown(); return false; }

    function setup() {
      if (gl) return true;
      if (broken || !img.complete || !img.naturalWidth) return false;
      gl = canvas.getContext("webgl", { premultipliedAlpha: false, antialias: false });
      if (!gl) return fail();
      var prog = gl.createProgram();
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return fail();
      gl.useProgram(prog);
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      var loc = gl.getAttribLocation(prog, "aPos");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      try {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      } catch (e) {
        return fail(); // cross-origin image (e.g. YouTube poster) — keep the plain <img>
      }
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      ["uMouse", "uCover", "uZoom", "uHover", "uTime"].forEach(function (n) { uni[n] = gl.getUniformLocation(prog, n); });
      resize();
      return true;
    }

    function resize() {
      if (!gl) return;
      var r = canvas.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(r.width * dpr));
      canvas.height = Math.max(1, Math.round(r.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      var boxA = r.width / r.height, imgA = img.naturalWidth / img.naturalHeight;
      gl.uniform2f(uni.uCover, boxA > imgA ? 1 : boxA / imgA, boxA > imgA ? imgA / boxA : 1);
      // Account for any CSS scale already on the <img> (e.g. letterbox crop).
      var ir = img.getBoundingClientRect();
      gl.uniform1f(uni.uZoom, Math.max(1, ir.width / r.width));
    }

    function frame() {
      if (!gl) return;
      hover += (target - hover) * 0.08;
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;
      gl.uniform1f(uni.uHover, hover);
      gl.uniform2f(uni.uMouse, mouse.x, mouse.y);
      gl.uniform1f(uni.uTime, (performance.now() - t0) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      canvas.style.opacity = "1";
      if (target === 0 && hover < 0.01) return teardown();
      raf = requestAnimationFrame(frame);
    }

    function teardown() {
      cancelAnimationFrame(raf);
      raf = 0;
      canvas.style.opacity = "0";
      if (gl) { var ext = gl.getExtension("WEBGL_lose_context"); if (ext) ext.loseContext(); }
      gl = null;
      uni = {};
    }

    function point(e) {
      var r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = 1 - (e.clientY - r.top) / r.height;
    }

    root.addEventListener("pointerenter", function (e) {
      if (e.pointerType !== "mouse") return;
      point(e);
      mouse.x = mouse.tx;
      mouse.y = mouse.ty;
      target = 1;
      if (setup() && !raf) raf = requestAnimationFrame(frame);
    });
    root.addEventListener("pointermove", point);
    root.addEventListener("pointerleave", function () { target = 0; });
  }

  requestUpdate();
})();
