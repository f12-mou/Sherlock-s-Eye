const database = require('./database');


async function addUpdates(cur_case_id ,updateTitle,desc,method,resourceTitle,
    resourceDesc, resourceLink,progressRate,detectiveId,client_id){
    const sql = `BEGIN 
                ADDUPDATE(:cur_case_id ,:updateTitle,:desc,:method,:resourceTitle,
                    :resourceDesc, :resourceLink,:progressRate,:detectiveId,:client_id) ;
                END;`;
    
    const binds={
        cur_case_id:cur_case_id ,
        updateTitle:updateTitle,
        desc:desc,
        method:method,
        resourceTitle:resourceTitle,
        resourceDesc:resourceDesc, 
        resourceLink:resourceLink,
        progressRate:progressRate,
        detectiveId:detectiveId, 
        client_id:client_id
    }
    return (await database.execute(sql, binds, database.options)).rows;
    
}


async function addFinalUpdate(case_id,description,progress,outcome){
    const sql =`BEGIN 
    FINALUPDATECASE(:case_id,:description,:progress,:outcome );
    END;`;

    const binds={
        case_id:case_id,
        description:description,
        progress:progress,
        outcome:outcome
    }
    await database.execute(sql, binds, database.options);
    return ;
}
async function addSolvedCase(case_id,description){
    const sql =`BEGIN 
    updateSolvedCase(:case_id,:description);
    END;`;

    const binds={
        case_id:case_id,
        description:description,
    }
    await database.execute(sql, binds, database.options);
    return ;
}
async function addUnsolvedCase(case_id,description,progress){
    const sql =`BEGIN 
    updateUnsolvedCase(:case_id,:description,:progress );
    END;`;

    const binds={
        case_id:case_id,
        description:description,
        progress:progress
    }
    await database.execute(sql, binds, database.options);
    return ;
}
async function getUpdatesByCaseId(case_id){
    const sql = `SELECT * FROM Updates where case_id=:case_id
                        ORDER BY update_date DESC`;
    
    const binds={
       case_id:case_id
    }
    return (await database.execute(sql, binds, database.options)).rows;
}







module.exports = {
    addUpdates,
    getUpdatesByCaseId,
    addFinalUpdate,
    addSolvedCase,
    addUnsolvedCase
}