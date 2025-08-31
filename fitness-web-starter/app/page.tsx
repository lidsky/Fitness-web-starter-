
export default function Home() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <section className="card">
        <h2 className="text-lg font-semibold mb-2">Welcome</h2>
        <p>This is a minimal working starter for your fitness web app. Create an account and complete onboarding to compute your BMI, TDEE, and macros.</p>
      </section>
      <section className="card">
        <h2 className="text-lg font-semibold mb-2">Next steps</h2>
        <ol className="list-decimal ml-5 space-y-1">
          <li>Sign up</li>
          <li>Complete onboarding</li>
          <li>Add workouts/meals to your Planner</li>
        </ol>
      </section>
    </div>
  );
}
