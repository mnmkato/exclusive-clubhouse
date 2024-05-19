var express = require('express');
const passport = require("passport");
const bcrypt = require("bcryptjs")
const User = require('../models/user')
const Message = require('../models/message')
const validator = require('validator');
var router = express.Router();

/* GET home page. */
router.get("/", async (req, res) => {
  const all_messages = await Message.find().populate("author").sort({created_at: -1}).exec();
  res.render("index", { 
    title: "Clubhouse" ,
    user: req.user,
    messages: all_messages
  });
}); 

/* GET login page. */
router.get("/log-in", (req, res) => res.render("log-in", {title: "Clubhouse" }));

/* GET sign up page. */
router.get("/sign-up", (req, res) => res.render("sign-up", {title: "Clubhouse" }));

/* POST sign up page form */
router.post("/sign-up", async (req, res, next) => {
    const firstName = req.body.first_name.trim();
    const lastName = req.body.last_name.trim();
    const username = req.body.username.trim();
    const password = req.body.password.trim();
    const confirmPassword = req.body.confirm_password.trim();
    
    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    // Validate email
    if (!validator.isEmail(username)) {
        return res.status(400).json({ error: "Invalid email address" });
    }

  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    // if err, do something
    if(err){consoole.log(err)}

    // otherwise, store hashedPassword in DB
    try {
      const user = new User({
        firstName: firstName,
        lastName: lastName,
        username: username,
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
      failureRedirect: "/sign-up"
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

/* POST new message page form */
router.post("/new", async (req, res) =>{
  // TODO sanitize and validate req.body.message
  const message = new Message({
    text: req.body.message,
    author: req.user
  })
  await message.save()
  res.redirect("/");
});

router.post("/delete_message", async (req, res) =>{
  const message_id = req.body.message_id;
  await Message.findByIdAndDelete(message_id)
  res.redirect("/");
})

module.exports = router;
