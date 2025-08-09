# Lily Truck – Starter (Next.js + Supabase + Stripe)

Starter minimal pour commande en ligne d'un food truck (mobile-first, PWA).
Comprend pages: **Menu**, **Suivi**, **KDS**, **Admin Menu** et les API à brancher.

## Démarrage rapide
1. `pnpm i` (ou `npm i` / `yarn`)
2. Copier `.env.example` → `.env.local` et remplir vos clés.
3. Créer la base Supabase et exécuter `lib/db.sql` puis `lib/seed.sql`.
4. `npm run dev` puis http://localhost:3000
5. Configurer Stripe (Checkout + webhook → `/api/stripe/webhook`).

Voir le PDF *Guide_Installation_Lily_Truck.pdf* pour le pas-à-pas détaillé.
