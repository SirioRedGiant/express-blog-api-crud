//note array dei post importati dalla cartella --> data
const posts = require("../data/posts");

//^ Index
const index = (req, res) => {
  let filteredPosts = posts;

  if (req.query.tag !== undefined) {
    const tagCercato = req.query.tag.trim().toLowerCase();
    filteredPosts = posts.filter((post) => {
      const tagsMinSanitized = post.tags.map((tag) =>
        tag.trim().toLocaleLowerCase(),
      );
      return tagsMinSanitized.includes(tagCercato);
    });
  }
  res.json({
    list: filteredPosts,
  });
};

//^ Show
const show = (req, res) => {
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
};

//^ Store
const store = (req, res) => {
  res.send("Creazione nuovo post");
};

//^ Update
const update = (req, res) => {
  res.send(`Modifica totale del post ${req.params.id}`);
};

//^ Destroy
const destroy = (req, res) => {
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
};

module.exports = { index, show, store, update, destroy };
// esportazione delle funzione singolarmente( sono in un oggetto... quindi "chiave : valore" omesso perchè identico)
