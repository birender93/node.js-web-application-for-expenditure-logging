var express = require('express');
var router = express.Router();

router.get("/signup", (req,res)=>{
    var errormsg = "";
    res.render('signup',{'errormsg':errormsg});
});

router.post("/signup", (req,res)=>{
    
    var body = req.body;//JSON.stringify(req.body);
    var usrname = body.usrname;
    var pswrd = body.pswrd;
    var repswrd = body.repswrd;

    if(pswrd != repswrd)
    {
        var errormsg = 'Password and Re-entered Password mismatch';
        res.render('signup',{'errormsg':errormsg});
    }
    else
    {
        var conn = req.app.get('sqlconn');

       /*  conn.connect( (err)=>{
            if(err)
            console.log(err);
            console.log('Successfully connected to mysql server!!'); */

            //var selSql = 'SELECT * FROM users.logindetl WHERE usrname =' + mysql.escape(varusrname);
            var insSql = `INSERT INTO users.logindetl (usrname, password) VALUES (${usrname}, ${pswrd})`;
        
            conn.query(insSql, (err,result)=>{
                if(err) console.log(err);
                console.log('insertion pass!!');
                console.log(result);
                //conn.end();
            });
        //});
        res.render('user',{'usrname':usrname});
    }
});

module.exports = router;


