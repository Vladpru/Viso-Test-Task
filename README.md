Mini Time Tracker 
A full-stack time tracking application built for the Viso Academy.

Tech Stack
Frontend: Next.js, TypeScript, Tailwind CSS, shadcn/ui.
Backend: NestJS, TypeScript, Prisma ORM, class-validator.
Database: PostgreSQL.
Validation: Zod (Frontend) & Class-validator (Backend).

The project is organized as a monorepo-style structure:

viso-client/: Frontend application.
viso-server/: Backend API.


Backend Setup

Create a new PostgreSQL database (e.g. time_tracker_db)
Go to viso-server/.env and update the variable: DATABASE_URL
Then write these commands:
  cd viso-server
  npm install
  npx prisma migrate dev # This will create tables in your local DB
  npm run start:dev


Frontend Setup

Write these commands: 
  cd viso-client
  npm install
  npm run dev
Open http://localhost:3000
