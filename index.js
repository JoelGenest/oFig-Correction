// Toujours commencer par importer les variables d'environnement !
require('dotenv').config();

const express = require('express');
const session = require('express-session');


// on importe le router
const router = require('./app/router');

// un peu de config
const PORT = process.env.PORT || 3000;


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'app/views');

// servir les fichiers statiques qui sont dans "app/public"
app.use(express.static('app/public'));

app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: (1000*60*60*3)
  }
}))

// routage !
app.use(router);

app.use( (req, res) => {
  res.status(404).render('404');
})


// on lance le serveur
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});





