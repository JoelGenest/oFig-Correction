sudo -i -u postgres psql  

petit résumé des commandes postgreSQL « de base »
\l pour lister les base de données
\du pour lister les utilisateur (ou « roles ») existants
\dt pour lister les tables de la base de données courante

psql -U nomDeLutilisateur -d nomDeLaBase

psql -U nomDeLutilisateur -d nomDeLaBase -f chemin/du/fichier.sql



CREATE ROLE nomDuLutilisateur WITH LOGIN PASSWORD 'leMotDePasse';
CREATE DATABASE nomDeLaBase OWNER nomDuLutilisateur;