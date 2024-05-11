const router = require('express').Router();
const DB_notification = require('../../Database/notifications/DB-notification-api');
const DB_auth = require('../../Database/DB-auth-api');
//new
router.get('/unseen', async (req,res)=>{  
    const whoNowUser=req.session.isLoggedIn;
    let result;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser); 
    res.send(await DB_notification.getUnseenNotifications(result[0].USER_ID));
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