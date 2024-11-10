const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt =require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "hellomynameisharshjain123456789$"
router.post("/createuser", [
    body('email', 'Invalid Email').isEmail(),
    body('name', 'Name should be at least 5 characters').isLength({ min: 5 }),
    body('password', 'Password should be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);

    let secPassword = await bcrypt.hash(req.body.password,salt)
    try {
        await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
        });
        res.json({ success: true });

    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(400).json({ success: false, message: "Server Error", error: error.message });
    }
})

router.post("/loginuser", [
    body('email', 'Invalid Email').isEmail(),
    body('password', 'Password should be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
let email = req.body.email;
    try {
        let userData = await User.findOne({email});
        if(!userData){
            return res.status(400).json({ errors: "Incorrect Credentials" });
        }

        const pwdCompare = await bcrypt.compare(req.body.password,userData.password)
        if(!pwdCompare){
            return res.status(400).json({ errors: "Incorrect Credentials" });
        }
        const data = {
            user:{
                id: userData.id
            }
        }
        const authToken= jwt.sign(data,jwtSecret)
        return res.json({success:true,authToken:authToken})

    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(400).json({ success: false, message: "Server Error", error: error.message });
    }
})



module.exports = router;
