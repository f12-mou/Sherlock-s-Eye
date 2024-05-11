require('dotenv').config();
const router = require('express').Router();
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
//const {verify} = require('../../middlewares/user-verification');
//const { errors } = require('joi/lib/language');



const DB_auth = require('../../Database/DB-auth-api');
const DB_detective = require('../../Database/DB-detective-api');
const DB_case=require('../../Database/DB-case-api');




router.get('/all-cases', async (req, res) => {
    const whoNowUser=req.session.isLoggedIn;
    console.log('in cases.js file to render all cases '+whoNowUser);
    //const user = await DB_user.getUserById(req.params.user_id);
    let result, casesResult;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser);
    casesResult = await DB_case.getAllCase();

    
    console.log(casesResult);
    res.render('layoutWithoutUser.ejs', {
                title : 'All Cases Of Sherlocks Eye',
                body2: ['cases/all-cases'],
                user: result[0],
                casesResult : casesResult
            });
});



router.get('/search', async (req, res) => {
    const whoNowUser=req.session.isLoggedIn;
    let result, casesResult;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser);
    casesResult = await DB_case.getAllCase();

    
    console.log(casesResult);
    res.render('layoutWithoutUser.ejs', {
                title : 'Search Cases Of Sherlocks Eye',
                body2: ['cases/searchCase'],
                user: result[0],
                casesResult : casesResult
            });
});

router.post('/search', async (req, res) => {
    const whoNowUser=req.session.isLoggedIn;
    let result, casesResult;
    let id=req.body.case_id;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser);
    casesResult = await DB_case.getSearchedCase(id,req.body.case_title,req.body.det_id,req.body.client_id);//getCase(id);

    
    console.log(casesResult);
    console.log('in post search');
    res.render('layoutWithoutUser.ejs', {
                title : 'Search Cases Of Sherlocks Eye',
                body2: ['cases/searchCase'],
                user: result[0],
                casesResult : casesResult
            });
});






router.get('/my-cases', async (req, res) => {
    const whoNowUser=req.session.isLoggedIn;
    console.log('in cases.js file to render all cases '+whoNowUser);
    //const user = await DB_user.getUserById(req.params.user_id);
    let result, casesResult;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser);
    //console.log(result);
    if((result[0].TYPE).toLowerCase()==='detective')
        casesResult = await DB_case.getCasesByDetectiveId(result[0].USER_ID);
     else if((result[0].TYPE).toLowerCase()==='client')
         casesResult = await DB_case.getCasesByClientId(result[0].USER_ID);

    
    console.log(casesResult);
    res.render('layoutWithoutUser.ejs', {
                title : 'My Cases in Sherlocks Eye',
                body2: ['cases/all-cases'],
                user: result[0],
                casesResult : casesResult
            });
});
    

router.get('/requested-cases', async (req, res) => {
    const whoNowUser=req.session.isLoggedIn;
    console.log('in cases.js file to render all cases '+whoNowUser);
    //const user = await DB_user.getUserById(req.params.user_id);
    let result, casesResult;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser);
    if((result[0].TYPE).toLowerCase()==='detective')
        casesResult = await DB_case.getRequestedCasesByDetectiveId(result[0].USER_ID);
    else if((result[0].TYPE).toLowerCase()==='client')
        casesResult = await DB_case.getRequestedCasesByClientId(result[0].USER_ID);

    
    console.log(casesResult);
    res.render('layoutWithoutUser.ejs', {
                title : 'All Requested Cases Of Sherlocks Eye',
                body2: ['cases/all-cases'],
                user: result[0],
                casesResult : casesResult
            });
});
   

router.get('/pending-cases', async (req, res) => {
    const whoNowUser=req.session.isLoggedIn;
    console.log('in cases.js file to render all cases '+whoNowUser);
    //const user = await DB_user.getUserById(req.params.user_id);
    let result, casesResult;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser);
    if((result[0].TYPE).toLowerCase()==='detective')
        casesResult = await DB_case.getPendingCasesByDetectiveId(result[0].USER_ID);
    else if((result[0].TYPE).toLowerCase()==='client')
        casesResult = await DB_case.getPendingCasesByClientId(result[0].USER_ID);

    
    console.log(casesResult);
    res.render('layoutWithoutUser.ejs', {
                title : 'All Pending Cases Of Sherlocks Eye',
                body2: ['cases/all-cases'],
                user: result[0],
                casesResult : casesResult
            });
});

router.get('/unsolved-cases', async (req, res) => {
    const whoNowUser=req.session.isLoggedIn;
    console.log('in cases.js file to render all cases '+whoNowUser);
    //const user = await DB_user.getUserById(req.params.user_id);
    let result, casesResult;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser);
    if((result[0].TYPE).toLowerCase()==='detective')
        casesResult = await DB_case.getUnsolvedCasesByDetectiveId(result[0].USER_ID);
    else if((result[0].TYPE).toLowerCase()==='client')
        casesResult = await DB_case.getUnsolvedCasesByClientId(result[0].USER_ID);

    
    console.log(casesResult);
    res.render('layoutWithoutUser.ejs', {
                title : 'All Unsolved Cases Of Sherlocks Eye',
                body2: ['cases/all-cases'],
                user: result[0],
                casesResult : casesResult
            });
});
   

router.get('/solved-cases', async (req, res) => {
    const whoNowUser=req.session.isLoggedIn;
    console.log('in cases.js file to render all cases '+whoNowUser);
    //const user = await DB_user.getUserById(req.params.user_id);
    let result, casesResult;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser);
    if((result[0].TYPE).toLowerCase()==='detective')
        casesResult = await DB_case.getSolvedCasesByDetectiveId(result[0].USER_ID);
    else if((result[0].TYPE).toLowerCase()==='client')
        casesResult = await DB_case.getSolvedCasesByClientId(result[0].USER_ID);

    
    console.log(casesResult);
    res.render('layoutWithoutUser.ejs', {
                title : 'All Solved Cases Of Sherlocks Eye',
                body2: ['cases/all-cases'],
                user: result[0],
                casesResult : casesResult
            });
});
router.get('/graph', async(req, res) => {
    const whoNowUser=req.session.isLoggedIn;
        let result, locations;
        result = await DB_auth.getLoginInfoByEmail(whoNowUser);
        types=await DB_case.getCasesByTypeGroups();
        console.log(types);
        res.render('layoutWithoutUser.ejs', {
                    title : 'Case Description Of Sherlocks Eye',
                    body2: ['cases/casesGraph'],
                    user: result[0],
                    types:types
                });
});
    

module.exports = router;