# 📘 Registre de décisions d'architecture (ADR)

---

## ADR 001 — Choix de la plateforme

**Contexte**  
Le projet vise à concevoir une application distribuée simulant un système de point de vente avec plusieurs rôles (magasin, maison mère, logistique). Le langage JavaScript avec Node.js a déjà été utilisé dans le laboratoire précédent (Lab 1), avec des outils configurés tels que Jest, ESLint et Docker.

**Décision**  
Continuer avec **Node.js** pour le backend, les interfaces consoles, et l’API REST.

**Statut**  
Acceptée

**Conséquences**
- Réutilisation directe des outils et dépendances précédents.
- Familiarité accrue = productivité plus rapide.
- Intégration simple avec des outils modernes comme Express, Sequelize, Jest et Docker.

---

## ADR 002 — Choix de l’architecture logicielle

**Contexte**  
L'application doit prendre en charge plusieurs rôles (POS, maison mère, logistique) avec des comportements différents. Il faut une séparation claire des responsabilités et une base modulaire.

**Décision**  
Adopter une **architecture 2-tier modulaire**, combinant :
- Interfaces console (clients)
- Serveur API REST (Express) pour la logique métier et les accès BD

**Statut**  
Acceptée

**Conséquences**
- Facilité d’évolution par rôle (console vs API)
- Chaque composant peut être testé et exécuté indépendamment
- Prépare le terrain pour un découplage futur en microservices

---

## ADR 003 — Choix de la base de données

**Contexte**  
Le système doit permettre la consultation, l'enregistrement et l'agrégation de données (produits, ventes, utilisateurs, demandes de réapprovisionnement) dans un environnement multi-utilisateurs.

**Décision**  
Utiliser **PostgreSQL** comme base de données relationnelle partagée entre les services.

**Statut**  
Acceptée

**Conséquences**
- Compatible avec Sequelize ORM
- Supporte les transactions complexes et relations multiples
- Conteneurisé avec Docker pour un déploiement reproductible

---

## ADR 004 — Choix de l'orchestration

**Contexte**  
L'application comprend plusieurs composants à faire fonctionner ensemble (API, base de données, consoles POS et maison mère).

**Décision**  
Utiliser **Docker Compose** pour orchestrer les services et simplifier le développement local.

**Statut**  
Acceptée

**Conséquences**
- Facile à démarrer et arrêter avec une seule commande
- Reproductibilité de l’environnement sur toute machine
- Simplifie l’intégration continue et les tests

---

> Ce registre pourra évoluer avec les prochaines versions du système.
