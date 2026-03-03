const express = require("express");
const router = express.Router(); // crea un server per i post

//! importazione delle funzione del controller
const postController = require("../controllers/postController");

//^ Index --> Lista dei post (GET)
router.get("/", postController.index);

//^ Show --> Dettagli di un singolo post (GET)
router.get("/:id", postController.show);

//^ Store --> Creazione di un nuovo post (POST)
router.post("/", postController.store);

//^ Update --> Modifica totale di un post (PUT)
router.put("/:id", postController.update);

//^ Destroy --> Eliminazione di un post (DELETE)
router.delete("/:id", postController.destroy);

//^ Esportazione del router
module.exports = router;
