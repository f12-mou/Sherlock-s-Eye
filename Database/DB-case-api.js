const database = require('./database');

// two methods are extra, can work by db-detecibe-api addcase(procedure)
async function addCase(demo, user_id){
    const sql = `BEGIN
                    ADD_CASE(:user_id, :subject, :topic, :chapter, :detective_id,:title, :description,
                        :resourceTitle, :resourceLink, :resourceDesc);
                END;`;
    
    const binds={
        user_id : user_id,
        subject : demo.subject,
        topic: demo.topic,
        chapter: demo.chapter,
        detective_id: demo.detective_id,
        title: demo.title,
        description: demo.description,
        resourceTitle: demo.resourceTitle,
        resourceLink: demo.resourceLink,
        resourceDesc: demo.resourceDesc
    }
    
    return (await database.execute(sql, binds, database.options)).rows;
}


async function updateCase(case_id,type,description){
    const sql =`BEGIN 
                ADDPENDINGCASE(:case_id);
                END;`;

    const binds={
        case_id,client_user_id,title,type,description,submitted_date
    }
    await database.execute(sql, binds, database.options);
    return ;
}
async function addResourceByCaseId(cnt,case_id,user_id,resource){
    const sql =`BEGIN 
                ADD_RESOURCE(:cnt,:user_id,:case_id,:title,:desc,:source);
                END;`;

    const binds={
        cnt:cnt,
        user_id:user_id,
        case_id: case_id,
        title:resource.title,
        desc: resource.description,
        source: resource.link

    }
    return (await database.execute(sql, binds, database.options)).rows;
}
async function getTotalResource(){
    const sql =`SELECT COUNT(*) TOTAL
    FROM RESOURCES`;

    const binds={
        
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function addCaseForDetective(case_id,detective_id){
    const sql =`INSERT INTO Filed_Cases(case_id,detective_id)
                VALUES (:case_id,:detective_id)`;

    const binds={
        case_id,detective_id
    }
    await database.execute(sql, binds, database.options);
    return ;
}

// async function updateResearchInterest(research_interest, research_interest_id){
//     const sql =`BEGIN
//                     UPDATE_RESEARCH_INTEREST(:research_interest_id, :research_interest, :result);
//                 END;`;

//     const binds={
//         research_interest : research_interest,
//         research_interest_id : research_interest_id,
//         result: {
//             dir: oracledb.BIND_OUT, 
//             type: oracledb.VARCHAR2
//         }
//     }
//     return (await database.execute(sql, binds)).outBinds;
// }

async function deleteCase(case_id){
    const sql =`DELETE FROM Cases
                WHERE case_id = :case_id`;

    const binds={
        case_id: case_id
    }
    await database.execute(sql, binds, database.options);
    return ;
}
async function updateChallenge(case_id, obj){
    const sql =`UPDATE SOLVED_CASES
     SET CHALLENGES= :ch 
    WHERE case_id = :case_id`;

    const binds={
        case_id: case_id,
        ch: obj.experience
        
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function updateFailure(case_id, obj){
    const sql =`BEGIN 
                ADD_UNSOLVED(:case_id,:limitation, :reason);
                END;`;

    const binds={
        case_id: case_id,
        limitation: obj.limitation,
        reason:obj.reason
        
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getCase(case_id){
    const sql =`SELECT * 
    FROM CASES c, FILED_CASES fc  
    WHERE c.case_id=:case_id and fc.CASE_ID=c.CASE_ID`;

    const binds={
       case_id: case_id
    }

    return (await database.execute(sql, binds, database.options)).rows;
    
}


async function getAllCase(){
    const sql =`SELECT c.*, fc.* FROM Cases c ,  Filed_Cases fc 
                WHERE c.case_id=fc.case_id`;

    const binds={
    }

    return (await database.execute(sql, binds, database.options)).rows;
    
}

async function getCasesByClientId(client_id)
{  
    console.log("in async func "+client_id);
    const sql=`SELECT c.* FROM Cases c WHERE  c.client_user_id=:client_id`;
    const binds={
        client_id: client_id
    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function getCasesByDetectiveId(detective_id)
{
    const sql=`SELECT c.*, fc.* FROM Cases c ,  Filed_Cases fc 
    WHERE c.case_id=fc.case_id and fc.detective_id= :detective_id`;
    
    const binds={
        detective_id: detective_id
    }

    return (await database.execute(sql, binds, database.options)).rows;
}
async function getResourcesByCaseId(case_id)
{
    const sql=`SELECT r.* FROM Resources r
    WHERE r.case_id=:case_id`;
    
    const binds={
        case_id:case_id
    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function getChallengesByCaseId(case_id)
{
    const sql=`SELECT s.* FROM SOLVED_CASES s
    WHERE s.case_id=:case_id`;
    
    const binds={
        case_id:case_id
    }

    return (await database.execute(sql, binds, database.options)).rows;
}



async function getUnsolvedCasesByClientId(client_user_id)
{
    const sql=`SELECT c.* ,uc.*
    FROM Cases c , UNSOLVED_CASES uc
    WHERE c.case_id=uc.CASE_ID and 
    lower(c.type) like 'unsolved' AND  c.client_user_id=:client_user_id`;
    const binds={
        client_user_id: client_user_id
    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function getUnsolvedCasesByDetectiveId(detective_id)
{
    const sql=`SELECT c.*, fc.* ,uc.* FROM Cases c ,  Filed_Cases fc ,UNSOLVED_CASES uc
    WHERE c.case_id=fc.CASE_ID AND c.CASE_ID=uc.CASE_ID AND fc.detective_id= :detective_id AND lower(c.type) like 'unsolved'`;
    const binds={
        detective_id: detective_id
    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function getSolvedCasesByClientId(client_user_id)
{
    const sql=`SELECT c.* ,sc.*
            FROM Cases c , SOLVED_CASES sc
            WHERE c.case_id=sc.CASE_ID and 
            lower(c.type) like 'solved' AND  c.client_user_id=:client_user_id`;
    const binds={
        client_user_id: client_user_id
    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function getSolvedCasesByDetectiveId(detective_id)
{
    const sql=`SELECT c.*, fc.* ,sc.* FROM Cases c ,  Filed_Cases fc ,SOLVED_CASES sc
    WHERE c.case_id=fc.CASE_ID AND c.CASE_ID=sc.CASE_ID AND fc.detective_id= :detective_id`;
    const binds={
        detective_id: detective_id
    }

    return (await database.execute(sql, binds, database.options)).rows;
}


async function addSolvedCases(case_id,solved_date,challenges,criminal_id,name,location,dob,info,image)
{
    const sql=`BEGIN 
            ADD_SOLVED_CASE(case_id,solved_date, challenges,criminal_id,name, location,dob, info, image);
            END;`;
    const binds={
        case_id:case_id,
        solved_date:solved_date,
        challenges:challenges,
        criminal_id:criminal_id,
        name:name,
        location:location,
        dob:dob,
        info:info,
        image:image
    }

    return (await database.execute(sql, binds, database.options)).rows;
}
async function ADDPENDINGCASE(case_id,taka)
{
    const sql=`BEGIN 
            ADDPENDINGCASE(:case_id,:taka);
            END;`;
    const binds={
        case_id:case_id,
        taka: taka
    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function ADDDECLINEDCASE(case_id)
{
    const sql=`BEGIN 
            ADDDECLINEDCASE(:case_id);
            END;`;
    const binds={
        case_id:case_id
    }

    return (await database.execute(sql, binds, database.options)).rows;
}
async function editCase(case_id,title,description,thana,district,division)
{
    const sql=`UPDATE CASES SET title=:title, description=:description,thana=:thana,district=:district,division=:division 
                WHERE case_id=:case_id `;
    const binds={
        case_id:case_id,
        title:title,
        description:description,
        thana:thana,
        district:district,
        division:division
    }

    return (await database.execute(sql, binds, database.options)).rows;
}
async function DeleteFromCart(case_id)
{
    const sql=`DELETE FROM CART
            WHERE C_CASE_ID=:case_id`;
    const binds={
        case_id:case_id
    }

    return (await database.execute(sql, binds, database.options)).rows;
}
async function UpdateDECLINEDCASE(case_id,detective_id)
{
    const sql=`BEGIN 
            UPDATEDECLINEDCASE(:case_id,:detective_id);
            END;`;
    const binds={
        case_id:case_id,
        detective_id:detective_id
    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function getPendingCasesByClientId(client_user_id)
{
    const sql=`SELECT c.* ,pc.*
    FROM Cases c , PENDING_CASES pc
    WHERE c.case_id=pc.CASE_ID and 
    lower(c.type) like 'pending' AND  c.client_user_id=:client_user_id`;
    const binds={
        client_user_id: client_user_id
    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function getPendingCasesByDetectiveId(detective_id)
{
    const sql=`SELECT c.*, fc.* ,pc.* FROM Cases c ,  Filed_Cases fc ,PENDING_CASES pc
                WHERE c.case_id=fc.CASE_ID AND c.CASE_ID=pc.CASE_ID AND 
                fc.detective_id= :detective_id AND lower(c.type) like 'pending'`;
    const binds={
        detective_id: detective_id
    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function getRequestedCasesByClientId(client_user_id)
{
    const sql=`SELECT c.* FROM Cases c WHERE lower(c.type) like 'requested' AND  c.client_user_id=:client_user_id`;
    const binds={
        client_user_id:client_user_id
    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function getRequestedCasesByDetectiveId(detective_id)
{
    const sql=`SELECT c.*, fc.* FROM Cases c ,  Filed_Cases fc 
    WHERE fc.detective_id= :detective_id AND lower(c.type) like 'requested'
    AND c.CASE_ID=fc.CASE_ID`;
    const binds={
        detective_id: detective_id
    }

    return (await database.execute(sql, binds, database.options)).rows;
}
async function getCasesByTypeGroups(){
    const sql =`SELECT COUNT(*) TOTAL, C.TYPE
                FROM Cases C 
                GROUP BY C.TYPE`;
    const binds={
        
    }

    return (await database.execute(sql, binds, database.options)).rows;
    
}
async function getSearchedCase(case_id,case_title,det_id,client_id){
    const sql =`	SELECT * 
    FROM 
    CASES  LEFT OUTER JOIN  FILED_CASES   
    ON CASES.case_id=FILED_CASES.case_id 
    WHERE nvl(cases.case_id,' ') like  ('%'||:case_id|| '%') 
		AND    lower(nvl(title,' '))  like  ('%'|| :case_title|| '%') 
		AND  nvl(FILED_CASES.DETECTIVE_ID,' ') like  ('%'|| :det_id|| '%')
		AND  nvl(cASES.CLIENT_USER_ID,' ') like  ('%'|| :client_id|| '%')`;

    const binds={
       case_id: case_id,
       case_title:case_title,
       det_id:det_id,
       client_id:client_id
    }

    return (await database.execute(sql, binds, database.options)).rows;
    
}



module.exports = {
    addCase,
    getCasesByTypeGroups,
    getSearchedCase,
    DeleteFromCart,
    ADDDECLINEDCASE,
    UpdateDECLINEDCASE,
    getResourcesByCaseId,
    getTotalResource,
    addResourceByCaseId,
    addCaseForDetective,
    deleteCase,
    addSolvedCases,
    getCase,
    getAllCase,
    getCasesByClientId,
    getCasesByDetectiveId,
    getUnsolvedCasesByClientId,
    getUnsolvedCasesByDetectiveId,
    getSolvedCasesByClientId,
    getSolvedCasesByDetectiveId,
    getPendingCasesByDetectiveId,
    getPendingCasesByClientId,
    getRequestedCasesByClientId,
    getRequestedCasesByDetectiveId,
    ADDPENDINGCASE,
    getChallengesByCaseId,
    updateChallenge,
    updateFailure,
    editCase
}