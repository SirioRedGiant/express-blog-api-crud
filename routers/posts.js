const express = require("express");
const router = express.Router(); // crea un server per i post

//note array dei post importati dalla cartella --> data
const posts = require("../data/posts");

//^ Index --> Lista dei post (GET)
router.get("/", (req, res) => {
  res.json({
    list: posts,
  });
});

//^ Show --> Dettagli di un singolo post (GET)
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id); // l'ID  dei parametri arriva come stringa e lo trasformo in numero
  const responseData = {
    message: `Dettaglio del post ${id} non trovato`,
    success: false,
  };

  const post = posts.find((post) => post.id === id); // trovo il post con lo stesso ID

  if (post) {
    return res.json(post);
  }
  res.status(404).json(responseData);
});

//^ Store --> Creazione di un nuovo post (POST)
router.post("/", (req, res) => {
  res.send("Creazione nuovo post");
});

//^ Update --> Modifica totale di un post (PUT)
router.put("/:id", (req, res) => {
  res.send(`Modifica totale del post ${req.params.id}`);
});

//^ Destroy --> Eliminazione di un post (DELETE)
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex((post) => post.id === id);

  //note Se l'indice è diverso da -1, il post è stato trovato
  if (postIndex !== -1) {
    posts.splice(postIndex, 1); // Rimuove 1 elemento alla posizione postIndex
    console.log(`Post ${id} eliminato. Lista aggiornata:`);
    res.sendStatus(204); // successo (status 204 significa "No Content", operazione riuscita)
  } else {
    //note Se non lo trova, errore 404
    res.status(404).json({
      error: "Post non trovato",
      message: `Impossibile da eliminare, il post ${id} non esiste.`,
    });
  }
});

//^ Esportazione del router
module.exports = router;
