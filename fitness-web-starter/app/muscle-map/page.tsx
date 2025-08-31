
"use client";
import { useState } from "react";
import Link from "next/link";

const regions = [
  { id:"chest", label:"Chest", d:"M30,20 C50,10 70,10 90,20 L90,50 C70,60 50,60 30,50 Z" },
  { id:"back", label:"Back", d:"M30,60 C50,50 70,50 90,60 L90,90 C70,100 50,100 30,90 Z" },
  { id:"legs", label:"Legs", d:"M45,100 L55,140 L45,140 Z M65,100 L75,140 L65,140 Z" },
];

export default function MuscleMap() {
  const [hover, setHover] = useState<string|null>(null);
  return (
    <div className="card">
      <h1 className="text-xl font-semibold mb-4">Muscle Map</h1>
      <svg viewBox="0 0 120 160" className="w-72 h-auto mx-auto">
        {regions.map(r => (
          <path key={r.id} d={r.d}
            onMouseEnter={()=>setHover(r.id)} onMouseLeave={()=>setHover(null)}
            onClick={()=>location.href=`/exercises?muscle=${r.id}`}
            className={`stroke-current cursor-pointer ${hover===r.id ? 'fill-black/20' : 'fill-transparent'}`} />
        ))}
      </svg>
      <div className="mt-4 text-sm">
        Click a region to open <Link className="link" href="/exercises">Exercises</Link> filtered by that muscle.
      </div>
    </div>
  );
}
