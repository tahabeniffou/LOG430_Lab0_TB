LOG430 Lab 0

Une mini‑application Node.js qui affiche « Hello World » et sert d’exemple complet : lint → tests → conteneurisation → CI/CD.

📝 Partie 1 — Description du projet
Cette application Node.js est volontairement minimaliste : un unique fichier index.js contient la fonction getMessage() qui renvoie la chaîne « Hello World ». Lorsque ce script est exécuté (par node index.js ou via le conteneur Docker), la fonction est appelée et le message est immédiatement affiché dans le terminal.

Autour de ce noyau très simple, le dépôt rassemble tout le nécessaire pour garantir la qualité, la testabilité et la portabilité du code :

- Le dossier __tests__/ héberge un test Jest qui vérifie que la fonction retourne bien le texte attendu.

- Les règles ESLint, définies dans .eslintrc.json, imposent un style homogène et détectent les erreurs potentielles dès l’écriture.

- Un Dockerfile basé sur node:20‑alpine génère une image extrêmement légère, tandis que .dockerignore exclut du build les fichiers inutiles (git, tests, modules locaux…).

- Le fichier docker-compose.yml orchestre le lancement local : une seule commande suffit pour construire l’image (si nécessaire) puis exécuter le conteneur.

- Enfin, le workflow GitHub Actions (.github/workflows/ci.yml) automatise la chaîne : lint → tests → build Docker → push sur Docker Hub. Chaque push ou pull‑request déclenche ces étapes, assurant qu’aucune régression n’atteint la branche principale.

📝 Partie 2 — Étapes pour utiliser le projet Partie 2 — Étapes pour utiliser le projet

1️⃣ Cloner le dépôt

2️⃣ Prérequis
  - Docker Engine + Compose v2
  - (Facultatif) Node.js 20 si tu veux tout lancer sans conteneur

3️⃣ Construire & lancer via Docker Compose

docker compose up --build          # interactif

docker compose up -d --build       # en arrière‑plan

4️⃣ Lancer en local (hors Docker)

npm install   # dépendances

npm run lint  # qualité

npm test      # tests unitaires

npm start     # exécution

5️⃣ Pipeline CI/CD

Chaque push ou PR déclenche automatiquement :

  - Lint (npm run lint)
    
  - Tests (npm test)
    
  - Build de l’image Docker
    
  - Push sur Docker Hub → docker.io/<user>/hello-node:latest
    
![image](https://github.com/user-attachments/assets/5ddcd83d-6ced-4da3-a2db-e9376efcaf90)

