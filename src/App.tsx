import React, { useState } from "react";

type CircProps = {
  vKey: string;
  vectors: any;
  targetHandler: (vKey: string) => any;
};

const Circ = ({ vKey, vectors, targetHandler }: CircProps) => {
  return (
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
};

const size = 240;
const color = "#fba000";
const FaceEditor = () => {
  const [emo, setEmo] = useState(null);
  const [vectors, setVectors] = useState({
    points: {
      a: { x: 10, y: 10 },
      b: { x: size - 10, y: 10 },
      c: { x: size - 10, y: size - 10 },
      d: { x: 10, y: size - 10 },
      e: { x: 15, y: 15 },
      f: { x: 90, y: 15 },
      g: { x: 5, y: 25 },
      h: { x: 90, y: 25 },
      i: { x: 140, y: 5 },
      j: { x: 200, y: 5 },
      k: { x: 140, y: 20 },
      l: { x: 200, y: 20 },
      m: { x: 15, y: 200 },
      n: { x: 220, y: 200 },
      o: { x: 15, y: 220 },
      p: { x: 220, y: 220 },
      q: { x: 80, y: 100 },
      r: { x: 140, y: 100 },
    },
    dragTarget: null,
  });

  function makeTargetHandler(key: string) {
    return () => {
      setVectors({
        ...vectors,
        dragTarget: key as any,
      });
    };
  }

  function handleMove(e: React.MouseEvent | React.TouchEvent) {
    if (vectors.dragTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      let x, y;
      if ("touches" in e) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
      } else {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
      }
      setVectors((prevVectors) => ({
        ...prevVectors,
        points: {
          ...prevVectors.points,
          [prevVectors.dragTarget as any]: { x, y },
        },
      }));
    }
  }

  function handleEnd() {
    setVectors((prevVectors) => ({
      ...prevVectors,
      dragTarget: null,
    }));
  }

  return (
    <>
      <svg
        width="240"
        height="240"
        style={{ background: "#00F" }}
        viewBox="0 0 240 240"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
        onMouseUp={handleEnd}
        onTouchEnd={handleEnd}
      >
        <polygon
          points={`${vectors.points.a.x},${vectors.points.a.y} ${vectors.points.b.x},${vectors.points.b.y} ${vectors.points.c.x},${vectors.points.c.y} ${vectors.points.d.x},${vectors.points.d.y}`}
          fill={color}
          stroke="black"
        />

        <line
          x1={vectors.points.e.x}
          y1={vectors.points.e.y}
          x2={vectors.points.f.x}
          y2={vectors.points.f.y}
          stroke="black"
          strokeWidth={2}
        />
        <line
          x1={vectors.points.g.x}
          y1={vectors.points.g.y}
          x2={vectors.points.h.x}
          y2={vectors.points.h.y}
          stroke="black"
          strokeWidth={2}
        />
        <line
          x1={vectors.points.i.x}
          y1={vectors.points.i.y}
          x2={vectors.points.j.x}
          y2={vectors.points.j.y}
          stroke="black"
          strokeWidth={2}
        />
        <line
          x1={vectors.points.k.x}
          y1={vectors.points.k.y}
          x2={vectors.points.l.x}
          y2={vectors.points.l.y}
          stroke="black"
          strokeWidth={2}
        />
        <line
          x1={vectors.points.m.x}
          y1={vectors.points.m.y}
          x2={vectors.points.n.x}
          y2={vectors.points.n.y}
          stroke="black"
          strokeWidth={2}
        />
        <line
          x1={vectors.points.o.x}
          y1={vectors.points.o.y}
          x2={vectors.points.p.x}
          y2={vectors.points.p.y}
          stroke="black"
          strokeWidth={2}
        />

        <circle
          cx={vectors.points.q.x}
          cy={vectors.points.q.y}
          r="10"
          fill="black"
        />
        <circle
          cx={vectors.points.r.x}
          cy={vectors.points.r.y}
          r="10"
          fill="black"
        />
        <>
          <Circ vKey="a" vectors={vectors} targetHandler={makeTargetHandler} />
          <Circ vKey="b" vectors={vectors} targetHandler={makeTargetHandler} />
          <Circ vKey="c" vectors={vectors} targetHandler={makeTargetHandler} />
          <Circ vKey="d" vectors={vectors} targetHandler={makeTargetHandler} />
          <Circ vKey="e" vectors={vectors} targetHandler={makeTargetHandler} />
          <Circ vKey="f" vectors={vectors} targetHandler={makeTargetHandler} />
          <Circ vKey="g" vectors={vectors} targetHandler={makeTargetHandler} />
          <Circ vKey="h" vectors={vectors} targetHandler={makeTargetHandler} />
          <Circ vKey="i" vectors={vectors} targetHandler={makeTargetHandler} />
          <Circ vKey="j" vectors={vectors} targetHandler={makeTargetHandler} />
          <Circ vKey="k" vectors={vectors} targetHandler={makeTargetHandler} />
          <Circ vKey="l" vectors={vectors} targetHandler={makeTargetHandler} />
          <Circ vKey="m" vectors={vectors} targetHandler={makeTargetHandler} />
          <Circ vKey="n" vectors={vectors} targetHandler={makeTargetHandler} />
          <Circ vKey="o" vectors={vectors} targetHandler={makeTargetHandler} />
          <Circ vKey="p" vectors={vectors} targetHandler={makeTargetHandler} />
          <Circ vKey="q" vectors={vectors} targetHandler={makeTargetHandler} />
          <Circ vKey="r" vectors={vectors} targetHandler={makeTargetHandler} />
        </>
      </svg>
      <div className="form-group">
        <fieldset onChange={(e) => setEmo((e.target as any).value)}>
          {["happy", "sad", "angry", "sleepy", "hungry"].map((emotion) => (
            <div key={emotion} className="form-label-group">
              <label htmlFor={emotion + "radio"}>{emotion}</label>
              <input
                name="emotion"
                type="radio"
                id={emotion + "radio"}
                value={emotion}
              />
            </div>
          ))}
        </fieldset>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          console.log({ emo, vectors });
          fetch("/api/face", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ emo, points: vectors.points }),
          })
            .then((res) => {
              console.log(res);
              alert("Face saved!");
              window.location = "/" as any;
            })
            .catch(() => {
              alert("Error saving face");
            });
        }}
      >
        Submit
      </button>
      <button
        onClick={() => {
          window.location = "/" as any;
        }}
      >
        RESET
      </button>
    </>
  );
};

export default FaceEditor;
