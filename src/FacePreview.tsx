type Points = Record<string, { x: number; y: number }>;

export const FacePreview = ({ points, size = 120 }: { points: Points; size?: number }) => {
  const scale = size / 240;
  const s = (v: number) => v * scale;
  const p = (k: string) => points[k] ?? { x: 0, y: 0 };

  const linePairs: [string, string][] = [
    ["e", "f"], ["g", "h"], ["i", "j"], ["k", "l"], ["m", "n"], ["o", "p"],
  ];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block" }}>
      {/* bg */}
      <rect width={size} height={size} fill="#0000f8" />
      {/* shadow */}
      <polygon
        points={["a","b","c","d"].map((k) => `${s(p(k).x)+2},${s(p(k).y)+2}`).join(" ")}
        fill="#840084"
      />
      {/* head */}
      <polygon
        points={["a","b","c","d"].map((k) => `${s(p(k).x)},${s(p(k).y)}`).join(" ")}
        fill="#00fc00"
        stroke="#000000"
        strokeWidth={scale * 1}
      />
      {/* face lines */}
      {linePairs.map(([a, b]) => (
        <line
          key={a+b}
          x1={s(p(a).x)} y1={s(p(a).y)}
          x2={s(p(b).x)} y2={s(p(b).y)}
          stroke="#000000"
          strokeWidth={scale * 2}
        />
      ))}
      {/* eyes */}
      {["q", "r"].map((k) => (
        <circle key={k} cx={s(p(k).x)} cy={s(p(k).y)} r={s(10)} fill="#000000" />
      ))}
    </svg>
  );
};
