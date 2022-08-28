# Next.js No-Trello App

In order to locally run the app, a database is needed

```
docker-compose up -d
```

- -d means **detached**

- MongoDB URL Local:

```
mongodb://localhost:27017/entriesdb
```

## Configure entorno variables

Rename file **.env.template** to **.env**

## Populate the database with test information

Call to:

```
http://localhost:3000/api/seed
```
