const database = require('../database');

async function createGroup(group, admin_id){
    const sql = `BEGIN
                    CREATE_GROUP(:group_name, :description, :cover_photo, :admin_id);
                END;`;
    
    const binds={
        group_name : group.group_name,
        description : group.description,
        cover_photo: group.cover_photo,
        admin_id : admin_id
    }
    return (await database.execute(sql, binds, database.options)).rows;
    
}

async function updateGroup(group, group_id){
    const sql =`BEGIN
                    UPDATE_GROUP(:group_id ,:group_name, :description, :cover_photo);
                end;`;

    const binds={
        group_id : group_id,
        group_name : group.group_name,
        description : group.description,
        cover_photo: group.cover_photo
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function updateGroupAdmin(group_id, admin_id){
    const sql =`BEGIN
                    UPDATE_GROUP_ADMIN(:group_id ,:admin_id);
                end;`;

    const binds={
        group_id : group_id,
        admin_id : admin_id
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function deleteGroup(group_id){
    const sql = `DELETE FROM GROUPS WHERE GROUP_ID = :group_id`;
    const binds = {
        group_id : group_id
    }
    await database.execute(sql, binds);
    return binds;
}

async function getGroups(user_id){
    const sql = `SELECT G.*, IS_GROUP_MEMBER(G.GROUP_ID, :user_id) IS_GROUP_MEMBER,
                    IS_PENDING_MEMBER(G.GROUP_ID, :user_id) IS_PENDING_MEMBER,
                (SELECT COUNT(*) FROM GROUP_MEMBERS GM WHERE GM.GROUP_ID = G.GROUP_ID) GROUP_MEMBER_COUNT
                FROM GROUPS G
                ORDER BY GROUP_MEMBER_COUNT DESC`;
    const binds = {
        user_id : user_id
    }
    // const result = (await database.execute(sql, binds)).rows;
    // return result;
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getSuggestedGroups(user_id){
    const sql = `SELECT G.*, IS_GROUP_MEMBER(G.GROUP_ID, :user_id) IS_GROUP_MEMBER,
                    IS_PENDING_MEMBER(G.GROUP_ID, :user_id) IS_PENDING_MEMBER,
                (SELECT COUNT(*) FROM GROUP_MEMBERS GM WHERE GM.GROUP_ID = G.GROUP_ID) GROUP_MEMBER_COUNT
                FROM GROUPS G
                WHERE IS_GROUP_MEMBER(G.GROUP_ID, :user_id) = 'NO'
                ORDER BY GROUP_MEMBER_COUNT DESC`;
    const binds = {
        user_id : user_id
    }
    return (await database.execute(sql, binds, database.options)).rows;
    
}

async function getGroupsByUserId(user_id){
    const sql = `SELECT G.*,IS_GROUP_MEMBER(G.GROUP_ID, :user_id) IS_GROUP_MEMBER,
                    IS_PENDING_MEMBER(G.GROUP_ID, :user_id) IS_PENDING_MEMBER,
                    (SELECT COUNT(*) FROM GROUP_MEMBERS GM WHERE GM.GROUP_ID = G.GROUP_ID) GROUP_MEMBER_COUNT
                FROM GROUPS G JOIN GROUP_MEMBERS GM ON G.GROUP_ID = GM.GROUP_ID 
                WHERE GM.USER_ID = :user_id AND G.ADMIN_ID <> :user_id`;
    const binds = {
        user_id : user_id
    }
    // const result = (await database.execute(sql, binds)).rows;
    // return result;
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getPendingGroupsByUserId(user_id){
    const sql = `SELECT G.*,IS_GROUP_MEMBER(G.GROUP_ID, :user_id) IS_GROUP_MEMBER,
                    IS_PENDING_MEMBER(G.GROUP_ID, :user_id) IS_PENDING_MEMBER,
                    (SELECT COUNT(*) FROM GROUP_MEMBERS GM WHERE GM.GROUP_ID = G.GROUP_ID) GROUP_MEMBER_COUNT
                FROM GROUPS G JOIN PENDING_MEMBERS PM ON G.GROUP_ID = PM.GROUP_ID 
                WHERE PM.USER_ID = :user_id`;
    const binds = {
        user_id : user_id
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getGroupsByAdminId(admin_id){
    const sql = `SELECT G.*,
                    (SELECT COUNT(*) FROM GROUP_MEMBERS GM WHERE GM.GROUP_ID = G.GROUP_ID) GROUP_MEMBER_COUNT
                FROM GROUPS G WHERE G.ADMIN_ID = :admin_id`;
    const binds = {
        admin_id : admin_id
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getGroup(group_id, user_id){
    const sql = `SELECT G.*, IS_GROUP_MEMBER(G.GROUP_ID, :user_id) IS_GROUP_MEMBER,
                        IS_PENDING_MEMBER(G.GROUP_ID, :user_id) IS_PENDING_MEMBER,
                    ( SELECT COUNT(*) FROM GROUP_MEMBERS GM WHERE GM.GROUP_ID = G.GROUP_ID) GROUP_MEMBER_COUNT
                FROM GROUPS G WHERE G.GROUP_ID = :group_id`;
    const binds = {
        
        group_id : group_id,
        user_id : user_id
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function searchGroups(user_id, str){
    const sql = `SELECT G.*, IS_GROUP_MEMBER(G.GROUP_ID, :user_id) IS_GROUP_MEMBER,
                        IS_PENDING_MEMBER(G.GROUP_ID, :user_id) IS_PENDING_MEMBER,
                    (SELECT COUNT(*) FROM GROUP_MEMBERS GM WHERE GM.GROUP_ID = G.GROUP_ID) GROUP_MEMBER_COUNT
                FROM GROUPS G
                WHERE UPPER(G.GROUP_NAME) LIKE UPPER('%'||:str||'%')
                ORDER BY GROUP_MEMBER_COUNT DESC`;
    const binds = {
        user_id : user_id,
        str : str
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

module.exports = {
    createGroup,
    updateGroup,
    updateGroupAdmin,
    deleteGroup,
    getGroups,
    getGroupsByUserId,
    getPendingGroupsByUserId,
    getGroupsByAdminId,
    getGroup,
    searchGroups,
    getSuggestedGroups
}