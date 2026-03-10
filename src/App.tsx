import React, { useState } from "react";
import { Gallery } from "./Gallery";

type Points = Record<string, { x: number; y: number }>;

const DEFAULT_POINTS: Points = {
  a: { x: 10,  y: 10  }, b: { x: 230, y: 10  },
  c: { x: 230, y: 230 }, d: { x: 10,  y: 230 },
  e: { x: 15,  y: 15  }, f: { x: 90,  y: 15  },
  g: { x: 5,   y: 25  }, h: { x: 90,  y: 25  },
  i: { x: 140, y: 5   }, j: { x: 200, y: 5   },
  k: { x: 140, y: 20  }, l: { x: 200, y: 20  },
  m: { x: 15,  y: 200 }, n: { x: 220, y: 200 },
  o: { x: 15,  y: 220 }, p: { x: 220, y: 220 },
  q: { x: 80,  y: 100 }, r: { x: 140, y: 100 },
};

const HEAD_COLOR = "#00fc00";
const size = 240;

type CircProps = {
  vKey: string;
  vectors: any;
  targetHandler: (vKey: string) => any;
};

const Circ = ({ vKey, vectors, targetHandler }: CircProps) => (
  <circle
    cx={vectors.points[vKey].x}
    cy={vectors.points[vKey].y}
    r="20"
    onMouseDown={targetHandler(vKey)}
    onTouchStart={targetHandler(vKey)}
    fill="red"
    style={{ opacity: vectors.dragTarget === vKey ? 0.5 : 0 }}
  />
);

type FaceEditorProps = {
  initialPoints?: Points;
  onSaved: () => void;
};

const FaceEditor = ({ initialPoints, onSaved }: FaceEditorProps) => {
  const [emo, setEmo] = useState<string | null>(null);
  const [vectors, setVectors] = useState({
    points: initialPoints ?? DEFAULT_POINTS,
    dragTarget: null as string | null,
  });

  function makeTargetHandler(key: string) {
    return () => setVectors({ ...vectors, dragTarget: key });
  }

  function handleMove(e: React.MouseEvent | React.TouchEvent) {
    if (!vectors.dragTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    let x: number, y: number;
    if ("touches" in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    setVectors((prev) => ({
      ...prev,
      points: { ...prev.points, [prev.dragTarget!]: { x, y } },
    }));
  }

  function handleEnd() {
    setVectors((prev) => ({ ...prev, dragTarget: null }));
  }

  return (
    <>
      <svg
        width={size} height={size}
        style={{ background: "#0000f8", touchAction: "none" }}
        viewBox={`0 0 ${size} ${size}`}
        onMouseMove={handleMove}
        onTouchMove={(e) => { e.preventDefault(); handleMove(e); }}
        onMouseUp={handleEnd}
        onTouchEnd={handleEnd}
      >
        <polygon
          points={["a","b","c","d"].map((k) => `${vectors.points[k].x},${vectors.points[k].y}`).join(" ")}
          fill={HEAD_COLOR} stroke="black"
        />
        {(["e","g","i","k","m","o"] as const).map((start, idx) => {
          const end = ["f","h","j","l","n","p"][idx];
          return (
            <line key={start}
              x1={vectors.points[start].x} y1={vectors.points[start].y}
              x2={vectors.points[end].x}   y2={vectors.points[end].y}
              stroke="black" strokeWidth={2}
            />
          );
        })}
        {["q","r"].map((k) => (
          <circle key={k} cx={vectors.points[k].x} cy={vectors.points[k].y} r="10" fill="black" />
        ))}
        {Object.keys(vectors.points).map((k) => (
          <Circ key={k} vKey={k} vectors={vectors} targetHandler={makeTargetHandler} />
        ))}
      </svg>

      <div className="form-group">
        <fieldset onChange={(e) => setEmo((e.target as unknown as HTMLInputElement).value)}>
          {["happy","sad","angry","sleepy","hungry","content","silly","thinking","confused"].map((emotion) => (
            <div key={emotion} className="form-label-group">
              <label htmlFor={emotion + "radio"}>{emotion}</label>
              <input name="emotion" type="radio" id={emotion + "radio"} value={emotion} />
            </div>
          ))}
        </fieldset>
      </div>

      <button onClick={(e) => {
        e.preventDefault();
        fetch("/lilbudmaker/api/face", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ emo, points: vectors.points }),
        }).then(() => { alert("Face saved!"); onSaved(); }).catch(() => alert("Error saving face"));
      }}>Submit</button>

      <button onClick={() => setVectors({ points: DEFAULT_POINTS, dragTarget: null })}>
        Reset
      </button>
    </>
  );
};

type View = "gallery" | "editor";

export default function App() {
  const [view, setView] = useState<View>("gallery");
  const [clonePoints, setClonePoints] = useState<Points | undefined>(undefined);

  function startNew() {
    setClonePoints(undefined);
    setView("editor");
  }

  function startClone(face: { points: Points }) {
    setClonePoints({ ...face.points });
    setView("editor");
  }

  return (
    <>
      <div style={{
        display: "flex", gap: "0.5rem", padding: "0.5rem",
        backgroundColor: "#00007a", borderBottom: "2px solid #840084",
      }}>
        <button onClick={() => setView("gallery")}
          style={{ flex: 1, opacity: view === "gallery" ? 1 : 0.5 }}>
          gallery
        </button>
        <button onClick={startNew}
          style={{ flex: 1, opacity: view === "editor" ? 1 : 0.5 }}>
          + new
        </button>
      </div>

      {view === "gallery"
        ? <Gallery onEdit={startClone} />
        : <FaceEditor initialPoints={clonePoints} onSaved={() => setView("gallery")} />
      }
    </>
  );
}
