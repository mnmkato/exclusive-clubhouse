var express = require('express');
const passport = require("passport");
const bcrypt = require("bcryptjs")
const User = require('../models/user')

var router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index", { 
    title: "Clubhouse" ,
    user: req.user
  });
}); 

/* GET sign up page. */
router.get("/sign-up", (req, res) => res.render("sign-up", {title: "clubhouse" }));

/* POST sign up page form */
router.post("/sign-up", async (req, res, next) => {
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    // if err, do something
    if(err){consoole.log(err)}

    // otherwise, store hashedPassword in DB
    try {
      const user = new User({
        username: req.body.username,
        password: hashedPassword
      });
      const result = await user.save();
      res.redirect("/");
    } catch(err) {
      return next(err);
    };
  });
  });

/* POST log in page form */
router.post(
    "/log-in",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/"
    })
  );

/* GET log out */
router.get("/log-out", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });

module.exports = router;
