## Résumé des Labs précédents

### 🧪 Lab 0 – Mise en place d’un projet Node.js avec CI/CD et Docker

Le Lab 0 avait pour objectif d’établir les fondations d’un projet Node.js moderne. Nous avons développé une petite application avec une fonction simple `getMessage()` retournant `"Hello World"`. 

Ce lab comprenait les éléments suivants :

- Mise en place d’un projet Node.js avec `npm init`
- Ajout d’un test unitaire avec **Jest**
- Configuration d’**ESLint** pour assurer la qualité du code
- Création d’un **Dockerfile** pour conteneuriser l’application
- Déploiement d’un pipeline **CI/CD** via **GitHub Actions** avec étapes de lint, test et build Docker

Ce laboratoire visait à familiariser l'étudiant avec les bonnes pratiques de développement logiciel, la conteneurisation et l’automatisation des tâches de validation.

---

### 🧪 Lab 1 – Architecture à deux services avec Docker Compose et PostgreSQL

Dans le Lab 1, nous avons étendu le projet du Lab 0 en transformant l’application en une **application console complète**, structurée en architecture **client/serveur à deux couches (2-tier)**.

Ce lab introduisait les éléments suivants :

- Ajout d’une **base de données PostgreSQL** pour la persistance des données
- Intégration de **Sequelize** comme ORM pour gérer les entités (`Produit`, `Vente`, `LigneVente`, `Utilisateur`, etc.)
- Développement d’une interface console interactive avec **Inquirer.js**
- Utilisation de **Docker Compose** pour orchestrer les services `pos-app` (Node.js) et `pos-db` (PostgreSQL)
- Configuration de **volumes Docker** pour assurer la persistance des données
- Tests unitaires maintenus avec Jest pour valider la logique métier

Ce laboratoire permettait de comprendre comment développer une application structurée, interagir avec une base de données relationnelle, et déployer une solution multi-conteneurs avec Docker.

---

### ⚖️ Comparaison des Lab 0 et Lab 1

| Éléments               | Lab 0                                      | Lab 1                                                         |
|------------------------|--------------------------------------------|---------------------------------------------------------------|
| Fonctionnalité         | Fonction simple `getMessage()`             | Application console POS avec gestion des ventes et produits   |
| Base de données        | Aucune                                     | PostgreSQL + Sequelize ORM                                    |
| Conteneurisation       | Dockerfile unique                          | Docker Compose avec 2 services (Node.js + PostgreSQL)         |
| Objectif pédagogique   | Démarrage CI/CD + Docker + tests unitaires | Architecture 2-tier + persistance + orchestration Docker      |

---

