
"use client";
import { useEffect, useState } from "react";

type Item = { id:string; title:string; type:string; startAt:string; endAt:string };

export default function Planner() {
  const [items, setItems] = useState<Item[]>([]);

  async function load() {
    const res = await fetch("/api/planner");
    const j = await res.json();
    setItems(j.items || []);
  }
  useEffect(()=>{ load(); },[]);

  async function remove(id:string) {
    await fetch("/api/planner/"+id, { method:"DELETE" });
    load();
  }

  return (
    <div className="card">
      <h1 className="text-xl font-semibold mb-4">Planner</h1>
      {items.length===0 && <p>No items yet — add from Exercises or Recipes, or from here:</p>}
      <button className="btn mb-3" onClick={async()=>{
        await fetch("/api/planner", { method:"POST", headers:{"Content-Type":"application/json"},
          body: JSON.stringify({ title:"Quick Workout", type:"workout",
            startAt:new Date().toISOString(), endAt:new Date(Date.now()+60*60*1000).toISOString() }) });
        load();
      }}>+ Quick workout</button>
      <ul className="divide-y divide-gray-200 dark:divide-gray-800">
        {items.map(it => (
          <li key={it.id} className="py-3 flex items-center justify-between">
            <div>
              <div className="font-semibold">{it.title}</div>
              <div className="text-xs text-gray-500">{new Date(it.startAt).toLocaleString()} → {new Date(it.endAt).toLocaleTimeString()} ({it.type})</div>
            </div>
            <button className="text-red-600" onClick={()=>remove(it.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
