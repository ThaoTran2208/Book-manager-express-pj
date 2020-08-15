var bcrypt = require('bcrypt');
var sgMail = require('@sendgrid/mail');

var User = require('../models/users');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.login = (req, res) => {
  res.render("auth/login");
}

module.exports.postlogin = async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  var user = await User.findOne({email});
  console.log(user, user.id);
  
  if(!user){
    res.render('auth/login', {
      errors: [
        'User dose not exist!'
      ],
      values: req.body
    });
    return;
  }
  
  if (user.wrongPasswordCount >= 3){
    res.render('auth/login', {
      errors: [
        'You have entered the wrong password more than 3 times!',
        'Your account has been locked!'
      ],
      values: req.body
    });
    
    var msg = {
      to: user.email,
      from: 'bichchungab11@gmail.com',
      subject: 'Sending with SendGrid is Fun',
      text: 'You have entered the wrong password more than 3 times!',
      html: 'Your account has been locked!</strong>',
    }

    sgMail.send(msg)
    
    return;
  }
  
  var salt = bcrypt.genSaltSync(10);
  
  if( ! (await bcrypt.compare(password, user.password) ) ){
    await User.findByIdAndUpdate(user.id, {
      wrongPasswordCount: user.wrongPasswordCount += 1
    });
    res.render('auth/login', {
      errors: [
        'Wrong password!'
      ],
      values: req.body
    });
    return;
  } 
  
  else {
    res.cookie("userId", user.id, {
      signed: true,
      sameSite: 'none',
      secure: true
    });
    
    if (!user.isAdmin){
        return res.redirect('/books')
    }
    res.redirect('/users')
  }
  
}

module.exports.logOut = async (req, res) => {
  
  res.clearCookie("userId", {
      signed: true,
      sameSite: 'none',
      secure: true
    });
  
  res.redirect('/auth/login');
}