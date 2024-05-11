const database = require('../database');



async function getUsers(user_id){
    const sql = `SELECT U.user_id 
                FROM Users U
                WHERE user_id <> :user_id`;
    const binds = {
        user_id : user_id
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getMessages(user_id, user_id2){
    const sql = `SELECT M.M_TO, M.M_FROM,M.M_BODY, to_char(M.M_DATE, 'DD/MM HH12:MI AM') time 
                FROM Messages M
                WHERE (M.M_to = :user_id AND M.M_FROM=:user_id2)
                OR (M.M_to = :user_id2 AND M.M_FROM=:user_id)
                ORDER BY M_DATE ASC`;
    const binds = {
        user_id : user_id,
        user_id2: user_id2
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function addMsg(msg, user_id_from, user_id_to){
    const sql = `BEGIN
                    ADD_MSG(:text, :from, :to);
                END;`;
    
    const binds={
        text : msg,
        from : user_id_from,
        to : user_id_to
    }
    return (await database.execute(sql, binds, database.options)).rows;
}


module.exports = {
    getUsers,
    getMessages,
    addMsg
}