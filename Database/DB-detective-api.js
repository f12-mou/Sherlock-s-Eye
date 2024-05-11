const database = require('./database');


// function to get id from email
async function getAllDetectives(){
    const sql = `
        SELECT D.*, U.*
        FROM Detectives D, Users U 
        WHERE D.detective_id=U.user_id ORDER BY U.user_id`;
    const binds = {}
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getDetectives(name,user_id,email){
    // const sql = `SELECT DISTINCT U.*,D.* FROM USERS U , DETECTIVES D  WHERE (U.USER_ID=D.DETECTIVE_ID)
    //             AND LOWER(FIRST_NAME||' '|| LAST_NAME) LIKE LOWER('%'||:name||'%') AND (u.USER_ID=:user_id OR :user_id is null) 
    //             AND NVL(lower(U.ADDRESS), ' ')like lower'%'||:address ||'%') AND NVL(lower(U.email), ' ') like lower('%'||:email ||'%')
    //             AND NVL(lower(D.EXPERIENCE), ' ')like lower'%'||:experience ||'%') AND NVL(lower(D.BIO), ' ')like lower'%'||:bio; ||'%') 
    //             AND NVL(lower(D.type), ' ')like lower'%'||:type ||'%')`;

    const sql=`SELECT DISTINCT U.*,D.* FROM USERS U , DETECTIVES D  WHERE (U.USER_ID=D.DETECTIVE_ID)
        AND LOWER(NVL(U.user_id, ' ')) like lower('%'||:user_id ||'%')
        AND NVL(LOWER(FIRST_NAME||' '|| LAST_NAME),'') LIKE LOWER('%'||:name||'%')
        AND  LOWER(NVL(U.email, ' ')) like lower('%'||:email ||'%')`;
    const binds ={
        name : name,
        user_id:user_id,
        email:email

    }
   
    
    return (await database.execute(sql, binds, database.options)).rows;
    
}

async function getDetectiveByID(ID){
    const sql = `SELECT * 
    FROM  DETECTIVES D
    WHERE D.detective_id=:id`;


    const binds = {
        id:ID
    }
    return (await database.execute(sql, binds, database.options)).rows;
}
async function updateDetective(user_id ,password ,user_type ,first_name ,last_name ,email ,address,image ,rating ,experience, bio ,type){
    const sql = `
    BEGIN
    UPDATE_INFO(:user_id ,:password ,:user_type ,:first_name ,:last_name ,:email ,:address,:image ,:rating ,:experience, :bio ,:type);
    END;   `;
    const binds = {
        user_id:user_id ,
        password:password ,
        user_type:user_type ,
        first_name:first_name ,
        last_name:last_name ,
        email:email ,
        address:address,
        image:image ,
        rating:rating ,
        experience:experience, 
        bio:bio ,
        type:type
    }
    await  database.execute(sql, binds, database.options);
    return;
}
async function getDetectiveByName(name){
    const sql = `SELECT * 
    FROM Users U, Detectives D
    WHERE D.detective_id=U.user_id
    AND  Upper(U.first_name) like Upper('%'||:name||'%')  OR Upper(U.last_name) like Upper('%'||:name||'%') `;

    const binds ={
        name:name
    };
    const result = (await database.execute(sql, binds)).rows;
    return result[0];
}

async function addCase(case_id,client_user_id,title,type,description,submitted_date,detective_id){
    const sql =`BEGIN  
        ADDCASE(:case_id,:client_user_id,:title,:type,:description,:submitted_date,:detective_id);
        END;`;

    const binds={
        case_id:case_id,
        client_user_id:client_user_id,
        title:title,
        type:type,
        description:description,
        submitted_date:submitted_date,
        detective_id: detective_id
    }
    await database.execute(sql, binds, database.options);
    return ;
}

async function getDetectiveByLocation(ADDRESS){
    const sql =`SELECT * 
    FROM Users U, Detectives D
    WHERE D.detective_id=U.user_id
    AND  U.ADDRESS=:address `;
    const binds ={
        address:address
    };
    const result = (await database.execute(sql, binds)).rows;
    return result[0];
}

module.exports = {
    getAllDetectives,
    getDetectives,
    updateDetective,
    getDetectiveByID,
    addCase,
    getDetectiveByLocation,
    getDetectiveByName
}