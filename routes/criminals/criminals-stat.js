require('dotenv').config();
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const {verify} = require('../../middlewares/user-verification');
//const { errors } = require('joi/lib/language');



const DB_auth = require('../../Database/DB-auth-api');
const DB_detective = require('../../Database/DB-detective-api');
const DB_case = require('../../Database/DB-case-api');
const DB_criminal = require('../../Database/DB-criminal-api');

router.get('/search', async (req, res) => {
    const whoNowUser = req.session.isLoggedIn;
    console.log('in criminals-stat.js file to render search criminals ' + whoNowUser);
    //const user = await DB_user.getUserById(req.params.user_id);
    let result;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser);
    let users = await DB_criminal.getAllCriminals();
    console.log(users);
    res.render('layoutWithoutUser.ejs', {
        title: 'Search Criminals Of Sherlocks Eye',
        body2: ['criminals/searchCriminals'],
        users: users,
        user: result[0]
    });
})

router.post('/search', async (req, res) => {
    const whoNowUser = req.session.isLoggedIn;
    console.log('in criminals-stat.js file to render search criminals ' + whoNowUser);
    //const user = await DB_user.getUserById(req.params.user_id);
    let result;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser);
    console.log('chk:' || req.body.criminal_id || ' ' || 'name' || req.body.name)
    let users = await DB_criminal.getCriminalsByCriminalId(req.body.criminal_id, req.body.name);//,req.body.case_id);
    console.log(users);
    res.render('layoutWithoutUser.ejs', {
        title: 'Search Criminals Of Sherlocks Eye',
        body2: ['criminals/searchCriminals'],
        users: users,
        user: result[0]
    });
})

router.get('/criminals-stat', async (req, res) => {
    console.log('in criminals stat');
    const whoNowUser = req.session.isLoggedIn;
    console.log('in criminals-stat.js file to render all criminals ' + whoNowUser);
    //const user = await DB_user.getUserById(req.params.user_id);
    let result, criminalsDhaka, criminalsChattogram, criminalsRajshahi,
        criminalsKhulna, criminalsBarishal, criminalsSylhet, criminalsRangpur,
        criminalsMymensingh;

    result = await DB_auth.getLoginInfoByEmail(whoNowUser);
    criminalsDhaka = await DB_criminal.getCriminalByLocation('Dhaka');
    criminalsChattogram = await DB_criminal.getCriminalByLocation('Chattogram');
    criminalsRajshahi = await DB_criminal.getCriminalByLocation('Rajshahi');
    criminalsKhulna = await DB_criminal.getCriminalByLocation('Khulna');
    criminalsBarishal = await DB_criminal.getCriminalByLocation('Barishal');
    criminalsSylhet = await DB_criminal.getCriminalByLocation('Sylhet');
    criminalsRangpur = await DB_criminal.getCriminalByLocation('Rangpur');
    criminalsMymensingh = await DB_criminal.getCriminalByLocation('Mymensingh');

    res.render('layoutWithoutUser.ejs', {
        title: 'All Criminals Statistics Of Sherlocks Eye',
        body2: ['criminals/criminals-stat'],
        user: result[0],
        criminalsDhaka: criminalsDhaka,
        criminalsChattogram: criminalsChattogram,
        criminalsRajshahi: criminalsRajshahi,
        criminalsKhulna: criminalsKhulna,
        criminalsBarishal: criminalsBarishal,
        criminalsSylhet: criminalsSylhet,
        criminalsRangpur: criminalsRangpur,
        criminalsMymensingh: criminalsMymensingh
    });
});

router.get('/graph', async (req, res) => {
    const whoNowUser = req.session.isLoggedIn;
    let result, locations;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser);
    locations = await DB_criminal.getCriminalByLocationGroup();
    console.log(locations);
    res.render('layoutWithoutUser.ejs', {
        title: 'Case Description Of Sherlocks Eye',
        body2: ['criminals/crimiGraph'],
        user: result[0],
        locations: locations
    });
});


router.get('/detailsCrimi/:crimiId', async (req, res) => {
    const whoNowUser = req.session.isLoggedIn;
    const criminal = req.params.crimiId;
    console.log('in case.js file to render details crimi  ' + criminal);
    let result, caseResult, updates;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser);
    crimiResult = await DB_criminal.getCriminalsByCriminalId(criminal);
    res.render('layoutWithoutUser.ejs', {
        title: 'Criminal Details Of Sherlocks Eye',
        body2: ['criminals/detailsCrimi'],
        user: result[0],
        crimi: crimiResult[0]
    });
});



module.exports = router;