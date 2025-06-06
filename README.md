#LOG430 - POS Distribué

Ce projet simule une solution distribuée de point de vente (POS) avec plusieurs rôles :
- Magasins qui gèrent les ventes via une console
- Une maison mère qui supervise l’ensemble du réseau
- Une couche API pour les échanges
- Une base de données PostgreSQL centrale

Développé dans le cadre du cours **LOG430 – Architecture logicielle distribuée** à l'ÉTS.

---

##Objectifs

- Gérer des ventes en magasin avec une interface console
- Consolider les ventes par la maison mère
- Gérer les stocks et demandes de réapprovisionnement
- Fournir un backend API REST en Node.js

---

## Technologies utilisées

- Node.js + Express
- Sequelize (PostgreSQL)
- Inquirer (console interactive)
- Jest (tests)
- Docker + Docker Compose
- GitHub Actions (CI)

---

## Prérequis

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## Lancement du projet

### 1. Lancer les services de base (API + BD)

```bash
docker compose up --build api db
```

- La base de données PostgreSQL est exposée sur le port `5432`
- L’API est accessible sur : [http://localhost:3000](http://localhost:3000)

### 2. Lancer la console POS (magasin)

```bash
docker compose run -it pos-app
```

### 3. Lancer la console Maison Mère

```bash
docker compose run -it maison-mere
```

---

## Tests

Lancer les tests unitaires (depuis `pos-app`) :

```bash
docker compose run pos-app npm test
```

---

## Fonctionnalités

### POS (magasin)

- Recherche de produits
- Création de ventes avec plusieurs articles
- Paiement
- Gestion de stock local
- Envoi de demandes de réapprovisionnement

### Maison Mère

- Génération de rapports consolidés
- Classement des produits les plus vendus
- Visualisation des stocks des magasins

### Logistique (API)

- Traitement des demandes de réapprovisionnement
- Stock du centre de distribution
- Exposition des données via l’API REST

---

## Auteur

Projet réalisé par **Taha Beniffou** – LOG430, École de technologie supérieure (ÉTS).
