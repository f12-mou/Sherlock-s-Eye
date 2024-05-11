const router = require('express').Router();
const DB_auth = require('../../Database/DB-auth-api');
const DB_msg = require('../../Database/messages/DB-msg-api');

router.get('/detailsMsg/:whoInbox', async (req,res)=>{  
    const whoNowUser=req.session.isLoggedIn;
    let result,users,whoInbox,messages;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser); 
    users = await DB_msg.getUsers(result[0].USER_ID);
    whoInbox=req.params.whoInbox;
    messages=await DB_msg.getMessages(whoInbox,result[0].USER_ID);
    console.log(users);
    console.log(whoInbox);
    console.log(messages);
    res.render('layoutWithoutUser.ejs', {
        title : "My Messenger",
        body2 : ['msgs/msgs'],
        user: result[0],
        users: users,
        whoInbox:whoInbox,
        messages:messages
    });
});
router.post('/detailsMsg/:whoInbox', async (req,res)=>{ 
    let result,result2,users,whoInbox,messages; 
    const whoNowUser=req.session.isLoggedIn;
    result=await DB_auth.getLoginInfoByEmail(whoNowUser); 
    whoInbox=req.params.whoInbox;
    console.log(req.body);
    result2= await DB_msg.addMsg(req.body.inputMsg,result[0].USER_ID,whoInbox);
    res.redirect('/api/msgs/detailsMsg/'+whoInbox);
});
router.post('/search', async (req,res)=>{ 
    let result,result2,users,whoInbox,messages; 
    const whoNowUser=req.session.isLoggedIn;
    result=await DB_auth.getLoginInfoByEmail(whoNowUser); 
    whoInbox=req.body.searchWho;
    console.log(req.body);
    res.redirect('/api/msgs/detailsMsg/'+whoInbox);
});


//new
router.get('', async (req,res)=>{  
    let whoNowUser=req.session.isLoggedIn;
    let result,users,whoInbox,messages;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser); 
    users = await DB_msg.getUsers(result[0].USER_ID);
    console.log(users);
    whoInbox=users[0].USER_ID;
    messages=await DB_msg.getMessages(whoInbox,result[0].USER_ID);
    
    console.log(whoInbox);
    console.log(messages);
    res.render('layoutWithoutUser.ejs', {
        title : "My Messenger",
        body2 : ['msgs/msgs'],
        users: users,
        user:result[0],
        whoInbox:whoInbox,
        messages:messages
    });
});


//all
router.get('/all', async (req,res)=>{  
    const whoNowUser=req.session.isLoggedIn;
    let result;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser); 
    res.send(await DB_notification.getAllNotifications(result[0].USER_ID));
});

//new count
router.get('/count', async (req,res)=>{
    const whoNowUser=req.session.isLoggedIn;
    let result;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser);   
    res.send(await DB_notification.getUnseenNotificationCount(result[0].USER_ID));
});

module.exports = router;