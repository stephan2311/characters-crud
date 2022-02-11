const router = require("express").Router();
const Character = require("../models/Character.model");

router.get("/", (req, res, next) => {
  Character.find()
    .then( charactersFromDB => {
      res.render("characters/characters-list", {characters: charactersFromDB});
    })
    .catch(err => {
      console.log('Error getting characters from DB...', err);
    })
});


router.get("/create", (req, res, next) => {
  res.render("characters/character-create");
});


router.post('/create', (req, res, next) => {

  const characterDetails = {
    name: req.body.name,
    occupation: req.body.occupation,
    weapon: req.body.weapon,
  }

  Character.create(characterDetails)
    .then( character => {
      res.redirect("/characters");
    })
    .catch( err => {
      console.log('Error creating new character...', err);
    })
})


router.get("/:characterId", (req, res, next) => {
  Character.findById(req.params.characterId)
    .then( character => {
      res.render("characters/character-details", character);
    })
    .catch();
});


router.get("/:characterId/edit", (req, res, next) => {
  Character.findById(req.params.characterId)
    .then( (characterDetails) => {
      res.render("characters/character-edit", characterDetails);
    })
    .catch( err => {
      console.log("Error getting character details from DB...", err);
    });
});

router.post("/:characterId/edit", (req, res, next) => {
  const characterId = req.params.characterId;

  const newDetails = {
    name: req.body.name,
    occupation: req.body.occupation,
    weapon: req.body.weapon,
  }

  Character.findByIdAndUpdate(characterId, newDetails)
    .then( () => {
      res.redirect(`/characters/${characterId}`);
    })
    .catch( err => {
      console.log("Error updating character...", err);
    });
});


router.post("/:characterId/delete", (req, res, next) => {
  Character.findByIdAndDelete(req.params.characterId)
    .then(() => {
      res.redirect("/characters");
    })
    .catch(err => {
      console.log("Error deleting character...", err);
    });

});

module.exports = router;
