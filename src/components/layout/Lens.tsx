import { useId } from "react";
import { cn } from "@/lib/utils";

const NAME = "VISUAL STUDIOS PLUS ✦ CREATIVE AGENCY ✦ COLOMBO ✦ ";
const SCALE = ["∞", "10", "5", "3", "2", "1.5", "1.2", "1", "0.8", "0.7m"];

/** Centre of the 400×400 viewBox. */
const C = 200;

const ring = (r: number) => `M${C},${C} m-${r},0 a${r},${r} 0 1,1 ${r * 2},0 a${r},${r} 0 1,1 -${r * 2},0`;
const polar = (r: number, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  // Rounded so server and browser render identical markup (no hydration mismatch).
  return [Math.round((C + r * Math.cos(a)) * 100) / 100, Math.round((C + r * Math.sin(a)) * 100) / 100] as const;
};

/** Six-blade iris as a hexagon of the given radius. */
const iris = (r: number) =>
  Array.from({ length: 6 }, (_, i) => polar(r, i * 60 + 30))
    .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");

/**
 * A camera lens seen from the front: knurled grip and the company name rolling
 * in opposite directions, a focus scale that pulls back and forth, coated glass
 * with reflections, and a six-blade iris that opens onto the VS+ mark.
 * Pure SVG + CSS animations (no JS per frame). `iris` controls the aperture
 * animation: "open" plays the opening once, "idle" breathes gently.
 */
export function Lens({ className, iris: mode = "open", irisDuration = 1.1 }: { className?: string; iris?: "open" | "idle"; irisDuration?: number }) {
  const uid = useId().replace(/:/g, "");
  const textPath = `lens-name-${uid}`;
  const glass = `lens-glass-${uid}`;
  const coat = `lens-coat-${uid}`;
  const clip = `lens-clip-${uid}`;
  const irisMask = `lens-iris-${uid}`;
  const timing = mode === "open" ? { animationDuration: `${irisDuration}s` } : undefined;

  return (
    <svg viewBox="0 0 400 400" className={cn("lens block", className)} aria-hidden>
      <defs>
        <path id={textPath} d={ring(156)} />
        <radialGradient id={glass} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1d221d" />
          <stop offset="55%" stopColor="#0b0d0b" />
          <stop offset="100%" stopColor="#020302" />
        </radialGradient>
        {/* Anti-reflective coating sheen: green-violet like real multicoated glass */}
        <linearGradient id={coat} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#dfff24" stopOpacity="0.55" />
          <stop offset="45%" stopColor="#7b5cff" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#dfff24" stopOpacity="0" />
        </linearGradient>
        <clipPath id={clip}>
          <circle cx={C} cy={C} r="104" />
        </clipPath>
        {/* Iris: dark blades everywhere except a hexagonal opening that grows and twists */}
        <mask id={irisMask} maskUnits="userSpaceOnUse" x="0" y="0" width="400" height="400">
          <rect width="400" height="400" fill="#fff" />
          <polygon className={mode === "open" ? "lens-iris-open" : "lens-iris-idle"} style={timing} points={iris(122)} fill="#000" />
        </mask>
      </defs>

      {/* Barrel */}
      <circle cx={C} cy={C} r="198" fill="#101210" stroke="rgba(255,255,255,0.08)" />

      {/* Knurled grip ring */}
      <g className="lens-spin-slow">
        {Array.from({ length: 96 }, (_, i) => {
          const [x1, y1] = polar(178, i * 3.75);
          const [x2, y2] = polar(194, i * 3.75);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.16)" strokeWidth="2" />;
        })}
      </g>
      <circle cx={C} cy={C} r="174" fill="none" stroke="rgba(255,255,255,0.1)" />

      {/* Company name rolling around the lens */}
      <g className="lens-spin-reverse">
        <text fill="#f4f4f5" fontSize="17" fontWeight="800" letterSpacing="3.1" style={{ fontFamily: "var(--font-display)" }}>
          <textPath href={`#${textPath}`} textLength="975">
            {NAME}
          </textPath>
        </text>
      </g>
      <circle cx={C} cy={C} r="140" fill="#0c0e0c" stroke="rgba(255,255,255,0.12)" />

      {/* Focus distance scale, pulling focus */}
      <g className="lens-focus">
        {SCALE.map((s, i) => {
          const deg = -120 + i * 26;
          const [x, y] = polar(124, deg);
          const [t1x, t1y] = polar(134, deg);
          const [t2x, t2y] = polar(139, deg);
          return (
            <g key={s}>
              <line x1={t1x} y1={t1y} x2={t2x} y2={t2y} stroke="#dfff24" strokeWidth="1.5" />
              <text x={x} y={y} fill={s === "∞" ? "#dfff24" : "rgba(244,244,245,0.75)"} fontSize="10" fontWeight="700" textAnchor="middle" dominantBaseline="middle" style={{ fontFamily: "var(--font-display)" }}>
                {s}
              </text>
            </g>
          );
        })}
      </g>
      {/* Fixed index mark */}
      <path d={`M${C - 5},${C - 145} L${C + 5},${C - 145} L${C},${C - 137} Z`} fill="#dfff24" />

      {/* Glass */}
      <circle cx={C} cy={C} r="108" fill="#050605" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
      <g clipPath={`url(#${clip})`}>
        <circle cx={C} cy={C} r="104" fill={`url(#${glass})`} />

        {/* The mark behind the iris */}
        <g className={mode === "open" ? "lens-mark-open" : undefined} style={timing}>
          <text x={C} y={C + 2} fill="#f4f4f5" fontSize="46" fontWeight="900" textAnchor="middle" dominantBaseline="middle" letterSpacing="-2" style={{ fontFamily: "var(--font-display)" }}>
            VS<tspan fill="#dfff24">+</tspan>
          </text>
        </g>
        <circle cx={C} cy={C} r="104" fill="#0a0b0a" mask={`url(#${irisMask})`} />
        {/* Blade edges */}
        <polygon className={mode === "open" ? "lens-iris-open" : "lens-iris-idle"} style={timing} points={iris(122)} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />

        {/* Coating reflections */}
        <ellipse cx={C - 34} cy={C - 40} rx="58" ry="26" fill={`url(#${coat})`} transform={`rotate(-35 ${C - 34} ${C - 40})`} />
        <circle cx={C + 46} cy={C + 44} r="12" fill="#dfff24" opacity="0.12" />
        <circle cx={C + 28} cy={C - 58} r="4" fill="#fff" opacity="0.5" />
      </g>
    </svg>
  );
}
