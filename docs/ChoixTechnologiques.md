# Choix technologiques — Système POS Distribué

Ce document présente les choix technologiques faits dans le cadre du développement du système de caisse POS distribué (Lab 2), incluant l’interface console, l’API REST et les services backend. Ces choix sont guidés par les principes de **simplicité**, **modularité**, **portabilité** et **gratuité**.

---

## Plateforme de développement

**Node.js**

**Justification** :
- Déjà utilisé dans le Lab 1 → continuité naturelle.
- Léger, rapide à démarrer.
- Grand écosystème JavaScript (Express, Inquirer, Sequelize, etc.).
- Multiplateforme et open-source.

---

## Gestion de dépendances

**npm** (Node Package Manager)

**Justification** :
- Outil standard intégré à Node.js.
- Compatible avec tous les modules utilisés dans le projet.

---

## 🗃Base de données

**PostgreSQL**

**Justification** :
- Robuste et open-source.
- Gère les relations complexes (produits, ventes, magasins, etc.).
- Supporté nativement par Sequelize.
- Conteneurisé via Docker pour portabilité.

---

## ORM

**Sequelize**

**Justification** :
- Mapping objet-relationnel compatible avec PostgreSQL.
- Simplifie l'accès à la base de données.
- Migrations, seeds, et synchronisation faciles.
- Bonne documentation et forte communauté.

---

## Tests

**Jest**

**Justification** :
- Framework simple et bien intégré à Node.js.
- Utilisé dans le Lab 1 → continuité.
- Intégration facile avec GitHub Actions pour CI.

---

## Qualité du code

**ESLint**

**Justification** :
- Imposition d’un style de code cohérent.
- Détection d’erreurs potentielles avant exécution.
- Intégrable à l’éditeur et à la CI.

---

## Conteneurisation

**Docker** + **Docker Compose**

**Justification** :
- Exécution reproductible sur toutes les machines.
- Simplifie le lancement des différents services (API, base de données, consoles).
- Permet le test et déploiement local ou distant sans surprise.

---

## Intégration Continue

**GitHub Actions**

**Justification** :
- Automatisation des tests, linting, et build Docker à chaque commit.
- Facile à configurer.
- Gratuit pour les dépôts publics.

---

## Résumé

Les technologies utilisées dans ce projet répondent aux objectifs suivants :

- **Simplicité** : outils connus, déjà utilisés en Lab 1.
- **Modularité** : chaque composant (console, API, DB) est isolé.
- **Portabilité** : tout fonctionne dans Docker.
- **Fiabilité** : grâce à PostgreSQL, aux tests Jest et au linting ESLint.
- **Gratuité** : tous les outils sont open source.

Ces choix sont adaptés à un projet académique réaliste et évolutif, tout en restant facile à prendre en main.
