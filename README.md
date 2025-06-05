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

## 🔄 Évolution du projet : de Lab 1 à Lab 2

Pour le Lab 2, j’ai fait évoluer le projet développé lors du Lab 1 en ajoutant de nouvelles fonctionnalités, tout en conservant une bonne partie de la structure existante. Voici un résumé des éléments que j’ai gardés, modifiés ou complètement refactorés.

---

### ✅ Éléments que j’ai conservés du Lab 1

- J’ai conservé la structure de base du projet avec les dossiers `src/`, `tests/` et `docs/`, ainsi que les fichiers essentiels comme `Dockerfile`, `docker-compose.yml`, `.gitignore`, `package.json`, etc.
- Les modèles Sequelize tels que `Produit`, `Vente`, `LigneVente`, `Paiement`, `Utilisateur` et `Categorie` sont toujours présents.
- L’interface console (`appConsole.js`) développée dans le Lab 1 est toujours fonctionnelle.
- J’ai également conservé les tests unitaires sur les entités de base, ainsi que l’intégration continue avec GitHub Actions.

---

### ✏️ Éléments que j’ai modifiés ou ajoutés dans le Lab 2

- J’ai ajouté une nouvelle console dédiée à la maison mère (`maisonMereConsole.js`) pour simuler une gestion centralisée.
- J’ai développé une API REST complète en utilisant **Express.js** dans `src/api/servers.js`. Cette API expose plusieurs routes pour accéder aux ressources via HTTP.
- J’ai créé de nouvelles routes REST (`magasinRoutes.js`, `logistiqueRoutes.js`, `maisonMereRoutes.js`, `stockRoutes.js`, etc.) pour mieux structurer les interactions selon les rôles (magasin, logistique, maison mère).
- Plusieurs nouveaux contrôleurs ont été ajoutés, comme `logistiqueController.js`, `maisonMereController.js` et `utilisateurController.js`, pour gérer les responsabilités métiers spécifiques.
- J’ai aussi créé de nouveaux modèles Sequelize : `Magasin`, `CentreLogistique` et `DemandeReappro` afin d’élargir le modèle métier à la gestion de la chaîne d’approvisionnement.
- Les tests ont été mis à jour pour inclure les nouvelles entités, avec par exemple `maisonMere.test.js` et `reappro.test.js`.

---

### 🔧 Éléments que j’ai refactorés

- J’ai séparé la logique console de la logique serveur en créant un répertoire `api/` contenant le serveur Express, les routes et les contrôleurs. Cela améliore la lisibilité du code et facilite l’évolutivité.
- J’ai structuré le code selon une approche plus modulaire et alignée sur le modèle MVC.
- J’ai ajouté un fichier `ADR.md` pour documenter les décisions architecturales prises lors du Lab 2.
- J’ai conservé le linting avec ESLint et la CI GitHub Actions pour assurer la cohérence et la qualité du code malgré la montée en complexité.

---

### 📌 Résumé comparatif

| Aspect                        | Lab 1                                   | Lab 2                                                 |
|------------------------------|-----------------------------------------|--------------------------------------------------------|
| Interface console            | Présente                                | Présente + ajout maison mère                          |
| API Web                      | ❌ Absente                              | ✅ Serveur Express avec plusieurs routes              |
| Modèles Sequelize            | Produit, Vente, etc.                    | Ajout de Magasin, CentreLogistique, Reappro          |
| Contrôleurs                  | Produit, Vente                         | Ajout de Logistique, MaisonMère, Utilisateur         |
| Tests                        | De base                                 | Nouvelles entités couvertes                          |
| Orchestration Docker         | App + DB                                | Identique (services exposés via API en plus)         |
| Organisation du code         | Centralisée                            | Refactorisée (MVC, modules, découplage)              |

---
## 📌 Nouvelles exigences et défis architecturaux (Lab 2)

Pour le Lab 2, les exigences ont évolué afin de simuler un environnement multi-acteurs avec des rôles distincts. Le système devait désormais inclure une **maison mère** ayant une vue centralisée sur les magasins, en plus des opérations habituelles du point de vente.

---

### ✅ Nouvelles exigences

1. **Supervision centralisée (Maison mère)**  
   La maison mère doit pouvoir :
   - Générer un **rapport consolidé des ventes** incluant le chiffre d’affaires par magasin et les produits les plus vendus.
   - Visualiser un **tableau de bord** global de l’état des stocks dans tous les magasins.

2. **Multiples points d’entrée**  
   Le système inclut :
   - Une console pour les magasins (`appConsole.js`)
   - Une console spécifique pour la maison mère (`maisonMereConsole.js`)
   - Une API REST permettant aux deux d’interagir avec un backend commun.

3. **Données consolidées**  
   Les données doivent être agrégées à travers plusieurs magasins afin d’être consultées par la maison mère. Cela implique une logique d’agrégation à différents niveaux (ventes, produits, inventaire).

4. **Communication entre interfaces et services**  
   Toutes les interfaces utilisent des appels HTTP à un serveur Express centralisé.

---

### ⚙️ Défis architecturaux rencontrés

1. **Création de rapports dynamiques**  
   J’ai dû construire un endpoint `/maison-mere/rapport` qui agrège les ventes de tous les magasins, calcule le chiffre d’affaires, trie les produits les plus vendus, et affiche les stocks par produit.

2. **Affichage structuré en console**  
   Pour rendre les rapports lisibles, j’ai intégré `cli-table3` et `chalk` pour afficher des tableaux colorés, rendant la console plus ergonomique.

3. **Centralisation via API REST**  
   Les deux interfaces (console magasin et maison mère) sont connectées au même backend. Cela m’a obligé à bien structurer les routes Express pour qu’elles soient modulaires et réutilisables.

4. **Séparation des rôles métier**  
   La logique de la maison mère étant différente de celle des magasins, j’ai séparé les routes et les contrôleurs liés à `maisonMere` dans leur propre module.

5. **Performance et agrégation**  
   Agréger les ventes et les stocks sur plusieurs magasins nécessite des requêtes SQL plus complexes. J’ai veillé à optimiser ces appels dans les contrôleurs côté serveur.

---

