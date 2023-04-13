# Initialiser le repo  

## Côté GitHub  

→ New  
 - Owner / oBlog-JoelGenest
 - Private or Public
 - Create repository
  

GitHub nous indique la marche à suivre :
  ```bash
git remote add origin git@github.com:JoelGenest/oBlog-Correction.git
git branch -M main
git push -u origin main
  ```
## Coté Git  
On initialise Git ```git init```  
/!\ → Chemin relatif / absolu 

On pense au fichier .gitignore
```
node_modules/
.env
```

Avant les commandes que l'on nous a fourni :
```
git add .
git commit -m 'initial commit'
```

On peut passer aux commandes fournies sur GitHub

## Go Challenge  

### Etape 1 :
```
npm init -y
npm i ejs express pg dotenv
```

Créer un fichier .env
```bash
PORT=3000
```
### Etape 2 :

Créer dossier `views` dans le dossier `app` et y deplacer les `.ejs`
faire les reglage `index.js` → `ejs` / `views`

- index.js
```js
require('dotenv').config();
const express = require('express');
const router = require('./app/router');

const app = express();


app.set('view engine', 'ejs')
app.set('views', 'app/views')

app.use(express.static('public'));


app.use(router);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
```


factoriser `header.ejs`, `footer.ejs`, `leftMenu.ejs`

- header.ejs
```html
<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">

  <title>O'Fig - un magasin de figurines</title>

  <!-- Bootstrap core CSS -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

  <!-- Custom styles for this template -->
  <link href="/css/style.css" rel="stylesheet">

</head>

<body>

  <!-- Navigation -->
  <nav class="navbar navbar-expand-lg fixed-top">
    <div class="container">
      <a class="navbar-brand" href="/">O'Fig</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/">Home
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Contact</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/bookmarks">Favoris</a>
          </li>
          <li class="nav-item">
            <form class="form-inline my-2 my-lg-0">
              <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
              <button class="btn btn-outline-ofig my-2 my-sm-0" type="submit">Search</button>
            </form>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  ```


- footer.ejs
```html
<!-- Footer -->
<footer class="py-5 bg-dark">
  <div class="container">
    <p class="m-0 text-center text-white">Copyright &copy; O'Fig 2019 - Toutes les images sont sous Copyright SquareEnix</p>
  </div>
  <!-- /.container -->
</footer>

<!-- Bootstrap core JavaScript -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap.native/2.0.15/bootstrap-native-v4.min.js"></script>

</body>

</html>
```

- leftMenu.ejs
```html
  <!-- Page Content -->
  <div class="container container-main">

    <div class="row">

        <div class="col-lg-3">

            <h1 class="my-4">O'Fig</h1>
            <h5>Catégories</h5>
            <div class="list-group">
              <a class="list-group-item d-flex justify-content-between align-items-center" href="#">
                  Les gentils
                <span class="badge badge-primary badge-pill">4</span>
              </a>
              <a class="list-group-item d-flex justify-content-between align-items-center" href="#">
                  Les méchants
                <span class="badge badge-primary badge-pill">3</span>
              </a>
              <a class="list-group-item d-flex justify-content-between align-items-center" href="#">
                  Les animaux
                <span class="badge badge-primary badge-pill">1</span>
              </a>
            </div>
    
          </div>
      <!-- /.col-lg-3 -->
```
modifier `controllers`
 - mainController.js
 ```js
 const mainController = {

  homePage: (req, res) => {
    res.render('home');
  },

  articlePage: (req, res) => {
    res.render('article');
  }

};

module.exports = mainController;
```

- bookmarksController.js
```js
const mainController = {

  homePage: (req, res) => {
    res.render('home');
  },

  articlePage: (req, res) => {
    res.render('article');
  }

};

module.exports = mainController;
```

_______


  
### Etape 3 : 
Les données sont fournies dans un fichier `create_db.sql`, à importer dans une base de données PostGreSQL. 
```bash
# On crée Utilisateur, BDD, Mot de passe
sudo -i -u postgres psql
CREATE ROLE username WITH LOGIN PASSWORD 'password';
CREATE DATABASE db_name OWNER username;
ALTER # Modifications
\q

# On alimente la BDD
psql -U username -d db_name -f ./data/create_db.sql

# On peut s'y connecter
psql -U username -d db_name

# Pour rappel :
\dt # Visualiser la liste des tables
\dl # Visualiser la liste des roles
\d db_name  # Visualiser le détails de la db (colonne, type, PK, FK)

```



Créer un fichier `.env`, pour y mettre les informations de connexion à la base de données.

Créer ensuite un fichier `dataMapper.js` dans le dossier `app`.

Dans ces fichiers, copier ce code :

- .env
```bash
PG_URI = 'postgresql://oblogx:oblogx@localhost/oblogx'
# PG_URI='postgresql://username:password@localhost/db_name'
```
- database.js
```js
// 1. require le module
const pg = require('pg');
require('dotenv').config();

// 2. Créer un client
const client = new pg.Client(process.env.PG_URI);

// 3. Connecter le client
client.connect()
  .then(console.log("✅ CONNECTE A LA DB !")) //Ctrl+Maj+U → U+2705 → 🚨
  .catch((error) => {
    console.log("🚨 :", error) //Ctrl+Maj+U → U+1F6A8 → 🚨
  })

// 4. Exporter le client connecté
module.exports = client;
```

- dataMapper.js
```javascript
const client = require('./database');

const dataMapper = {


};

module.exports = dataMapper;
```

On implémente les méthodes suivantes dans l'objet dataMapper:
getAllFigurines()
getOneFigurine(id)

- dataMapper.js
```javascript
const client = require('./database');

const dataMapper = {
  getAllFigurines: async () => {
    const query = `
    SELECT * FROM figurine;
    `
    const {rows: figuurines} = await client.query(query)
    //console.log(figurines)
    return figurines
  },

  getOneFigurine: async (id) => {
    const {rows: figurine} = await client.query('SELECT * FROM figurine WHERE id = $1', [id])
    //console.log(figurine)
    return figurine[0]
  }
};

module.exports = dataMapper;
```
### Etape 4 :

Modifier la méthode homePage de l'objet mainController
 - mainController.js
```js
 homePage: async (req, res) => {
    try {
      const figurines = await dataMapper.getAllFigurines()
      res.render('home', {figurines});
    }catch(error) {
      console.log(error)
      res.status(500).send(error);
    }
  },
```
Modifier la view accueil pour utiliser les données qui viennent de la base de données 
 - home.ejs
```html
 <% for(const figurine of figurines ) { %>
  <div class="col-lg-4 col-md-6 mb-4">
    <div class="card h-100">
      <a href="/article">
        <img class="card-img-top" src="/images/<%- figurine.name.toLowerCase() %>.png" alt="">
        <div class="badge-category badge badge-pill badge-<%- figurine.category.toLowerCase() %>"><%= figurine.category %></div>
      </a>
      <div class="card-body">
        <h4 class="card-title">
          <a href="/article"><%= figurine.name %></a>
        </h4>
        <h5>$<%= figurine.price %></h5>
        <p class="card-text"><%= figurine.description %></p>
      </div>
      <div class="card-footer">
        <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
        <a href="/bookmarks" class="link-add-bookmarks">+ Ajouter aux favoris</a>
      </div>
    </div>
  </div>
<% } %>
```

Changer la route /article pour qu'elle attende un paramètre.
```js
router.get('/article/:id', mainController.articlePage);
```

Modifier la méthode articlePage de l'objet mainController sur le même principe que précédemment, en utilisant le paramètre situé dans la requête.
```js
 articlePage: async (req, res) => {
    
    try {
      const figurine = await dataMapper.getOneFigurine(req.params.id)
      res.render('article', {figurine});
    }catch(error) {
      console.log(error)
      res.status(500).send(error);
    }
  }
```

Mettre à jour la view article pour utiliser les données de la BDD.
```html
<div class="row">
  <div class="col-lg-6">
    <img class="" src="/images/<%- figurine.name.toLowerCase() %>.png" alt="">
  </div>

  <div class="col-lg-6">
    <div class="card">
      <div class="card-body">
          <h3 class="card-title">
            <%= figurine.name %>
            <div class="badge badge-pill badge-<%- figurine.category.toLowerCase() %>"><%= figurine.category %></div>
          </h3>
          <p class="card-text">Taille réelle : <%= figurine.size %>cm</p>
          <p class="card-text"><%= figurine.description %></p>
          <p class="card-text">3
            Note moyenne : &#9733; &#9733; &#9733; &#9733; &#9734;
            <br>
            <a href="#" data-toggle="modal" data-target="#reviewsModal">Détails des avis</a>
          </p>
          <h5>$<%= figurine.price %></h5>
          <p class="card-text">
            <a href="#" class="link-add-bookmarks">+ Ajouter aux favoris</a>
          </p>
      </div>
    </div>
  
  </div>

</div>
```
Mettre à jour la view accueil pour que les liens pointent vers la bonne page article.

### Etape 5 :

Ajouter le package express-session. Un petit tour sur la doc, ça peut pas faire de mal.
```bash
npm i express-session
```

```js
const session = require('express-session')
```

Mettre en place le middleware dans index.js
```js
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: (1000*60*60)
  }
}))
```
Implémenter une nouvelle route /bookmarks/add/:id, qui ajoute la figurine correspondante (cf paramètre id) dans la session. Cette route redirige ensuite vers /bookmarks, et tous les boutons "Ajouter aux favoris" doivent pointer sur cette route.
```js
  router.get('/bookmarks/add/:id', bookmarksController.addBookmarks);
```

```js
  addBookmarks: async (req, res) => {
    const id = req.params.id
    if(!req.session.bookmarks) {
      req.session.bookmarks = []
    }

    if(!req.session.bookmarks.find(fig => fig.id == id )) {
      req.session.bookmarks.push(await dataMapper.getOneFigurine(id))
    }
    
    res.redirect('/bookmarks');
  }

```
Implémenter une nouvelle route /bookmarks/delete/:id, qui supprime la figurine correspondante dans la session. Les liens Enlever de la liste dans la page "favoris" doivent pointer vers cette route !
```js
  router.get('/bookmarks/delete/:id', bookmarksController.deleteBookmarks);
```

```js
  deleteBookmarks: async (req, res) => {
    const index = req.session.bookmarks.findIndex(fig => fig.id == req.params.id)
    req.session.bookmarks.splice(index, 1);
    res.redirect('/bookmarks');
  }

```
### Bonus 1 :


<!-- Ici autre code -->

<!-- Ici autre code -->
Créer un fichier router.js
Initialiser le router et l'exporter
Deplacer les require et les creer si besoin  

2 fichiers concernés :

- app.js
```js
const express = require('express') // Etape 1
const app = express() // Etape 1
const router = require('./router') // Bonus 1


app.set("view engine", "ejs") // Etape 1
app.set("views", "views") // Etape 1

app.use(express.static('static')) // Etape 1

app.use(router) // Bonus 1

const hostname = "127.0.0.1" // Etape 1
const port = 3000 // Etape 1
app.listen(port, () => { // Etape 1
  console.log(`serveur is running at http://${hostname}:${port}`) // Etape 1
}) // Etape 1
```

- router.js
```js
const { Router } = require("express") // Bonus 1
const router = Router() // Bonus 1
const data = require('./data/articles.json') // Bonus 1


router.get('/', (req, res) => { // Bonus 1
  res.render('index', {articles: data} /* Etape 3 */) // Bonus 1
}) // Bonus 1

router.get('/article/:id', (req, res) => { // Bonus 1
  const article = data.find(art => art.id == req.params.id) // Bonus 1
  res.render('article', {article}) // Bonus 1
}) // Bonus 1

module.exports = router // Bonus 1
```

### Bonus 2 :
Creer une route pour les category
Générer les liens dans les vues
Gérer les datas envoyer dans la route  

3 fichiers concernés :

- index.ejs et article.ejs
```html
<div class="card-meta">
  Par <a href="#"><%= article.author %></a> 
  dans la catégorie <a href="/category/<%= article.category %>"><%= article.category %></a> <!-- Bonus 2 -->
</div>
```

- router.js
```js
router.get('/category/:cat', (req, res) => { // Bonus 2
  const articles = data.filter(art => art.category == req.params.cat) // Bonus 2
  res.render('index', {articles}) // Bonus 2
}) // Bonus 2
```

### Bonus 3 :
Créer un fichier controller.js on l'exporte et on importe les datas
Deplacer toutes les fonctions

2 fichiers concernés :

- router.js
```js
const { Router } = require("express") // Bonus 1
const router = Router() // Bonus 1
// const data = require('./data/articles.json') // Bonus 1 // Bonus 3
const controller = require('./controller')

router.get('/', controller.home) // Bonus 3
router.get('/article/:id', controller.article) // Bonus 3
router.get('/category/:cat', controller.category) // Bonus 3

module.exports = router // Bonus 1
```

- controller.js
```js
const data = require('./data/articles.json') // Bonus 3

const controller = {
 home: (req, res) => { // Bonus 3
  res.render('index', {articles: data}) // Bonus 3
},

article: (req, res) => { // Bonus 3
  const article = data.find(art => art.id == req.params.id) // Bonus 3
  res.render('article', {article}) // Bonus 3
}, // Bonus 3

category: (req, res) => { // Bonus 3
  const articles = data.filter(art => art.category == req.params.cat) // Bonus 3
  res.render('index', {articles}) // Bonus 3
}
}

module.exports = controller
```

### Bonus 4 :  
Limiter les mots du texte
2 fichiers concernés :

- index.ejs
```html
<%- article.text.split(' ').slice(0, 30).join(' ') %>
```

### Bonus 5 :

##### Étape 1: Mise en place

Utiliser npm pour:
- Installer les dépendances nécessaires : `pg`, et `dotenv`.  

##### Étape 2: Brancher la Base de Données

Les données sont fournies dans un fichier `create_db.sql`, à importer dans une base de données PostGreSQL. 
```bash
# On crée Utilisateur, BDD, Mot de passe
sudo -i -u postgres psql
CREATE ROLE username WITH LOGIN PASSWORD 'password';
CREATE DATABASE db_name OWNER username;
ALTER # Modifications
\q

# On alimente la BDD
psql -U username -d db_name -f ./data/create_db.sql

# On peut s'y connecter
psql -U username -d db_name

# Pour rappel :
\dt # Visualiser la liste des tables
\dl # Visualiser la liste des roles
\d db_name  # Visualiser le détails de la db (colonne, type, PK, FK)

```



Créer un fichier `.env`, pour y mettre les informations de connexion à la base de données.

Créer ensuite un fichier `dataMapper.js` dans le dossier `app`.

Dans ces fichiers, copier ce code :
- .env
```bash
PG_URI = 'postgresql://oblogx:oblogx@localhost/oblogx'
# PG_URI='postgresql://username:password@localhost/db_name'
```
- database.js
```js
// 1. require le module
const pg = require('pg');
require('dotenv').config();

// 2. Créer un client
const client = new pg.Client(process.env.PG_URI);

// 3. Connecter le client
client.connect()
  .then(console.log("✅ CONNECTE A LA DB !")) //Ctrl+Maj+U → U+2705 → 🚨
  .catch((error) => {
    console.log("🚨 :", error) //Ctrl+Maj+U → U+1F6A8 → 🚨
  })

// 4. Exporter le client connecté
module.exports = client;
```

- dataMapper.js
```javascript
const client = require('./database');

const dataMapper = {


};

module.exports = dataMapper;
```

Puis remplacer les recherches requetes initialement faite sur articles.json par des requetes sql à implémenter dans l'objet dataMapper:

Toutes ces méthodes renverrons un tableaux d'objets contenant les infos des articles, un objet article ou null.
Toutes ses méthodes seront asynchrone (`async`).

- dataMapper.js
```javascript
const client = require('./data/database')

const dataMapper = {
  getAllArticles: async() => {
    const {rows: articles} = await client.query('SELECT * FROM article;')
    return articles
  },

  getOneArticle: async(id) => {
    const {rows: article} = await client.query('SELECT * FROM article WHERE id = $1;',[id])
    return article[0]
  },

  getArticlesByCategory: async(category) => {
    const {rows: articles} = await client.query('SELECT * FROM article WHERE LOWER(category) = $1;', [category.toLowerCase()])
    return articles
  },

}

module.exports = dataMapper
```

- controller.js
```javascript
const dataMapper = require('./dataMapper')


const controller = {
 home: async (req, res) => { // Bonus 3
  articles = await dataMapper.getAllArticles() // Bonus 5
  res.render('index', {articles}) // Bonus 3
},

article: async (req, res) => { // Bonus 3
  article = await dataMapper.getOneArticle(req.params.id) // Bonus 5
  res.render('article', {article}) // Bonus 3
}, // Bonus 3

category: async (req, res) => { // Bonus 3
  articles = await dataMapper.getArticlesByCategory(req.params.cat) // Bonus 5
  res.render('index', {articles}) // Bonus 3
}
}

module.exports = controller
```

### Bonus 5bis :
Mettre en place une page qui liste uniquement les articles appartenant à un auteur donné.
- router.js
```js
router.get('/author/:author', controller.author)
```

- index.ejs et article.ejs
```html
<div class="card-meta">
  Par <a href="/author/<%= article.author_name_lower %>"><%= article.author_name %></a> 
  dans la catégorie <a href="/category/<%= article.category.toLowerCase() %>"><%= article.category %></a> <!-- Bonus 2 -->
</div> 
```

- controller.js
```js
author: async (req, res) => { // Bonus 5bis
  articles = await dataMapper.getArticlesByAuthor(req.params.author) // Bonus 5bis
  res.render('index', {articles}) // Bonus 5bis
}
```

- dataMapper.js
```js
const client = require('./data/database')

const dataMapper = {
  getAllArticles: async() => {
    const query = `
      SELECT article.*, author.name_lower AS author_name_lower, author.name AS author_name
      FROM article
      LEFT JOIN author ON article.author_id = author.id
      `
    const {rows: articles} = await client.query(query)
    return articles
  },

  getOneArticle: async(id) => {
    const {rows: article} = await client.query('SELECT * FROM article WHERE id = $1;',[id])
    return article[0]
  },

  getArticlesByCategory: async(category) => {
    const {rows: articles} = await client.query('SELECT * FROM article WHERE LOWER(category) = $1;', [category.toLowerCase()])
    return articles
  },

  getArticlesByAuthor: async(author) => {
    const query = {
      text: `
      SELECT article.*, author.name_lower AS author_name_lower, author.name AS author_name
      FROM article
      LEFT JOIN author ON article.author_id = author.id
      WHERE author.name_lower = $1
      `,
      values: [author]
    }
    
    const {rows: articles} = await client.query(query)
    return articles
  },

}

module.exports = dataMapper
```

