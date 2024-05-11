const database = require('./database');

async function addResources(case_id,title,source,description,uploaded_date){
    const sql =`BEGIN
                ADD_RESOURCES(:case_id,:title,:source,:description,:uploaded_date);
                END;`;

    const binds={
        case_id:case_id,
        title:title,
        source:source,
        description:description,
        uploaded_date:uploaded_date
    }
    await database.execute(sql, binds, database.options);
    return ;
}



async function updateResources(case_id,title,source,description,uploaded_date){
    const sql =`BEGIN
                UPDATE_RESOURCES(:case_id,:title,:source,:description,:uploaded_date);
                END;`;

    const binds={
        case_id:case_id,
        title:title,
        source:source,
        description:description,
        uploaded_date:uploaded_date
    }
    await database.execute(sql, binds, database.options);
    return ;
}


async function deleteResources(case_id,title){
    const sql =`DELETE FROM Resources WHERE case_id=:case_id AND title=:title`;

    const binds={
        case_id: case_id,
        title:title
    }
    await database.execute(sql, binds, database.options);
    return ;
}

async function getResourcesByCaseId(case_id){
    const sql =`SELECT * FROM Resources
                WHERE case_id=:case_id`;

    const binds={
        case_id:case_id
    }

    return (await database.execute(sql, binds, database.options)).rows;
    
}

async function getResourcesByTitle(title){
    const sql =`SELECT *
                FROM Resources
                WHERE title=:title`;

    const binds={
        title:title
    }

    return (await database.execute(sql, binds, database.options)).rows;
    
}

async function getAllResources(){
    const sql =`SELECT * FROM Resources`;

    const binds={
    }

    return (await database.execute(sql, binds, database.options)).rows;
    
}
async function getResource(rid){
    const sql =`SELECT * FROM Resources where r_id=:r_id`;

    const binds={
        r_id:rid
    }

    return (await database.execute(sql, binds, database.options)).rows;
    
}


async function getAllZeroResourcesByUserId(user_id){
    const sql =`SELECT * FROM Resources
            where case_id=0 and R_USER_ID=:user_id`;

    const binds={
        user_id:user_id
    }

    return (await database.execute(sql, binds, database.options)).rows;
    
}
async function getAllZeroResources(){
    const sql =`SELECT * FROM Resources
            where case_id=0 `;

    const binds={
        
    }

    return (await database.execute(sql, binds, database.options)).rows;
    
}

async function getAllGroups(){
    const sql =`SELECT count(*) TOTAL, R.R_USER_ID NAME
             FROM Resources R
            where case_id=0
            group by r_user_id `;

    const binds={
        
    }

    return (await database.execute(sql, binds, database.options)).rows;
    
}


module.exports = {
    addResources,
    getAllGroups,
    getAllZeroResourcesByUserId,
    getAllZeroResources,
    updateResources,
    deleteResources,
    getAllResources,
    getResourcesByCaseId,
    getResourcesByTitle,
    getResource
}