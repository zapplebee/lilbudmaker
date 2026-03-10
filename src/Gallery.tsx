import { useEffect, useState } from "react";
import { FacePreview } from "./FacePreview";

type Face = {
  id: number;
  emo: string | null;
  points: Record<string, { x: number; y: number }>;
};

type Props = {
  onEdit: (face: Face) => void;
};

export const Gallery = ({ onEdit }: Props) => {
  const [faces, setFaces] = useState<Face[]>([]);

  async function load() {
    const res = await fetch("/lilbudmaker/api/faces");
    setFaces(await res.json());
  }

  async function deleteFace(id: number) {
    await fetch(`/lilbudmaker/api/faces/${id}`, { method: "DELETE" });
    setFaces((prev) => prev.filter((f) => f.id !== id));
  }

  useEffect(() => { load(); }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
        gap: "1rem",
      }}>
        {faces.map((face) => (
          <div key={face.id} style={{
            border: "2px solid #840084",
            backgroundColor: "#0000f8",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.5rem",
          }}>
            <FacePreview points={face.points} size={120} />
            <div style={{ color: "#00fc00", fontFamily: "monospace", fontSize: "0.75rem", textTransform: "uppercase" }}>
              {face.emo ?? "—"}
            </div>
            <div style={{ display: "flex", gap: "0.4rem", width: "100%" }}>
              <button onClick={() => onEdit({ ...face, points: { ...face.points } })}
                style={{ flex: 1, fontSize: "0.7rem", padding: "0.3rem" }}>
                clone
              </button>
              <button onClick={() => deleteFace(face.id)}
                style={{ flex: 1, fontSize: "0.7rem", padding: "0.3rem", backgroundColor: "#3a0000", borderColor: "#fc0000", color: "#fc0000" }}>
                delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
