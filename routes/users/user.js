const router = require('express').Router();
const bcrypt= require('bcryptjs');
const DB_auth = require('../../Database/DB-auth-api');
const DB_case = require('../../Database/DB-case-api');
const DB_detective = require('../../Database/DB-detective-api');
// const DB_user = require('../../DB-codes/users/DB-user-api');
// const {verify} = require('../../middlewares/user-verification');

router.get('/edit', async(req,res)=>{
    //save update
    const whoNowUser = req.session.isLoggedIn;
    const user= await DB_auth.getLoginInfoByEmail(whoNowUser);
    console.log(user);
   //req.body.first_name=null;
    res.render('layoutWithoutUser.ejs', {
            title : 'User Info Edit',
            body2 : ['users/editInfo'],
            user: user[0],
            cur_user_id: user[0].USER_ID
        })
});



router.get('/search',async (req, res) => {

    //const user = await DB_user.getUserById(req.user.USER_ID);
    let users,result;
   
    const whoNowUser = req.session.isLoggedIn;
    result= await DB_auth.getLoginInfoByEmail(whoNowUser);
    users = await DB_detective.getAllDetectives();

    console.log('in get:'|| users);
    console.log('ok');
  //  users= await DB_detective .getDetectives(user.name,user.id,user.email);//

   // users2 = await DB_detective.getDetectives(req.query);
    res.render('layout-search.ejs', {
                title : 'Search Detectives Of Sherlocks Eye',
                body: ['users/user-profile'],
                body2:null,
                users: users,
                user:result[0]
            });
});

router.post('/search',async (req, res) => {

    //const user = await DB_user.getUserById(req.user.USER_ID);
    let users,result;
    let user2 = 
    {
        user_id:req.body.user_id,
        name:req.body.name,
        email:req.body.email

        
    }
  //  let id=req.body.user_id;
    console.log(user2);
    const whoNowUser = req.session.isLoggedIn;
   // users = await DB_detective.getDetectiveByID(user.id);
    users= await DB_detective .getDetectives(user2.name,user2.user_id,user2.email);//
    result= await DB_auth.getLoginInfoByEmail(whoNowUser);
    res.render('layout-search.ejs', {
                title : 'Search Detectives Of Sherlocks Eye',
                body: ['users/user-profile'],
                body2:null,
                users: users,
                user2:user2,
                user:result[0]
            });
});

router.post('/edit', async(req,res)=>{
    //save update
    let result;
    const whoNowUser = req.session.isLoggedIn;
    result= await DB_auth.getLoginInfoByEmail(whoNowUser);
   
    let info=
    {
        image:req.body.profile_picture,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        thana:req.body.thana,
        district:req.body.district,
        division:req.body.division,
        bio:req.body.bio,
        experience:req.body.experience
    }
    console.log('print info'|| info);

    gotInfo=await DB_auth.editInfo(info.first_name,info.last_name,info.thana,info.district,info.division,info.bio,info.experience,result[0].USER_ID);
  
    res.redirect('/api/user/'+result[0].EMAIL);
});

router.get('/profile', async(req,res)=>{
    //save update
    const whoNowUser = req.session.isLoggedIn;
    const result= await DB_auth.getLoginInfoByEmail(whoNowUser);
   // console.log(user);
   //req.body.first_name=null;
   res.redirect('/api/user/'+result[0].EMAIL);
});

router.get('/viewProfile/:userId', async(req,res)=>{
    //save update
    const whoNowUser = req.session.isLoggedIn;
    const result= await DB_auth.getLoginInfoByID(req.params.userId);
   // console.log(user);
   //req.body.first_name=null;
   res.redirect('/api/user/'+result[0].EMAIL);
});


router.post('/password', async(req,res)=>{

    let result,pass;
    const whoNowUser = req.session.isLoggedIn;
    result= await DB_auth.getLoginInfoByEmail(whoNowUser);
    //const validPass = await bcrypt.compare(req.body.current_password, req.user.PASSWORD);
    // if (req.body.current_password!= result[0].PASSWORD) {
    //     //errors.push('Invalid Current Password');
    //     res.redirect('/api/user/edit?errors=Invalid Current Password');
    // }
    // else {
        //hash new pass
        pass=await DB_auth.editPass(req.body.new_password,result[0].USER_ID);
        console.log(req.body.new_password);
      //  const hashedPassword = await bcrypt.hash(req.body.new_password, await bcrypt.genSalt(10));

        //update pass
       // user_id = await DB_user.updatePassword(hashedPassword, req.user.USER_ID)

        //res.send('Password changed!')
      
        res.redirect('/api/user/'+result[0].EMAIL);
  //  }
    
});



router.get('/userID/:userID', async (req, res) => {
    const whoNowUser=req.session.isLoggedIn;
        let result;
        result = await DB_auth.getLoginInfoByEmail(whoNowUser);
    res.render('layoutWithoutUser.ejs', {
                title : 'Profile',
                body: ['users/user-profile'],
                body2:null,
                user:result[0],
                cur_user_id:result[0].USER_ID
            });
});


router.get('/:email_id', async (req, res) => {
    const cur_email_id = req.params.email_id;
    console.log("in /api/user/userid "+cur_email_id);
    let result, casesResult;
    result = await DB_auth.getLoginInfoByEmail(cur_email_id);
    casesResult = await DB_case.getCasesByDetectiveId(result[0].USER_ID);
    res.render('layout.ejs', {
                title : 'Profile',
                body: ['users/user-profile'],
                body2:null,
                user: result[0],
                cur_email_id: cur_email_id,
                allCases : casesResult
            });
});



router.get('',async (req, res) => {

    //const user = await DB_user.getUserById(req.user.USER_ID);
    res.render('layout.ejs', {
                title : 'Profile',
                body: ['users/user-profile'],
                body2:null,
                user: user,
                cur_user_id: user.USER_ID
            });
});

module.exports = router;