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
bookmarksPage: (req, res) => {
    res.render('bookmarks');
  },
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

Intgrer les reviews dans la page article, dans la modale prévue à cet effet.

```js
//dataMapper.js
getReviewByArticle: async (id) => {
    const query = {
      text:`
      SELECT *
      FROM review
      WHERE figurine_id = $1
      `,
      values: [Number(id)]
    }
    
    const {rows: reviews} = await client.query(query)
    return reviews
  }
```

```js
//mainController.js
articlePage: async (req, res) => {
    
    try {
      const figurine = await dataMapper.getOneFigurine(req.params.id)
      const reviews = await dataMapper.getReviewByArticle(req.params.id)

      res.render('article', {figurine, reviews});
    }catch(error) {
      console.log(error)
      res.status(500).send(error);
    }
  }
```

```html
<!-- article.ejs -->
<% for(const review of reviews ) { %>
  <section>
    <h5><%= review.title %> &nbsp; <small class="text-muted">
      <%- ['&#9733;','&#9733;','&#9733;','&#9733;','&#9733;','&#9734;','&#9734;','&#9734;','&#9734;','&#9734;'].slice(5 - review.note, 10 - review.note).join('') %>
      </small></h5>
    <p class="review-author">par <%= review.author %></p>
    <p><%= review.message %></p>
  </section>
  
  <hr>
<% } %>
```

### Bonus 2 :

Écrire une requête dans dataMapper pour récupérer le nombre de figurines de chaque catégorie.

```js
// dataMapper.js
getCategoryStats: async () => {
    const query = {
      text: `
      SELECT category AS name, COUNT(id) AS qty
      FROM figurine
      GROUP BY category
      ORDER BY name ASC;
      `,
    }
    const {rows: categories} = await client.query(query)
    console.log(categories)
    return categories
  }
```

```html
<!-- leftMenu.ejs -->
<% for( const category of categories ) { %>
  <a class="list-group-item d-flex justify-content-between align-items-center" href="/category/<%- category.name.toLowerCase() %>">
    Les <%- category.name.toLowerCase().slice(-2) == 'al' ? category.name.slice(0, -1).toLowerCase() + 'ux' : category.name.toLowerCase() + 's' %>
    <span class="badge badge-primary badge-pill"><%= category.qty %></span>
  </a>
<% } %>
```

Appeler cette requête dans toutes les pages ou on en a besoin !

```js
// mainController.js
const mainController = {

  homePage: async (req, res) => {
    try {
      const categories = await dataMapper.getCategoryStats()
      const figurines = await dataMapper.getAllFigurines()
      res.render('home', {figurines, categories});
    }catch(error) {
      console.log(error)
      res.status(500).send(error);
    }
  },

  articlePage: async (req, res) => {
    
    try {
      const categories = await dataMapper.getCategoryStats()
      const figurine = await dataMapper.getOneFigurine(req.params.id)
      const reviews = await dataMapper.getReviewByArticle(req.params.id)

      res.render('article', {figurine, categories, reviews});
    }catch(error) {
      console.log(error)
      res.status(500).send(error);
    }
  }

};
```
Chaque lien doit envoyer vers une page qui ne liste que les figurines de la catégorie cliquée. Tout est dit !

```js
// router.js
router.get('/category/:category', mainController.categoryPage);
```

```js
//dataMapper.js
getFigurinesByCategory: async (category) => {
    const query = {
      text: `
      SELECT * FROM figurine WHERE LOWER(category) = $1;
      `,
      values: [category]
    }
    const {rows: figurines} = await client.query(query)
    //console.log(figurines)
    return figurines
  },
```

```js
//mainController.js
categoryPage: async (req, res) => {
    try {
      const categories = await dataMapper.getCategoryStats()
      const figurines = await dataMapper.getFigurinesByCategory(req.params.category)

      res.render('home', {figurines, categories});
    }catch(error) {
      console.log(error)
      res.status(500).send(error);
    }
  }
```

### Bonus DE LA MORT :
Trouver un moyen de calculer et d'afficher la note globale de chaque figurine à partir des notes des reviews associés. ★ (étoile pleine) : U+2605 ☆ (étoile vide) : U+2606

```js
// dataMapper.js
const dataMapper = {
  getAllFigurinesWithNote: async () => {
    const query = `
    SELECT f.*, ROUND(AVG(r.note)) AS note
    FROM figurine AS f
    LEFT JOIN review AS r ON r.figurine_id = f.id
    GROUP BY f.id;
    `
    const {rows: figurines} = await client.query(query)
    return figurines
  },
  
  getFigurinesByCategoryWithNote: async (category) => {
    const query = {
      text: `
      SELECT f.*, ROUND(AVG(r.note)) AS note
      FROM figurine AS f
      LEFT JOIN review AS r ON r.figurine_id = f.id
      WHERE LOWER(f.category) = $1
      GROUP BY f.id;
      `,
      values: [category]
    }
    const {rows: figurines} = await client.query(query)
    //console.log(figurines)
    return figurines
  },
  
  getOneFigurine: async (id) => {
    const {rows: figurine} = await client.query('SELECT * FROM figurine WHERE id = $1;', [id])
    console.log(figurine)
    return figurine[0]
  },

  getOneFigurineWithStats: async (id) => {
    const query = {
      text: `
      SELECT f.*, ROUND(AVG(r.note)) AS note, COUNT(r.id) AS reviews
      FROM figurine AS f
      LEFT JOIN review AS r ON r.figurine_id = f.id
      WHERE f.id = $1
      GROUP BY f.id;
      `,
      values: [id]
    }
    const {rows: figurine} = await client.query(query)
    console.log(figurine)
    return figurine[0]
  },

  getReviewByFigurine: async (id) => {
    const query = {
      text: `SELECT * FROM review WHERE figurine_id = $1;`,
      values: [id]
    }
    
    const {rows: reviews} = await client.query(query)
    return reviews
  },

  getCategoryStats: async () => {
    const query = {
      text: `
      SELECT category AS name, COUNT(id) AS qty
      FROM figurine
      GROUP BY category
      ORDER BY name ASC;
      `,
    }
    const {rows: categories} = await client.query(query)
    console.log(categories)
    return categories
  }
};
```
```js
// mainController.js
const mainController = {

  homePage: async (req, res) => {
    try {
      const categories = await dataMapper.getCategoryStats()
      const figurines = await dataMapper.getAllFigurinesWithNote()
      res.render('home', {figurines, categories});
    }catch(error) {
      console.log(error)
      res.status(500).send(error);
    }
  },

  articlePage: async (req, res) => {
    
    try {
      const categories = await dataMapper.getCategoryStats()
      const figurine = await dataMapper.getOneFigurineWithStats(req.params.id)
      const reviews = await dataMapper.getReviewByFigurine(req.params.id)

      res.render('article', {figurine, categories, reviews});
    }catch(error) {
      console.log(error)
      res.status(500).send(error);
    }
  },

  categoryPage: async (req, res) => {
    try {
      const categories = await dataMapper.getCategoryStats()
      const figurines = await dataMapper.getFigurinesByCategoryWithNote(req.params.category)

      res.render('home', {figurines, categories});
    }catch(error) {
      console.log(error)
      res.status(500).send(error);
    }
  }

};
```

```html
<!-- home.ejs -->
<small class="text-muted">
  <%- ['&#9733;','&#9733;','&#9733;','&#9733;','&#9733;','&#9734;','&#9734;','&#9734;','&#9734;','&#9734;'].slice(5 - figurine.note, 10 - figurine.note).join('') %>
</small>
```

```html
<!-- article.ejs -->
<p class="card-text"><%= figurine.reviews %>
Note moyenne : <%- ['&#9733;','&#9733;','&#9733;','&#9733;','&#9733;','&#9734;','&#9734;','&#9734;','&#9734;','&#9734;'].slice(5 - figurine.note, 10 - figurine.note).join('') %>
<br>
```