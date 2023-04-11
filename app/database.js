// 1. require le module
const pg = require('pg');
require('dotenv').config();

// 2. Créer un client
const client = new pg.Client(process.env.PG_URL);

// 3. Connecter le client
client.connect()
  .then(console.log("✅ CONNECTE A LA DB !"))
  .catch((error) => {
    console.log("🚨 :", error)
  })

// 4. Exporter le client connecté
module.exports = client;