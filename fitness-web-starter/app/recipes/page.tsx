
"use client";
import { useState } from "react";

type Recipe = { id:string; title:string; kcal:number; macros:{p:number; f:number; c:number}; kosherClass:'meat'|'dairy'|'pareve' };

const SAMPLE: Recipe[] = [
  { id:"chicken-rice", title:"Lemon Chicken & Rice", kcal:620, macros:{p:45,f:18,c:70}, kosherClass:"meat" },
  { id:"cottage-bowl", title:"Cottage Cheese Power Bowl", kcal:420, macros:{p:38,f:12,c:42}, kosherClass:"dairy" },
  { id:"veggie-pasta", title:"Veggie Pasta", kcal:550, macros:{p:20,f:16,c:85}, kosherClass:"pareve" },
];

export default function Recipes() {
  const [q, setQ] = useState("");
  const list = SAMPLE.filter(r => r.title.toLowerCase().includes(q.toLowerCase()));

  async function addToPlanner(title:string) {
    await fetch("/api/planner", { method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ title:`Meal: ${title}`, type:"meal",
        startAt: new Date().toISOString(), endAt: new Date(Date.now()+45*60*1000).toISOString() }) });
    alert("Meal added to Planner for the next 45 minutes.");
  }

  return (
    <div className="card">
      <h1 className="text-xl font-semibold mb-4">Recipes</h1>
      <input className="input mb-3" placeholder="Search recipes..." value={q} onChange={e=>setQ(e.target.value)} />
      <div className="grid md:grid-cols-2 gap-4">
        {list.map(r => (
          <div key={r.id} className="card">
            <div className="font-semibold">{r.title}</div>
            <div className="text-sm text-gray-500">{r.kcal} kcal · P{r.macros.p}/F{r.macros.f}/C{r.macros.c} · {r.kosherClass}</div>
            <button className="btn mt-3" onClick={()=>addToPlanner(r.title)}>Send to Planner</button>
          </div>
        ))}
      </div>
    </div>
  );
}
