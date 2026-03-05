const express = require("express");
const app = express();
const port = 3000;

const notFound = require("./middlewares/notFound"); // 404
const errorsHandler = require("./middlewares/errorsHandler"); // 500

app.use(express.json()); // middleware "body-parser" per tradurre i dati grezzi che arrivano da Postman in formato json
app.use(express.static("public")); // middleware per poter accedere alla cartella public(accedere alle immagini)

//^ Import del router dei post
const postsRouter = require("./routers/posts");

app.get("/", (req, res) => {
  res.send("Server homepage");
});

//^ le rotte dei post con il prefisso /posts
app.use("/posts", postsRouter);

app.use(notFound);
//! errorsHandler deve essere sempre l'ULTIMO
app.use(errorsHandler);

/** //^ Da scrivere meglio
 * La Cascata: Se errorsHandler fosse sopra notFound, quando un utente cerca una rotta inesistente, Express passerebbe sopra l'errorHandler (perché non c'è un errore di
 * codice, solo una rotta mancante) e si ferma al notFound.
 * La Rete di Sicurezza: Se invece avviene un errore nel tuo codice (un 500), Express "salta" tutto quello che incontra (compreso il 404) per precipitare nell'unico middleware
 * che ha 4 parametri: l'errorsHandler. Express Error Handling
 */

app.listen(port, () => {
  console.log(`Server attivo su http://localhost:${port}`);
});
