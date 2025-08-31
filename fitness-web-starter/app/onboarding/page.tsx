
"use client";
import { useState } from "react";

function compute(profile: {kg:number; cm:number; age:number; sex:'male'|'female'; activity:number; goal:'cut'|'maintain'|'bulk'}) {
  const bmr = profile.sex==='male'
    ? 10*profile.kg + 6.25*profile.cm - 5*profile.age + 5
    : 10*profile.kg + 6.25*profile.cm - 5*profile.age - 161;
  const tdee = bmr * profile.activity;
  const kcal = Math.round(tdee * (profile.goal==='cut' ? 0.85 : profile.goal==='bulk' ? 1.10 : 1.0));
  const protein = Math.round(profile.kg * 2.0); // 1.6-2.2 midpoint
  const fat = Math.round(profile.kg * 0.9);
  const carbs = Math.max(Math.round((kcal - (protein*4 + fat*9))/4), 0);
  const bmi = +(profile.kg / ((profile.cm/100)**2)).toFixed(1);
  return { bmr: Math.round(bmr), tdee: Math.round(tdee), kcal, protein, fat, carbs, bmi };
}

export default function Onboarding() {
  const [cm, setCm] = useState(175);
  const [kg, setKg] = useState(75);
  const [age, setAge] = useState(30);
  const [sex, setSex] = useState<'male'|'female'>('male');
  const [activity, setActivity] = useState(1.4);
  const [goal, setGoal] = useState<'cut'|'maintain'|'bulk'>('maintain');

  const calc = compute({kg, cm, age, sex, activity, goal});

  async function saveProfile() {
    const res = await fetch("/api/profile", { method: "POST", headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ cm, kg, age, sex, activity, goal, ...calc }) });
    if (res.ok) location.href = "/planner";
  }

  return (
    <div className="max-w-xl mx-auto card space-y-3">
      <h1 className="text-xl font-semibold">Onboarding</h1>
      <label className="label">Sex</label>
      <select className="input" value={sex} onChange={e=>setSex(e.target.value as 'male'|'female')}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <label className="label">Height (cm)</label>
      <input className="input" type="number" value={cm} onChange={e=>setCm(+e.target.value)} />
      <label className="label">Weight (kg)</label>
      <input className="input" type="number" value={kg} onChange={e=>setKg(+e.target.value)} />
      <label className="label">Age</label>
      <input className="input" type="number" value={age} onChange={e=>setAge(+e.target.value)} />
      <label className="label">Activity</label>
      <select className="input" value={activity} onChange={e=>setActivity(+e.target.value)}>
        <option value="1.2">Sedentary (1.2)</option>
        <option value="1.4">Light (1.4)</option>
        <option value="1.55">Moderate (1.55)</option>
        <option value="1.75">Very Active (1.75)</option>
        <option value="1.9">Athlete (1.9)</option>
      </select>
      <label className="label">Goal</label>
      <select className="input" value={goal} onChange={e=>setGoal(e.target.value as any)}>
        <option value="cut">Lose fat</option>
        <option value="maintain">Maintain</option>
        <option value="bulk">Build muscle</option>
      </select>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="card"><b>BMI</b><div>{calc.bmi}</div></div>
        <div className="card"><b>BMR</b><div>{calc.bmr} kcal</div></div>
        <div className="card"><b>TDEE</b><div>{calc.tdee} kcal</div></div>
        <div className="card"><b>Daily kcal</b><div>{calc.kcal} kcal</div></div>
        <div className="card"><b>Protein</b><div>{calc.protein} g</div></div>
        <div className="card"><b>Fat</b><div>{calc.fat} g</div></div>
        <div className="card"><b>Carbs</b><div>{calc.carbs} g</div></div>
      </div>

      <button className="btn" onClick={saveProfile}>Save & Go to Planner</button>
    </div>
  );
}
