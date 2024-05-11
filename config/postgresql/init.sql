-- for development enivronment only
-- this file is used to create the database and the user for the application
CREATE USER accounts WITH PASSWORD 'rG4dCFE5c5cP7';
CREATE DATABASE accountdb OWNER accounts;
CREATE DATABASE accountdb_test OWNER accounts;

CREATE USER stores WITH PASSWORD 'rG4dCFE5c5cP7';
CREATE DATABASE storesdb OWNER stores;
CREATE DATABASE storesdb_test OWNER stores;

CREATE USER catalog WITH PASSWORD 'rG4dCFE5c5cP7';
CREATE DATABASE catalogdb OWNER catalog;
CREATE DATABASE catalogb_test OWNER catalog;

CREATE USER media WITH PASSWORD 'rG4dCFE5c5cP7';
CREATE DATABASE mediadb OWNER media;
CREATE DATABASE mediagb_test OWNER media;

CREATE USER orders WITH PASSWORD 'rG4dCFE5c5cP7';
CREATE DATABASE ordersdb OWNER media;
CREATE DATABASE ordersdb_test OWNER media;