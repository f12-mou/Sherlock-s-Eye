require('dotenv').config();
const router = require('express').Router();
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
//const {verify} = require('../../middlewares/user-verification');
//const { errors } = require('joi/lib/language');



const DB_auth = require('../../Database/DB-auth-api');

router.get('/start', (req, res) => {
    console.log('in start');
    res.render('body/auth/startPage.ejs', {
            title : 'Starting Sherlocks Eye',
                //body : ['auth/register'],
                user : null,
                //errors : errors
        })
});

router.get('/register', (req, res) => {
    errors=[];
    res.render('body/auth/register.ejs', {
            title : 'AlumNet Register',
                //body : ['auth/register'],
                user : null,
                errors:errors
                //errors : errors
        })
});

router.post('/register', async (req, res) => {
    //hash the password
    //const hashedPassword = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
    //insert user
   // console.log("the hashed pass is : "+hashedPassword);
    

    let user = {
        first_name: req.body.first_name,
        password: req.body.password,
        email: req.body.email,
        last_name:req.body.last_name,
        user_id:req.body.user_id,
        type:req.body.type,
        subject:req.body.subject,
        topic:req.body.topic,
        chapter:req.body.chapter
   }

   let result, temres,errors = [];
    result = await DB_auth.getLoginInfoByEmail(req.body.email);
    temres=await DB_auth.getLoginInfoByID(req.body.user_id);
    if(result[0]!=null)
    {
        errors.push('This Email Already Exists. Try Another');
    }
    if(temres[0]!=null)
    {
        errors.push('This username Already Exists. Try Another');
    }

    console.log('error'|| errors); 

    

    
    if(errors.length == 0){
        console.log("Redirecting as code is okkkk");
      //  res.redirect('/api/auth/login');
        try{
        
            result =await DB_auth.createNewUser(user);
            res.redirect('/api/auth/login?register=Registration is Successful');
        }catch(err)
        {
            console.log("Here is the mighty error "+err);
        }
        console.log("code ran ok");
    }
     else {
        res.render('body/auth/register.ejs', {
            title : 'Sherlocks Eye Register',
            result:result,
            temres:temres,
            errors:errors,
            //body: ['auth/login'],
            user: null,
            //errors : errors,
            form: {
                email: req.body.email,
                password: req.body.password
            }
        });
    
}});

router.get('/login', (req, res) => {
     let errors = [];
//     if (req.query.register)
//         errors.push(req.query.register);
    res.render('body/auth/login.ejs', {
            title : 'Sherlocks Eye Login',
            //body: ['auth/login'],
            user: null,
            errors: errors
        })
});

router.post('/login', async (req, res) => {
    
    let result=[] , errors = [];

    result = await DB_auth.getLoginInfoByEmail(req.body.email);
    // if no result, there is no such user
    console.log('print'|| result);
    if (result[0] === undefined) {
        console.log("result is undefined");
        errors.push('Wrong Email.Try it again');
    } else {
        // match passwords
        //const validPass = await bcrypt.compare(req.body.password, result[0].password);
        let validPass;
        //let {variablePass}=result[0];
        // console.log(variablePass);
        console.log(result[0]);
        console.log("req.bode.pass "+req.body.password);
        console.log("result[0].pass "+result[0].PASSWORD);
        if(req.body.password === result[0].PASSWORD)
            validPass=true;
        else
            validPass=false;
        if (validPass) {
            // if successful login the user
            console.log("in jwt token ");
            const token = jwt.sign({ user_id: result[0].user_id }, process.env.JWT_TOKEN_HELPER);
            let options = {
                maxAge: 90000000, 
                httpOnly: true
            }
            req.session.isLoggedIn=result[0].EMAIL;
        }
        else {
            console.log("jhamela in password matching");
            errors.push('Wrong Password. Try it again');
        }
    }
    if(errors.length == 0){
        console.log("Redirecting as code is okkkk");
        res.redirect('/api/user/'+result[0].EMAIL);
    } else {
        res.render('body/auth/login.ejs', {
            title : 'Sherlocks Eye Login',
            errors:errors,
            //body: ['auth/login'],
            user: null,
            //errors : errors,
            form: {
                email: req.body.email,
                password: req.body.password
            }
        });
    }
    
});

router.post('/logout',(req,res)=>{
    //destroy token
    res.cookie('auth-token', '', { maxAge:1 });
    req.session.destroy();
    res.redirect('/api/auth/login');
});

// router.get('/user_id', verify, (req,res)=>{
//     //returns the id of logged in user
//     res.send({user_id : req.user.USER_ID});
// });


module.exports = router;