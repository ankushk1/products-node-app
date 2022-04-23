const express = require('express');
const router = express.Router();
const {signup, signin} = require('../controllers/userController')
const { check } = require('express-validator');

router.post('/signup',[
  check('firstname', "First name should be atleast 3 char").isLength({
    min:3
  }),
  check('lastname', "Last name should be atleast 3 char").isLength({
    min:3
  }),
  check('email', "Email should be valid email").isEmail(),
  check('password', "Password name should be atleast 4 char").isLength({
    min:4
  }),
] ,signup)
router.post('/signin', signin)

module.exports = router