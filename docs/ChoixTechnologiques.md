# Choix technologiques — Système de caisse POS (2-tier)

Ce document présente les choix technologiques faits dans le cadre du développement de l’application console POS, avec une justification claire basée sur les contraintes pédagogiques et techniques du projet : **simplicité**, **portabilité**, **fiabilité**, et **coût faible**.

---

## Plateforme de développement

**Node.js**
Choisi comme environnement principal d'exécution.

**Justification** :

* Déjà utilisé dans le Lab 0 → continuité naturelle.
* Léger, rapide à démarrer.
* Large écosystème de bibliothèques.
* Gratuit, open-source et multiplateforme.

---

## Gestion de dépendances & packaging

**npm** (Node Package Manager)
Utilisé pour installer les bibliothèques (ORM, linter, outils de test).

**Justification** :

* Intégré à Node.js.
* Très répandu et documenté.

---

## Persistance des données

**SQLite (base relationnelle locale)**
Base de données légère, enregistrée dans un fichier `.sqlite`.

**Justification** :

* Aucun serveur à configurer (local uniquement).
* Idéal pour une application simple et autonome.
* Supporte les transactions (fiabilité des ventes).
* Compatible avec les ORM modernes comme Sequelize.

---

## ORM utilisé

**Sequelize**
Object-Relational Mapping (ORM) pour Node.js.

**Justification** :

* Abstraction des requêtes SQL.
* Support natif de SQLite.
* Facile à apprendre et à utiliser.
* Permet de garder le code métier indépendant de la base utilisée.

---

## Tests

**Jest**
Framework de tests unitaires.

**Justification** :

* Déjà utilisé dans le labo précédent.
* Syntaxe simple.
* Très bon support pour les tests Node.js.

---

## Qualité du code

**ESLint**
Analyse statique du code JavaScript.

**Justification** :

* Garantit un style de code uniforme.
* Détecte les erreurs potentielles avant exécution.
* Facile à intégrer dans une pipeline CI.

---

## Conteneurisation

**Docker** + **Docker Compose**
Utilisés pour packager et exécuter l’application localement dans un environnement contrôlé.

**Justification** :

* Facilite la reproductibilité du projet.
* Exécution identique peu importe la machine.
* Intégration simple avec CI/CD.

---

## Intégration Continue

**GitHub Actions**
Utilisé pour automatiser les étapes clés à chaque push : lint, test, build, push Docker.

**Justification** :

* Gratuit pour les dépôts publics.
* Facile à configurer (fichier YAML).
* Compatible avec npm, Docker, ESLint, Jest…

---

## Résumé

Les technologies sélectionnées offrent :

* **Simplicité** : peu d'installation, configuration minimale.
* **Fiabilité** : gestion des transactions et tests automatisés.
* **Portabilité** : fonctionnement local avec Docker et SQLite.
* **Coût nul** : tous les outils sont open source et gratuits.

Ces choix sont parfaitement adaptés au contexte d’un laboratoire universitaire avec des objectifs pédagogiques clairs.
