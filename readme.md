# TP Todo List API

Une simple API REST exposant des services autour du concept de Todo List, réalisée dans le cadre de l'enseignement du développement d'API REST avec Node.js, implémentées au sein d'architectures Micro Services mises en place avec Docker et consommées par tous types de clients (Web, Mobile...).

<<<<<<< HEAD
## TP09 : Sécurité
=======
## TP09 : Authentification **!!!!!!!!!!!!!** Work in progress **!!!!!!!!!!!!!!!!!**
>>>>>>> c75a889a2960a03b14cd0e297d690eefdfe9e894

```
git checkout tp09
```
<<<<<<< HEAD
- implémentation des bonnes pratiques de sécurité associées à Express.js : https://expressjs.com/fr/advanced/best-practice-security.html
- gestion de Cors
=======

- création de comptes utilisateurs avec mot de passe crypté par Bcrypt
>>>>>>> c75a889a2960a03b14cd0e297d690eefdfe9e894

### Commandes

## API

```
curl localhost:3000
```

## Ngrok

Exposition de l'API locale (port 3000) sur internet pour accès distant (ex: depuis un client mobile, un client web distant...).

https://ngrok.com/

```
ngrok http 3000
```

## Docker Compose

- Se placer à la racine du projet

```
docker-compose up
```

- Installation d'un module NPM de façon globale directement dans le container

```
docker-compose run tp.todolist.api npm i express
```

- Installation d'un module NPM de façon globale directement dans le container

```
docker-compose run tp.todolist.api npm i nodemon -g
```

- En cas de problèmes de droits d'écritures dans les volumes :

```
sudo chown "$USER":"$USER" . -R
```

## Crédits

Icons made by Freepik from www.flaticon.com

---

__Alexandre Leroux__

alex@sherpa.one

_Enseignant vacataire à l'Université de Lorraine_

- IUT Nancy-Charlemagne (LP Ciasie)

- Institut des Sciences du Digital (Masters Sciences Cognitives)
