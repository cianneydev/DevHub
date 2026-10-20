# 📋 TODO — DevHub

Cette feuille de route liste les prochaines étapes pour faire de DevHub une plateforme complète.

## 🚨 Priorité 1 — À faire dès qu'un PC / Codespaces est disponible

- [ ] **Publier sur npm** : `npm publish --access public`
  - *Bloqué par Cloudflare et l'absence de terminal actuellement.*
- [ ] **Communiquer** : Poster sur Dev.to, Reddit (r/node, r/webdev), Twitter.
  - *Nécessite que le package soit installé pour avoir un impact.*

## 🚀 Priorité 2 — DevHub Pro (SaaS)

- [ ] **Valider le CLI** avec de vrais utilisateurs (feedback).
- [ ] **Setup Next.js + Clerk + Supabase**.
- [ ] **Dashboard** (CRUD Snippets, CRUD Notes).
- [ ] **Sync CLI ↔ Web** (API REST).

## 💡 Priorité 3 — Écosystème (Plus tard)

- [ ] Extension VSCode.
- [ ] Commande `devhub tags` (catégorisation).
- [ ] API publique.
- [ ] Marketplace de snippets.

## ✅ Terminé

- [x] CLI complet (8 commandes : snippet, note, search, stats, export, import, copy, ui)
- [x] Stockage local JSON (`~/.devhub/`)
- [x] TUI interactive (@inquirer/prompts)
- [x] 30+ tests isolés (Vitest)
- [x] CI/CD (GitHub Actions)
- [x] Documentation VitePress en ligne
- [x] Logo officiel (README + Site)
- [x] Releases v0.1.0 → v0.7.0