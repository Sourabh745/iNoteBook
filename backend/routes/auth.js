const express = require('express')
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt'); // use to encrypt password
var jwt = require('jsonwebtoken'); // for extra security
var fetchUser = require('../middleware/fetchUser');

const JWT_KEY = "neerajmodi";


//ROUTE 1:  Create a user using: POST "/api/auth/createuser". No Login required
router.post('/createuser', [
  body('name', 'Enter your name').isLength({ min: 5 }),
  body('email', 'enter email').isEmail(),
  body('password', 'enter your password').isLength({ min: 5 })
], async (req, res) => {
  let success = false;
  //If there are errors, return bad requests and errors
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      let user = await User.findOne({ email: req.body.email });   //Check whether the user with this email already exists
      if (user) {
        return res.status(400).json({ success, errors: "Sorry a user with this email already exists" });
      }
      //encrypting password using bycrypt or gensalt method
      const salt = await bcrypt.genSalt(10);
      const secPas = await bcrypt.hash(req.body.password, salt);
      //create a new user
      user = await User.create({
        name: req.body.name,
        password: secPas,
        email: req.body.email
      })

      const data = {
        user: {
          id: user.id
        }
      }

      const jwtData = jwt.sign(data, JWT_KEY);

      success = true;
      res.json({ success, jwtData })//getting response of jwt Token
    }
    catch (error) {
      console.error(error.message);
      res.status(500).send("some error occurred");
    }
  }
  else {
    res.status(400).json({ errors: errors.array() });
  }
});

//ROUTE 2: Authentication a User using: POST "/api/auth/login". No Login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'password cannot be blanked').isLength({ min: 5 })
], async (req, res) => {

  let success = false; 
  
  //If there are errors, return bad requests and errors
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });   //Check whether the user with this email already exists
      if (!user) {
        success = false
        return res.status(400).json({ errors: "Please enter your right credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({ success,errors: "Please enter your right credentials" });
      }
 
      const data = {
        user: {
          id: user.id
        }
      }

      const jwtData = jwt.sign(data, JWT_KEY);
      success = true
      res.json({ success, jwtData })
    }
    catch (error) {
      console.error(error.message);
      res.status(500).send("some error occurred");
    }
  }
  else {
    res.status(400).json({ errors: errors.array() });
  }
});

// ROUTE 3: get user details using : POST "/api/auth/getuser". Login required
router.post('/getuser',fetchUser ,async (req, res) => {
  try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
  } 
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
})
module.exports = router;
