const router = require('express').Router();
const bcrypt= require('bcryptjs');
const DB_auth = require('../../Database/DB-auth-api');
const DB_resources = require('../../Database/DB-resources-api');
const DB_case = require('../../Database/DB-case-api');
const DB_detective = require('../../Database/DB-detective-api');
// const DB_user = require('../../DB-codes/users/DB-user-api');
// const {verify} = require('../../middlewares/user-verification');

router.get('/upload', async(req,res)=>{
    //save update
    const whoNowUser = req.session.isLoggedIn;
    let result;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser);

    res.render('layoutWithoutUser.ejs', {
            title : 'CONTRIBUTE TO RESOURCES OF SHERLOCKS EYE',
            body2: ['resources/upload-resources'],
             user: result[0]
            
        })
});
router.get('/all', async(req,res)=>{
        //save update
        const whoNowUser = req.session.isLoggedIn;
        let result,arrayResult;
        result = await DB_auth.getLoginInfoByEmail(whoNowUser);
        arrayResult=await DB_resources.getAllZeroResources();
        console.log(arrayResult);
    
        res.render('layoutWithoutUser.ejs', {
                title : 'All Shared Resources',
                body2: ['resources/all-resources'],
                 user: result[0],
                 arrayResult:arrayResult
                
            })
    });
    router.get('/my', async(req,res)=>{
        //save update
        const whoNowUser = req.session.isLoggedIn;
        let result,arrayResult;
        result = await DB_auth.getLoginInfoByEmail(whoNowUser);
        arrayResult=await DB_resources.getAllZeroResourcesByUserId(result[0].USER_ID);
        console.log(arrayResult);
    
        res.render('layoutWithoutUser.ejs', {
                title : 'All Shared Resources',
                body2: ['resources/all-resources'],
                 user: result[0],
                 arrayResult:arrayResult
                
            })
    });
    router.get('/graph', async(req,res)=>{
        //save update
        const whoNowUser = req.session.isLoggedIn;
        let result,groups;
        result = await DB_auth.getLoginInfoByEmail(whoNowUser);
        groups=await DB_resources.getAllGroups();
        console.log(groups);
    
        res.render('layoutWithoutUser.ejs', {
                title : 'All Shared Resources',
                body2: ['resources/graph-resources'],
                 user: result[0],
                 groups:groups
                
            })
    });
    router.get('/details/:rIdNow', async (req, res) => {
        const whoNowUser=req.session.isLoggedIn;
        const cur_r_id = req.params.rIdNow;
        let result, caseResult, updates,resources,challenges;
        result = await DB_auth.getLoginInfoByEmail(whoNowUser);
        caseResult = await DB_resources.getResource(cur_r_id);
        res.render('layoutWithoutUser.ejs', {
                    title : 'Resource Description Of Sherlocks Eye',
                    body2: ['resources/resource'],
                    user: result[0],
                    caseResult : caseResult[0]
                });
    });
router.post('/upload', async(req,res)=>{
        //save update
        const whoNowUser = req.session.isLoggedIn;
        let result,result2, total;
        result = await DB_auth.getLoginInfoByEmail(whoNowUser);

        console.log(req.body);


        total=await DB_case.getTotalResource();
        console.log(total[0].TOTAL);
        result2=await DB_case.addResourceByCaseId(total[0].TOTAL+1, 0, result[0].USER_ID,req.body);
    
        res.render('layoutWithoutUser.ejs', {
                title : 'CONTRIBUTE TO RESOURCES OF SHERLOCKS EYE',
                body2: ['resources/upload-resources'],
                 user: result[0]
                
            })
    });


module.exports = router;