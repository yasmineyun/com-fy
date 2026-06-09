# ✨ Com'fy — Ton QG Communication

Dashboard de communication multi-boutiques (Coriolis · Care · Save).
Construit avec **React + Vite + Tailwind CSS**. Interface fluide, animée, 100 % responsive (PC + mobile).

## 🎯 Fonctionnalités

- **Hub multi-boutiques** : 6 cartes animées avec KPIs, objectifs, posts de la semaine
- **Hubs dédiés par boutique** : Feed, Médiathèque, Grille Insta, Projections, Semaine, Liens pro, Infos (contacts + stocks)
- **Social Planner** : Kanban avec **glisser-déposer** entre colonnes
- **Temps & Objectifs** : calendrier + objectifs mensuels → hebdo → quotidiens
- **Boîte à Outils** : routine du matin, budgets pub, swipe file, audit des pages, **bilan en 1 clic**
- **Studio de personnalisation** : 20 thèmes, créateur DIY (dégradés + sauvegarde), 20 polices Google Fonts
- **Générateur de légendes IA** (nécessite une clé Anthropic — voir plus bas)

---

## 🚀 Lancer en local

Pré-requis : **Node.js 18+**

```bash
npm install
npm run dev
```

Ouvre http://localhost:5173

Pour construire la version de production :

```bash
npm run build      # génère le dossier /dist
npm run preview    # prévisualise le build
```

---

## 🤖 Activer le Générateur de Légendes IA

Le navigateur **ne peut pas** appeler l'API Anthropic directement (la clé doit rester secrète).
Une fonction serverless sert de proxy : `api/generate.js` (déjà incluse, prête pour Vercel).

1. Récupère une clé sur https://console.anthropic.com
2. Ajoute-la en **variable d'environnement** (jamais dans le code) :
   - Vercel : Settings → Environment Variables → `ANTHROPIC_API_KEY`
3. C'est tout. Le front appelle `/api/generate` automatiquement.

> Sans clé configurée, toute l'appli fonctionne ; seul le bouton IA affiche un message.

---

## 1️⃣ Mettre sur GitHub

```bash
git init
git add .
git commit -m "Com'fy — version initiale"
git branch -M main
git remote add origin https://github.com/TON-PSEUDO/comfy.git
git push -u origin main
```

---

## 2️⃣ Déployer sur Vercel (recommandé — gère l'IA)

**Option A — interface web (le plus simple)**
1. Va sur https://vercel.com → *Add New Project*
2. Importe ton dépôt GitHub `comfy`
3. Vercel détecte Vite tout seul → *Deploy*
4. Ajoute `ANTHROPIC_API_KEY` dans Settings → Environment Variables, puis *Redeploy*

**Option B — ligne de commande**
```bash
npm i -g vercel
vercel            # suit les questions
vercel --prod     # déploiement en production
```

✅ La fonction `api/generate.js` devient automatiquement disponible sur `/api/generate`.

---

## 3️⃣ Déployer sur Firebase Hosting

> ⚠️ Firebase Hosting est **statique** : le proxy IA `/api/generate` n'y fonctionne pas tel quel.
> L'appli marche entièrement ; pour l'IA sur Firebase, il faut une **Cloud Function** (ou
> garder le proxy IA sur Vercel et pointer `VITE_AI_ENDPOINT` vers l'URL Vercel).

```bash
npm i -g firebase-tools
firebase login
cp .firebaserc.example .firebaserc   # mets ton ID de projet dedans
npm run build
firebase deploy --only hosting
```

Pour l'IA sur Firebase, crée une Cloud Function équivalente à `api/generate.js`,
ou définis dans un fichier `.env` :
```
VITE_AI_ENDPOINT=https://ton-projet.vercel.app/api/generate
```
puis rebuild.

---

## 🗂️ Structure du projet

```
comfy/
├── api/
│   └── generate.js        # proxy serverless IA (Vercel)
├── src/
│   ├── App.jsx            # toute l'application
│   ├── main.jsx           # point d'entrée React
│   └── index.css          # Tailwind
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
├── firebase.json
└── README.md
```

---

## 🎨 Personnalisation

- Les boutiques, contacts, stocks et données de départ se trouvent en haut de `src/App.jsx`
  (constantes `INIT_STORES`, `STORE_CONTACTS`, `STOCK_TEMPLATES`, etc.).
- Code couleur des enseignes : Coriolis = Bleu · Care = Vert · Save = Orange (objet `BRANDS`).
- 20 thèmes dans l'objet `THEMES`, 20 polices dans `ALL_FONTS`.

> 💡 Astuce : les données sont en mémoire (state React). Pour les conserver entre sessions,
> branche un stockage (Firebase Firestore, Supabase…) sur les `useState` de `App`.

Fait avec ❤️ — Com'fy.
