const router = require("express").Router();
const Character = require("../models/Character.model");
const axios = require("axios");

router.get("/", (req, res, next) => {
  axios.get("https://ih-crud-api.herokuapp.com/characters/")
    .then((response) => {
      res.render("characters/characters-list", { characters: response.data });
    })
    .catch()
});


router.get("/create", (req, res, next) => {
  res.render("characters/character-create");
});


router.post('/create', (req, res, next) => {
  axios.post(`https://ih-crud-api.herokuapp.com/characters/`, {
    name: req.body.name,
    occupation: req.body.occupation,
    weapon: req.body.weapon
  })
    .then(response => {
      res.redirect("/characters");
      console.log(response);
    })
    .catch(err => {
      console.log('Error creating new character...', err);
    });
});


router.get("/:id", (req, res, next) => {
  axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then((response) => {
      res.render("characters/character-details", response.data);
    })
    .catch(err => {
      console.log("Error getting character details from DB...", err);
    });
});


router.get("/:id/edit", (req, res, next) => {
  axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then((characterDetails) => {
      res.render("characters/character-edit", characterDetails);
    })
    .catch(err => {
      console.log("Error getting character details from DB...", err);
    });
});

router.post("/:id/edit", (req, res, next) => {
  
  const newDetails = {
    name: req.body.name,
    occupation: req.body.occupation,
    weapon: req.body.weapon,
  }

  axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`, newDetails)
      .then(() => {
      res.redirect(`/characters/${id}`);
    })
    .catch(err => {
      console.log("Error updating character...", err);
    });
});


router.post("/:id/delete", (req, res, next) => {
  axios.delete(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then(() => {
      res.redirect("/characters");
    })
    .catch(err => {
      console.log("Error deleting character from DB via API...", err);
    });

});

module.exports = router;
