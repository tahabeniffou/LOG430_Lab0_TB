# Registre de décisions d'architecture (ADR)

> Un registre de décision d'architecture (ADR) est un document qui capture une décision architecturale importante avec son contexte et ses conséquences. Inspiré de la structure proposée par Michael Nygard : [https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)

---

## ADR 001 — Choix de la plateforme

**Contexte**
Le projet consiste à concevoir une application console pour gérer un système de caisse local. Je suis déjà familier avec JavaScript et Node.js grâce au laboratoire précédent. Les outils de CI/CD sont également déjà configurés pour cette plateforme.

**Décision**
Utiliser Node.js pour développer l’application console.

**Statut**
Acceptée

**Conséquences**

* Réduction du temps d’apprentissage.
* Réutilisation des outils déjà en place (Jest, ESLint, Docker).
* Développement rapide et fluide en JavaScript.

---

## ADR 004 — Choix du mécanisme de base de données

**Contexte**
L’application est conçue pour fonctionner localement sans dépendance réseau. Elle doit être simple à installer et à déployer.

**Décision**
Utiliser SQLite comme base de données relationnelle locale.

**Statut**
Acceptée

**Conséquences**

* Pas besoin d’installer un serveur de base de données.
* Parfait pour les tests et l’environnement de développement local.
* Stockage dans un simple fichier, facile à déplacer ou sauvegarder.

---

> Note : Ce document peut évoluer si de nouvelles décisions doivent être prises au fil des versions du système.
