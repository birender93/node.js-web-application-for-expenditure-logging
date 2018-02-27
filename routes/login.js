var express = require('express');
var router = express.Router();

router.get("/login", (req,res)=>{
res.render("login");

});

router.post("/login", (req,res)=>{
    
    var body = req.body;//JSON.stringify(req.body);
    var usrname = body.usrname;
    var pswrd = body.pswrd;
    
    res.render('user',{usrname});
});

module.exports = router;


