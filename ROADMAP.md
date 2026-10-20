# 🗺️ DevHub — Feuille de Route (Roadmap)

> **Vision :** Devenir le hub central du développeur, du terminal au cloud.

Bienvenue sur la feuille de route officielle de **DevHub**. Ce document présente l'état actuel du projet, les prochaines étapes majeures et les blocages temporaires. 

DevHub est un projet open source (MIT) construit avec l'ambition de fournir aux développeurs un espace de travail unifié, rapide et 100% local.

---

## ✅ Phase 1 : Le Cœur (CLI) — *Terminé*
La première phase consistait à construire un CLI puissant, fiable et entièrement testé.

- [x] CLI complet (8 commandes : `snippet`, `note`, `search`, `stats`, `export`, `import`, `copy`, `ui`)
- [x] Stockage local persistant (`~/.devhub/`)
- [x] Interface interactive (TUI) avec `@inquirer/prompts`
- [x] Suite de tests complète et isolée (30+ tests avec Vitest)
- [x] Pipeline CI/CD (GitHub Actions)
- [x] Documentation complète en ligne (VitePress)
- [x] Identité visuelle (Logo officiel)

---

## 🚀 Phase 2 : Le Lancement — *En cours*
L'objectif est de rendre le CLI accessible au plus grand nombre.

- [ ] **Publication sur npm** (`npm install -g devhub`)
  - *Statut : Bloqué temporairement. Nous recherchons un environnement de publication stable (Cloudflare bloque actuellement les tentatives depuis mobile, et l'accès à un PC de bureau est indisponible).*
- [ ] **Communication & Communauté**
  - [ ] Publication d'un article sur Dev.to
  - [ ] Partage sur Reddit (r/node, r/webdev)
  - [ ] Lancement sur Hacker News (Show HN)
- [ ] **Feedback utilisateurs** (collecte des premiers retours)

---

## 🌐 Phase 3 : DevHub Pro (SaaS) — *Planifié*
Créer une plateforme web pour synchroniser et collaborer autour de ses snippets et notes.

- [ ] **MVP (Minimum Viable Product)**
  - [ ] Stack : Next.js 15, Clerk (Auth), Supabase (BDD), Prisma, Tailwind.
  - [ ] Authentification via GitHub.
  - [ ] Dashboard utilisateur (CRUD Snippets & Notes).
  - [ ] Synchronisation bidirectionnelle CLI ↔ Web.
- [ ] **Collaboration**
  - [ ] Partage public de snippets.
  - [ ] Système de Tags.
  - [ ] Organisations (Teams).

---

## 🛠️ Phase 4 : L'Écosystème — *Vision future*
Faire de DevHub une plateforme extensible par la communauté.

- [ ] API publique REST/GraphQL.
- [ ] Extensions pour éditeurs (VSCode, Neovim, JetBrains).
- [ ] Marketplace de snippets communautaires.
- [ ] Commandes CLI avancées (`tags`, `random`, `sync`).

---

## 🤝 Comment contribuer ?

DevHub est ouvert aux contributions ! Que vous soyez débutant ou expert, il y a de la place pour vous.

- Consultez le fichier [`CONTRIBUTING.md`](./CONTRIBUTING.md) pour les directives.
- Les débutants peuvent chercher les tâches marquées `good first issue` (bientôt disponibles via l'onglet Issues).
- Vous avez une idée ? Ouvrez une discussion ou une issue.

---

## 📅 Historique des versions

- **v0.7.0** : Ajout de la commande `copy` (presse-papiers) et mise à jour de la documentation.
- **v0.6.0** : Stabilisation du `package.json`, tests isolés, correction des URLs et logo officiel.
- **v0.5.1** : Corrections de bugs sur les tests et le stockage.
- **v0.4.0** : Ajout des commandes `stats`, `export`, `import`.
- **v0.2.0** : Ajout de la commande `search`.
- **v0.1.0** : Version initiale (commande `snippet`).