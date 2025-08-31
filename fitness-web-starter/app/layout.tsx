
import "./globals.css";
import Link from "next/link";

export const metadata = { title: "Fitness Web Starter", description: "MVP fitness PWA" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-gray-200 dark:border-gray-800">
          <nav className="container flex items-center gap-4 py-3 text-sm">
            <Link href="/" className="font-bold">🏋️ Fitness</Link>
            <Link href="/muscle-map" className="link">Muscle Map</Link>
            <Link href="/exercises" className="link">Exercises</Link>
            <Link href="/recipes" className="link">Recipes</Link>
            <Link href="/planner" className="link">Planner</Link>
            <div className="ml-auto flex gap-3">
              <Link href="/login" className="link">Log in</Link>
              <Link href="/signup" className="link">Sign up</Link>
            </div>
          </nav>
        </header>
        <main className="container py-6">{children}</main>
      </body>
    </html>
  );
}
