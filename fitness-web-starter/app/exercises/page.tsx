
"use client";
import { useEffect, useMemo, useState } from "react";

type Exercise = { id:string; name:string; code:string; primary:string; equipment:string[]; difficulty:number; };

const CATALOG: Exercise[] = [
  { id:"bp", name:"Barbell Bench Press", code:"BP", primary:"chest", equipment:["barbell","bench"], difficulty:2 },
  { id:"ohp", name:"Overhead Press", code:"OHP", primary:"shoulders", equipment:["barbell"], difficulty:3 },
  { id:"sqt", name:"Back Squat", code:"SQ", primary:"legs", equipment:["barbell","rack"], difficulty:3 },
  { id:"dl", name:"Deadlift", code:"DL", primary:"back", equipment:["barbell"], difficulty:3 },
];

function useQueryParam(name:string) {
  const [v, setV] = useState<string|null>(null);
  useEffect(()=>{
    const u = new URL(location.href);
    setV(u.searchParams.get(name));
  },[]);
  return v;
}

export default function Exercises() {
  const muscle = useQueryParam("muscle");
  const [q, setQ] = useState("");
  const [equipment, setEquipment] = useState<string>("all");

  const list = useMemo(() => {
    return CATALOG.filter(e =>
      (!muscle || e.primary===muscle) &&
      (equipment==="all" || e.equipment.includes(equipment)) &&
      (q==="" || e.name.toLowerCase().includes(q.toLowerCase()))
    );
  }, [muscle, q, equipment]);

  async function addToPlanner(eid:string) {
    await fetch("/api/planner", { method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ title:`Workout: ${eid}`, type:"workout",
        startAt: new Date().toISOString(), endAt: new Date(Date.now()+60*60*1000).toISOString() }) });
    alert("Added to Planner for the next hour.");
  }

  return (
    <div className="card">
      <h1 className="text-xl font-semibold mb-4">Exercises {muscle ? `(filtered by ${muscle})` : ""}</h1>
      <div className="flex gap-2 mb-3">
        <input className="input" placeholder="Search..." value={q} onChange={e=>setQ(e.target.value)} />
        <select className="input" value={equipment} onChange={e=>setEquipment(e.target.value)}>
          <option value="all">All equipment</option>
          <option value="barbell">Barbell</option>
          <option value="bench">Bench</option>
          <option value="rack">Rack</option>
        </select>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-800">
        {list.map(e => (
          <li key={e.id} className="py-3 flex items-center justify-between">
            <div>
              <div className="font-semibold">{e.code} — {e.name}</div>
              <div className="text-xs text-gray-500">Primary: {e.primary} · Equipment: {e.equipment.join(", ")}</div>
            </div>
            <button className="btn" onClick={()=>addToPlanner(e.name)}>Add to Today</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
