# TP Todo List API

Une simple API REST exposant des services autour du concept de Todo List, réalisée dans le cadre de l'enseignement du développement d'API REST avec Node.js, implémentées au sein d'architectures Micro Services mises en place avec Docker et consommées par tous types de clients (Web, Mobile...).

## TP03 : Express.js

```
git checkout tp03
```

- organisation des Routes dans des fichiers distincts

### Commandes

## API

```
curl localhost:3000
```

```
curl -X GET localhost:3000/todos
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
docker-composel run tp.todolist.api npm i nodemon -g
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
