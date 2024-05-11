require('dotenv').config();
const router = require('express').Router();
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
//const {verify} = require('../../middlewares/user-verification');
//const { errors } = require('joi/lib/language');



const DB_auth = require('../../Database/DB-auth-api');
const DB_detective = require('../../Database/DB-detective-api');
const DB_case = require('../../Database/DB-case-api');
const DB_criminal = require('../../Database/DB-criminal-api');
const DB_payment = require('../../Database/DB-payment-api');
const DB_update = require('../../Database/DB-update-api');



router.get('/addNewCase', async(req, res) => {

        console.log("hereeeee in newCase");
    res.render('body/case/addNewCase.ejs', {
            title : 'Sherlocks Eye Case Register',
                //body : ['auth/register'],
                user : null,
                //errors : errors
        })
});
router.post('/cart/:caseID', async(req, res) => {

    const whoNowUser=req.session.isLoggedIn;
    const cur_case_id=req.params.caseID;
    let result,caseResult,result2,taka;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser);
    caseResult= await DB_case.getCase(cur_case_id);
    console.log("ok in payment route");
    taka=req.body.taka;
    result2=await DB_payment.addCart(caseResult[0].CLIENT_USER_ID, result[0].USER_ID, cur_case_id, taka);
    res.redirect('/api/case/detailscase/'+cur_case_id);
});

router.post('/addNewCase', async (req, res) => {
        const whoNowUser=req.session.isLoggedIn;
        let result;
        result = await DB_auth.getLoginInfoByEmail(whoNowUser);
        console.log("ok in post addNewCase route");
        console.log(req.body);
        let casesResult;
        casesResult=await DB_case.addCase(req.body, result[0].USER_ID);
        res.redirect('/api/user/userID/'+result[0].USER_ID);

        
    });


    router.get('/updateCase/:case_id', (req, res) => {
        const cur_case_id = req.params.case_id;
        console.log("hereeeee in updateCase, current id="|| cur_case_id);
        res.render('body/case/update.ejs', {
            title : 'Sherlocks Eye Update Case',
                //body : ['auth/register'],
                user : null,
                curr_case_id: cur_case_id
                //errors : errors
        })
});


router.post('/updateCase/:case_id', async (req, res) => {
    const whoNowUser=req.session.isLoggedIn;
    const cur_case_id = req.params.case_id;
    let result, theCase,result2;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser);
    theCase= await DB_case.getCase(cur_case_id);
    console.log("ok in post updateCase route");
    console.log(cur_case_id);
    let gotupdate = 
        {
                updateTitle: req.body.title,
                desc: req.body.description,
                method: req.body.method,
                resourceTitle:req.body.resourceTitle,
                resourceLink:req.body.resourceLink,
                resourceDesc:req.body.resourceDesc,
                progressRate:req.body.progressRate,
                detectiveId: result[0].USER_ID
        
        }
        console.log(gotupdate);
        console.log(cur_case_id);
        console.log("so check which one null!");
        console.log(theCase);
        let user=theCase[0].CLIENT_USER_ID;
        console.log(theCase[0].CLIENT_USER_ID);
        let updates,finalUpdate;
        // if(gotupdate.outcome==='Solved')
        //     updates=await DB_update.addSolvedCase(cur_case_id,gotupdate.desc);
        // else if(gotupdate.outcome==='Unsolved')
        //     updates=await DB_update.addUnsolvedCase(cur_case_id,gotupdate.desc,gotupdate.progressRate);

        updates=await DB_update.addUpdates(cur_case_id ,gotupdate.updateTitle,gotupdate.desc,gotupdate.method,gotupdate.resourceTitle,
            gotupdate.resourceDesc, gotupdate.resourceLink,gotupdate.progressRate,gotupdate.detectiveId,user);
            //if outcome solved 
        // finalUpdate= await DB_update.addFinalUpdate(cur_case_id,gotupdate.description,gotupdate.progressRate,gotupdate.outcome);

        
        
    res.redirect('/api/case/detailscase/'+cur_case_id);

    
});

    router.get('/detailscase/:caseIdNow', async (req, res) => {
        const whoNowUser=req.session.isLoggedIn;
        const cur_case_id = req.params.caseIdNow;
        let result, caseResult, updates,resources,challenges,crimis;
        result = await DB_auth.getLoginInfoByEmail(whoNowUser);
        caseResult = await DB_case.getCase(cur_case_id);
        updates=await DB_update.getUpdatesByCaseId(cur_case_id);
        resources=await DB_case.getResourcesByCaseId(cur_case_id);
        challenges=await DB_case.getChallengesByCaseId(cur_case_id);
        crimis=await DB_criminal.getCriminalByCaseId(cur_case_id);
        console.log(crimis);
        res.render('layoutWithoutUser.ejs', {
                    title : 'Case Description Of Sherlocks Eye',
                    body2: ['case/updateCase'],
                    user: result[0],
                    caseResult : caseResult[0],
                    updates: updates,
                    resources:resources,
                    challenges:challenges,
                    crimis:crimis
                });
    });

    router.get('/editCase/:caseIdNow', async (req, res) => {

        const whoNowUser=req.session.isLoggedIn;
        const cur_case_id = req.params.caseIdNow;
        let result, caseResult;
        result = await DB_auth.getLoginInfoByEmail(whoNowUser);
        caseResult = await DB_case.getCase(cur_case_id);
        console.log('chk'|| caseResult[0]);
       // updates=await DB_update.getUpdatesByCaseId(cur_case_id);
       // resources=await DB_case.getResourcesByCaseId(cur_case_id);

        res.render('layoutWithoutUser.ejs', {
                    title : 'Case Description Of Sherlocks Eye',
                    body2: ['case/editCase'],
                    user: result[0],
                    caseResult : caseResult[0]
                });
    });

    router.post('/editCase/:case_id', async (req, res) => {

        const whoNowUser=req.session.isLoggedIn;
        const cur_case_id = req.params.case_id;

        console.log('current case id'|| cur_case_id);
        let result, updateCaseResult;
        result = await DB_auth.getLoginInfoByEmail(whoNowUser);
       // caseResult = await DB_case.getCase(cur_case_id);

        let updatedCase=
        {
            title:req.body.title,
            description:req.body.description,
            thana:req.body.thana,
            district:req.body.district,
            division:req.body.division
        }

        updateCaseResult=await DB_case.editCase(cur_case_id,updatedCase.title,updatedCase.description,updatedCase.thana,updatedCase.district,updatedCase.division);


       res.redirect('/api/case/detailscase/'+cur_case_id);

    });


    router.post('/addResource/:caseIdNow', async (req, res) => {
        const whoNowUser=req.session.isLoggedIn;
        const cur_case_id = req.params.caseIdNow;
        let result, caseResult, updates,resources,total,result2,challenges;
        result = await DB_auth.getLoginInfoByEmail(whoNowUser);
        caseResult = await DB_case.getCase(cur_case_id);
        updates=await DB_update.getUpdatesByCaseId(cur_case_id);
        console.log(req.body);
        
        total=await DB_case.getTotalResource();
        console.log(total[0].TOTAL);
        result2=await DB_case.addResourceByCaseId(total[0].TOTAL+1, cur_case_id, result[0].USER_ID,req.body);
        resources=await DB_case.getResourcesByCaseId(cur_case_id);
        challenges=await DB_case.getChallengesByCaseId(cur_case_id);
        res.render('layoutWithoutUser.ejs', {
                    title : 'Case Description Of Sherlocks Eye',
                    body2: ['case/updateCase'],
                    user: result[0],
                    caseResult : caseResult[0],
                    updates: updates,
                    resources:resources,
                    challenges:challenges
                });
    });
    router.post('/updateChallenge/:caseIdNow', async (req, res) => {
        const whoNowUser=req.session.isLoggedIn;
        const cur_case_id = req.params.caseIdNow;
        let result2;
        console.log(req.body);
        result2=await DB_case.updateChallenge(cur_case_id, req.body);
        res.redirect('/api/case/detailscase/'+cur_case_id);

        
    });
    
    router.post('/updateFailure/:caseIdNow', async (req, res) => {
        const whoNowUser=req.session.isLoggedIn;
        const cur_case_id = req.params.caseIdNow;
        let result2;
        console.log(req.body);
        result2=await DB_case.updateFailure(cur_case_id, req.body);
        res.redirect('/api/case/detailscase/'+cur_case_id);

        
    });
    router.post('/rollback/:caseIdNow', async (req, res) => {
        const whoNowUser=req.session.isLoggedIn;
        const cur_case_id = req.params.caseIdNow;
        let result2;
        console.log(req.body);
        result2=await DB_case.DeleteFromCart(cur_case_id);
        res.redirect('/api/case/viewCart');

        
    });
    router.get('/viewCart', async (req, res) => {
        const whoNowUser=req.session.isLoggedIn;
        let result, casesResult,paidCases;
        result = await DB_auth.getLoginInfoByEmail(whoNowUser);
        console.log(result);
        casesResult = await DB_payment.getCartCases(result[0].USER_ID);
        paidCases=await DB_payment.getCartPaidCases(result[0].USER_ID);
        console.log(paidCases);
        console.log(casesResult);
        res.render('layoutWithoutUser.ejs', {
                    title : 'My Cart Items in Sherlocks Eye',
                    body2: ['case/cartView'],
                    user: result[0],
                    casesResult : casesResult,
                    paidCases:paidCases,
                    cur_case_id:result[0].USER_ID
                });
    });
    router.get('/addCrimi/:caseIdNow', async (req, res) => {
        const whoNowUser=req.session.isLoggedIn;
        let result, casesResult;
        result = await DB_auth.getLoginInfoByEmail(whoNowUser);
        const cur_case_id = req.params.caseIdNow;
        res.render('body/criminals/AddCrimi.ejs', {
                    title : 'My Cart Items in Sherlocks Eye',
                    body2: ['Criminals/AddCrimi'],
                    user: result[0],
                    cur_case_id:cur_case_id
                });
    });
    router.post('/addCrimi/:caseIdNow', async (req, res) => {
        const whoNowUser=req.session.isLoggedIn;
        let result, casesResult,result2;
        result = await DB_auth.getLoginInfoByEmail(whoNowUser);
        const cur_case_id = req.params.caseIdNow;
        console.log(req.body);
        req.body.dob='';
        result2=await DB_criminal.updateCriminal(cur_case_id,req.body);
        res.redirect('/api/case/detailscase/'+cur_case_id);
        // res.render('body/criminals/AddCrimi.ejs', {
        //             title : 'My Cart Items in Sherlocks Eye',
        //             body2: ['Criminals/AddCrimi'],
        //             user: result[0],
        //             cur_case_id:cur_case_id
        //         });
    });
    router.get('/addTaka/:caseIdNow', async (req, res) => {
        const whoNowUser=req.session.isLoggedIn;
        const cur_case_id = req.params.caseIdNow;
        console.log('in addTaka file to render details case  '+cur_case_id);
        let result, caseResult, updates;
        result = await DB_auth.getLoginInfoByEmail(whoNowUser);
        caseResult = await DB_case.getCase(cur_case_id);
        console.log('here is the gottttttt case in detailsCase ');
        console.log(caseResult);

        res.render('body/case/addTaka.ejs', {
                    title : 'Making Deal at Sherlocks Eye',
                    user: result[0],
                    caseResult : caseResult[0]
                });
    });
    router.get('/giveTaka/:caseIdNow', async (req, res) => {
        const whoNowUser=req.session.isLoggedIn;
        const cur_case_id = req.params.caseIdNow;
        console.log('in giveTaka file to render details case  '+cur_case_id);
        let result, caseResult, updates;
        result = await DB_auth.getLoginInfoByEmail(whoNowUser);
        caseResult = await DB_case.getCase(cur_case_id);

        res.render('body/case/giveTaka.ejs', {
                    title : 'Payment Procedure in Sherlocks Eye',
                    user: result[0],
                    caseResult : caseResult[0]
                });
    });
    router.post('/giveTaka/:caseIdNow', async (req, res) => {
        const whoNowUser=req.session.isLoggedIn;
        const cur_case_id = req.params.caseIdNow;
        console.log(req.body);
        let result, caseResult, updates,result2;
        result = await DB_auth.getLoginInfoByEmail(whoNowUser);
        caseResult = await DB_case.getCase(cur_case_id);
        result2=await DB_payment.addPayment(result[0].CASE_ID, cur_case_id,req.body);
        res.redirect('/api/case/detailscase/'+cur_case_id);
    });
    router.post('/addTaka/:caseIdNow', async (req, res) => {
        const whoNowUser=req.session.isLoggedIn;
        const cur_case_id = req.params.caseIdNow;
        console.log('in addTaka file to render details case  '+cur_case_id);
        let result, caseResult, result2,taka;
        taka=req.body.taka;
        console.log('taka is'+taka);
        result = await DB_auth.getLoginInfoByEmail(whoNowUser);
        caseResult = await DB_case.getCase(cur_case_id);
        console.log('here is the gottttttt case in detailsCase ');
        console.log(caseResult);
        result2=await DB_case.ADDPENDINGCASE(cur_case_id, taka);

        res.redirect('/api/case/detailscase/'+cur_case_id);
    });

    router.post('/Acceptcase/:caseIdNow', async (req, res) => {
        const whoNowUser=req.session.isLoggedIn;
        const cur_case_id = req.params.caseIdNow;
        console.log('in AcceptCase.js file '+cur_case_id);
        let result, caseResult, onlyOneCaseResult;
        result = await DB_auth.getLoginInfoByEmail(whoNowUser);

        // ekhane update koro procedures


        caseResult = await DB_case.getCase(cur_case_id);
        console.log('here is the gottttttt case in detailsCase ');
        console.log(caseResult);
        res.redirect('/api/case/detailscase/'+cur_case_id);
        
    });
    router.get('/declined/:caseIdNow', async (req, res) => {
        const whoNowUser=req.session.isLoggedIn;
        const cur_case_id = req.params.caseIdNow;
        console.log('in declinedCase.js file '+cur_case_id);
        let result, caseResult, onlyOneCaseResult;
        result = await DB_auth.getLoginInfoByEmail(whoNowUser);

        // ekhane update koro procedures
        caseResult = await DB_case.ADDDECLINEDCASE(cur_case_id);
        res.redirect('/api/case/detailscase/'+cur_case_id);
        
    });
    
    router.post('/detailscase', async (req, res) => {
    
        let result , errors = [];
        console.log("ok in post detailsCase route");
        res.redirect('/api/cases/all-cases');
        
    });
    router.post('/addDetective/:caseIdNow', async (req, res) => {
        const whoNowUser=req.session.isLoggedIn;
        const cur_case_id = req.params.caseIdNow;
        console.log(req.body);
        let result, caseResult, updates,result2;
        result = await DB_auth.getLoginInfoByEmail(whoNowUser);
        caseResult = await DB_case.UpdateDECLINEDCASE(cur_case_id, req.body.reqDetective);
        res.redirect('/api/case/detailscase/'+cur_case_id);
    });

    router.get('/muhaha', async (req, res) => {
        const whoNowUser=req.session.isLoggedIn;
        let result, locations;
        result = await DB_auth.getLoginInfoByEmail(whoNowUser);
        locations=await DB_criminal.getCriminalByLocationGroup();
        console.log(locations);
        res.render('layoutWithoutUser.ejs', {
                    title : 'Case Description Of Sherlocks Eye',
                    body2: ['criminals/crimiGraph'],
                    user: result[0],
                    locations:locations
                });
    });





module.exports = router;