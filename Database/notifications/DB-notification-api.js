const database = require('../database');

async function getUnseenNotifications(user_id){
    const sql = `SELECT * FROM NOTIFICATION WHERE USER_ID = :user_id AND seen = 'NO'
                    ORDER BY TIMESTAMP DESC`;
    // const sql = `UPDATE NOTIFICATION
    //                 SET seen = 'YES'
    //                 WHERE USER_ID = :user_id`;
    
    const binds={
        user_id : user_id
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getAllNotifications(user_id){
    const sql = `SELECT * FROM NOTIFICATION WHERE USER_ID = :user_id
                    ORDER BY TIMESTAMP DESC`
    
    const binds={
        user_id : user_id
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getUnseenNotificationCount(user_id){
    const sql = `SELECT COUNT(*) COUNT FROM NOTIFICATION WHERE USER_ID = :user_id AND seen = 'NO'`;
    
    const binds={
        user_id : user_id
    }
    return (await database.execute(sql, binds, database.options)).rows[0];
}




module.exports = {
    getUnseenNotifications,
    getAllNotifications,
    getUnseenNotificationCount
}