# LOG430_Lab2

Ce projet est une application Node.js/Express pour la gestion de points de vente (POS) multi-magasins, avec gestion du stock, des ventes, du réapprovisionnement logistique et des rapports pour la maison mère.

---

## Utilisation avec Docker Compose


### 1. Lancer l’application

Dans un terminal exécute :

```sh
docker compose up --build
```

Cela va :
- Construire l’image de l’API Node.js
- Lancer la base de données (PostgreSQL)
- Démarrer l’API sur [http://localhost:3000](http://localhost:3000)

---

### 2. Utiliser la console POS(Caisse des magasins)

Pour accéder à la console interactive POS :

```sh
docker exec -it pos-api bash
node src/appConsole.js
```

---
### 3. Utiliser la console Maison mere

Pour accéder à la console interactive POS :

```sh
docker exec -it pos-api bash
node src/maisonMereConsole.js

### 4. Arrêter l’application

Dans un autre terminal :

```sh
docker compose down
```

---

## 📦 Structure du projet

```
src/
  api/           # Routes Express et serveur principal
  controllers/   # Logique métier
  models/        # Modèles Sequelize
  appConsole.js  # Console POS
  maisonMereConsole.js  # Console Maison mere
tests/           # Tests Jest
```

---

## 🧪 Lancer les tests

Pour lancer les tests unitaires (hors Docker) :

```sh
npm install
npm test
```

---