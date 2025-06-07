# Architectural Decision Records (ADR)

## ADR 001 – Conteneurisation avec Docker

### Contexte
Le système comporte plusieurs composants (API, base de données, consoles POS et Maison Mère) qui doivent fonctionner ensemble de manière cohérente, sur des environnements différents (dev, VM de production, etc.). Il fallait une solution simple et portable pour orchestrer et isoler ces services.

### Décision
Utiliser Docker et Docker Compose pour conteneuriser chaque service (API, BD, POS, Maison Mère) et gérer leur exécution unifiée.

### Statut
Acceptée

### Conséquences
- Exécution reproductible sur toutes les machines
- Déploiement simple sur la VM de production
- Environnement isolé pour chaque composant

---

## ADR 002 – Centralisation via une API REST Express

### Contexte
Dans le Lab 1, la logique métier était couplée à la console. Cela limitait la supervision globale. Il fallait centraliser les traitements métier et faciliter la communication entre les consoles et la base de données.

### Décision
Développer une API REST avec Express.js pour centraliser les opérations (produits, ventes, réapprovisionnements, rapports).

### Statut
Acceptée

### Conséquences
- Clarifie l’architecture (séparation des responsabilités)
- Permet l’évolution des consoles indépendamment de la logique métier
- Favorise la supervision centralisée
- Choix basé sur mon expérience avec Express.js

---

## ADR 003 – Base de données PostgreSQL

### Contexte
SQLite utilisé dans le Lab 1 ne permettait pas une exécution distribuée fiable ni de gestion multi-utilisateur. Une base plus robuste et accessible depuis plusieurs conteneurs était nécessaire.

### Décision
Adopter PostgreSQL comme SGBD relationnel principal du système.

### Statut
Acceptée

### Conséquences
- Transactions fiables
- Excellente compatibilité avec Sequelize
- Déploiement facile avec Docker

---

## ADR 004 – Intégration Continue avec GitHub Actions

### Contexte
Le projet devait intégrer une vérification automatique de la qualité du code pour chaque modification (push), sans intervention manuelle.

### Décision
Utiliser GitHub Actions pour exécuter automatiquement les tests (Jest) et les analyses statiques (ESLint) à chaque push.

### Statut
Acceptée

### Conséquences
- Amélioration de la fiabilité
- Détection immédiate des erreurs
- Bonne pratique DevOps introduite au sein du projet

---

## ADR 005 – Utilisation du patron architectural MVC

### Contexte
La gestion du projet nécessite une organisation claire du code entre les données, la logique métier, et les routes HTTP. Une structure connue rend le développement plus fluide.

### Décision
Structurer l’API en suivant le modèle MVC (Model-View-Controller), avec Sequelize pour les modèles, Express pour les routes et des contrôleurs dédiés.

### Statut
Acceptée

### Conséquences
- Meilleure lisibilité du code
- Séparation nette des responsabilités
- Tests plus faciles à mettre en œuvre
- Choix motivé par le fait que j’ai appris et utilisé MVC dans plusieurs cours (Node.js/Express, développement web)
