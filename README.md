# MindLedger — Proof-of-Intellect (PoI) Platform

MindLedger is a decentralized academic competition platform where students "mine" crypto tokens ($POI) by solving Olympiad-level problems (JEE Advanced, INMO, IPhO, IChO, IOI).


## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS 4 + Custom Design System
- **Math Rendering**: KaTeX (`react-katex`)
- **Code Editor**: Monaco Editor (`@monaco-editor/react`)
- **Animations**: Framer Motion
- **Charts**: Recharts
- **State**: Zustand (Integrated via hooks)
- **Proctoring**: Native WebRTC + custom implementation

## Page Map
- `/` — Landing page with hero, live stats, and subject domains.
- `/auth` — Onboarding flow with wallet connect and KYC.
- `/problems` — Marketplace for claimable academic problems.
- `/solve/[id]` — Integrated solving environment with proctoring.
- `/verify` — Peer-to-Peer verification queue for auditing solutions.
- `/dashboard` — Miner earnings, withdrawal panel (CBDC bridge), and staking.
- `/leaderboard` — Global, weekly, and subject-specific rankings.
- `/submit-problem` — Portal for professors to author new problem sets.
- `/profile/[wallet]` — Student portfolio with expertise radar charts.
- `/marketplace` — Circular economy for peer tutoring.
- `/institute` — Dashboard for coaching institutes and teachers.
- `/talent` — Recruiter portal for hiring top-ranked solvers.

## Core Components
- `Navbar.tsx` & `Footer.tsx` — Global navigation.
- `ProblemCard.tsx` — Individual problem display component.
- `LaTeXRenderer.tsx` — High-fidelity math rendering engine.
- `Hero.tsx` — Dynamic landing header.
- `CategoryCards.tsx` & `HowItWorks.tsx` — Explanatory landing sections.

## Security & Proctoring
- `useProctoringSession.ts` — Custom hook for WebRTC, focus detection, and screen recording prevention.
- WARNING SYSTEM: Automated disqualification after 3 tab-switches or document blurs.
- WEBRTC: Continuous background frames sent to verify solver's presence.

## Design Language
- **Theme**: Dark-first, high contrast, mathematical/academic.
- **Accent Color**: Electric Violet (#7F77DD).
- **Typography**: Inter (Sans) and Fira Code (Mono).
- **Glassmorphism**: Applied to all floating panels and dash cards.

---
Built with precision for the global elite.
