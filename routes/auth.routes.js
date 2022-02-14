const express = require('express');
const User = require('../models/User.model');
const router = express.Router();
const saltRounds = 5;
const bcrypt = require('bcrypt');

router
.route('/signup')
.get((req, res) => {
	res.render('signup');
})

.post((req, res)=>{
	const username = req.body.username;
	const password = req.body.password;

	if (!username ||!password){
	// killswitch, render is the return of the request
	res.render("signup", {errorMessage: "All fields are required"});
	}

	User.findOne({username})
	.then((user) =>{
		if(user && user.username){
			console.log(user)	
			res.render("signup", {errorMessage: "User already taken"})
		}

		console.log(user)
		const salt = bcrypt.genSaltSync(saltRounds)
		const hashedPwd = bcrypt.hashSync(password, salt)

		User.create({username, password: hashedPwd}).then(()=> res.redirect("/"))
	})
});



router.get('/login', (req, res, next) => {
	res.render('login');
});

router.get('/profile', (req, res) => {
	res.render('profile');
});

module.exports = router;
