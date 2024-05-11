const database = require('./database');



// function to get id from email
async function getUserIDByEmail(email){
    const sql = `SELECT * FROM Users WHERE email=:email`;

    const binds = {
        email : email
    }

    return (await database.execute(sql, binds, database.options)).rows;
}

// function to creat new user
// user should have handle, email, pass, dob
// {id} will be returned
async function createNewUser(user){
    const sql = `BEGIN 
                ADDUSER(:user_id,:password,:type,:first_name,:last_name,:email,:address);
                END ;`;
    const binds = {
        user_id: user.user_id,
        password: user.password,
        type:user.type,
        first_name: user.first_name,
        last_name:user.last_name,
        email :user.email,
        address:user.address,
    }
    return await database.execute(sql, binds, {});
}
async function editInfo(first_name,last_name,thana,district,division,bio,experience,user_id){
    const sql =`UPDATE USERS 
                SET first_name=:first_name, last_name=:last_name,thana=:thana,district=:district, 
                division=:division, bio=:bio,experience=:experience
                WHERE user_id=:user_id   `;

    const binds={
        first_name:first_name,
        last_name:last_name,
        thana:thana,
        district:district,
        division:division,
        bio:bio,
        experience:experience,
        user_id:user_id
    }
    await database.execute(sql, binds, database.options);
    return ;
}


async function editPass(password, user_id){
    const sql =`UPDATE USERS SET password=:password WHERE user_id=:user_id`;

    const binds={
       password:password,
       user_id:user_id
    }
    await database.execute(sql, binds, database.options);
    return ;
}

// async function addDEtective(detective_id){
//     const sql = `INSERT INTO Detectives(detective_id)
//                  VALUES(:detective_id)`;
//     const binds = {
//         detective_id
//     }
//     return await database.execute(sql, binds, {});
// }

// return login info (id, handle, password) from handle
async function getLoginInfoByEmail(email){

    const sql = `SELECT * FROM Users WHERE email=:email`;
    const binds = {
        email: email
    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function getLoginInfoByID(user_id){
    const sql = `SELECT * FROM Users WHERE user_id=:user_id`;

    const binds = {
        user_id:user_id
    }

    return (await database.execute(sql, binds, database.options)).rows;
}


module.exports = {
    getUserIDByEmail,
    editInfo,
    editPass,
    createNewUser,
    getLoginInfoByEmail,
    getLoginInfoByID
}