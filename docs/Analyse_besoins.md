# 📄 Spécification des besoins

Ce document présente les besoins fonctionnels et non-fonctionnels du système de point de vente distribué développé dans le cadre du laboratoire 2 du cours LOG430.

---

## Besoins fonctionnels

### Côté magasin (console POS)

- **Authentification simplifiée** : sélection d’un magasin et d’un utilisateur (employé) pour la session active.
- **Recherche de produits** : par nom, catégorie ou identifiant.
- **Consultation du stock local** : visualiser en temps réel les quantités disponibles pour chaque produit.
- **Création d’une vente** :
  - Sélection d’un ou plusieurs produits.
  - Calcul automatique du total.
  - Réduction automatique du stock.
- **Paiement** : enregistrement d’un paiement lié à la vente.
- **Retour / annulation de vente** : possibilité d’annuler une vente existante, avec remise à jour automatique du stock.
- **Demande de réapprovisionnement** : possibilité d’envoyer une demande de stock vers le centre logistique.

### Côté maison mère

- **Tableau de bord global** : vue consolidée de tous les magasins avec état des stocks.
- **Rapport consolidé des ventes** :
  - Chiffre d’affaires par magasin.
  - Classement des produits les plus vendus.
  - État du stock par produit pour chaque magasin.

### Côté logistique / centre de distribution

- **Affichage du stock central (logistique)** : visualiser les produits et quantités disponibles.
- **Réception des demandes de réapprovisionnement** : les demandes sont enregistrées pour traitement futur (simulé pour ce lab).

---

## Besoins non-fonctionnels

- **Fiabilité des données** :
  - Le stock est mis à jour automatiquement après chaque vente, retour ou réapprovisionnement.
  - Vérification de la disponibilité du stock avant validation d’une vente.

- **Performance** :
  - Les interactions console doivent se faire en moins de quelques secondes.
  - Accès rapide à la base de données grâce à Sequelize.

- **Utilisabilité** :
  - Interface en mode console claire et interactive (menus guidés avec Inquirer.js).
  - Affichage structuré à l’aide de `cli-table3` et couleurs avec `chalk`.

- **Modularité et extensibilité** :
  - Code organisé par rôle (magasin, maison mère, logistique).
  - API REST séparée pour la logique métier (Express).

- **Testabilité et qualité** :
  - Présence de tests unitaires (Jest).
  - CI automatisée avec GitHub Actions.
  - Linting intégré avec ESLint.

---
