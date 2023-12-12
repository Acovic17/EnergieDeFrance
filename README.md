# Energie de France

Ce projet a été réalisé dans l'encadrement du hub à Epitech Paris.

Le projet a pour but de mettre à disposition une plateforme web (qui est ici en local) à une quelconque tierce personne, qui souhaite comprendre pourquoi les prix des énergies en France a pu augmenter ou baisser sur certaines périodes.

## Lancer le projet

### Récupérer le repository

Il faut d'abord importer le répertoire sur votre machine pour se faire :

`git clone git@github.com:Acovic17/EnergieDeFrance.git`


### Back

Pour lancer le backend, il suffit de se rendre dans le dossier back avec la commande suivante:

`cd back`

Puis executer la commande suivante:

`uvicorn main:app`

### Front

Pour lancer le frontend, il suffit de se rendre dans le dossier front avec la commande suivante:

`cd front`

Puis executer les commandes suivantes:

`npm i`, en cas d'erreur ajouter le flag `-f`, puis:
`npm start`

## Sources

Vous pourrez retrouver la page contenant le projet dans son intégralité : `https://www.data.gouv.fr/fr/pages/odu/defi_energie/`

Les datasets utilisés :
- `https://www.data.gouv.fr/fr/datasets/origine-de-lelectricite-fournie-par-edf-sa/`
- `https://www.data.gouv.fr/fr/datasets/bilan-previsionnel-electrique-2021-offre-de-production/`