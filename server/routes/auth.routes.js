const express = require('express');
const Account = require('../models/account.model');
const bcrypt = require('bcryptjs');

const router = express.Router();
const salt = 10;

// login expects email/password
// successful login returns email and a fake token (if we ever want to use it)
router.post('/login', async (req, res) => {
  try {
    if (!req.body || !req.body.email || !req.body.password) {
      res.status(401).json({ success: false, error: 'Bad login information' });
      return;
    }
    // check if account exists in the database with that email and password
    const account = await Account.findOne({ email: req.body.email });
    if (account) {
      if (bcrypt.compareSync(req.body.password, account.password)) {
        res.status(200).json({ success: true, email: req.body.email, token: '12345luggage' });
      } else {
        res.status(400).json({ success: false, error: 'Incorrect email or password' });
      }
    } else {
      res.status(400).json({ success: false, error: 'Incorrect email or password' });
      return;
    }

  } catch (error) {
    res.status(500).json({ success: false, error: 'Unknown error' });
  }
})

// add-accounts expects email/password
router.post('/add-account', async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({ success: false, error: 'No information sent.' })
      return;
    }

    if (!req.body.email) {
      res.status(400).json({ success: false, error: 'No email account sent.' });
      return;
    }

    if (!req.body.password) {
      res.status(400).json({ success: false, error: 'No password sent.' })
      return;
    }
    //encrypt password before storing
    const hash = bcrypt.hashSync(req.body.password, salt);
    const accountObj = new Account({
      email: req.body.email,
      password: hash
    });

    const dbResponse = await accountObj.save();
    if (dbResponse && dbResponse._id) {
      res.status(200).json({ success: true, insertedId: dbResponse._id });
    } else {
      res.status(400).json({ success: false, error: 'Database Error' });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Unknown error' });
  }
})

module.exports = router;