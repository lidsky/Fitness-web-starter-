
# Fitness Web Starter (Run Right Now)

Minimal working prototype of your fitness web app with:
- Sign up / Log in (credentials)
- Onboarding with BMI/TDEE/macros
- Muscle Map (demo SVG)
- Exercises & Recipes (sample data) with "Send to Planner"
- Planner (list view) storing events in SQLite (Prisma)

## Run it

```bash
npm install
cp .env.example .env
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
# open http://localhost:3000
```

### Demo login
Email: demo@example.com
Password: demo1234

> Note: This starter uses a simple cookie-based session for local development (no JWT, no OAuth).
  Replace it with a full auth solution (NextAuth/Auth.js) for production.

## Where to build next
- Replace dummy session with Auth.js
- Add calendar grid (FullCalendar) for week/day views
- Add GIF media, ingredient macros math, kosher flags
- Add generators for workout week and meal-prep
- Add push notifications (OneSignal/Web Push) and PWA manifest/service worker
