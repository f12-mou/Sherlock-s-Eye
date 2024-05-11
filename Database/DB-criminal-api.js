const database = require('./database');

async function updateCriminal(cur_case_id,crimi){
    const sql =`BEGIN
                ADDCRIMINAL(:name,:divi,:district,:thana,:dob,:info,:image,:case_id);
                END;`;

    const binds={
        name:crimi.name,
        divi:crimi.subject,
        district:crimi.topic,
        thana:crimi.chapter,
        dob:crimi.dob,
        info:crimi.info,
        image: crimi.image,
        case_id:cur_case_id
    }
    return (await database.execute(sql, binds, database.options)).rows;   
}


async function deleteCriminal(criminal_id){
    const sql =`DELETE FROM Criminals WHERE criminal_id=:criminal_id`;

    const binds={
        criminal_id:criminal_id
    }
    await database.execute(sql, binds, database.options);
    return ;
}

async function getCriminalsByCriminalId(criminal_id,name){
    const sql =`SELECT * FROM Criminals
                WHERE nvl(criminal_id,' ') like  ('%'|| :criminal_id|| '%') AND lower(name) like lower(('%' || :name|| '%')) `;

    const binds={
        criminal_id:criminal_id,
        name:name
    }

    return (await database.execute(sql, binds, database.options)).rows;
    
}

// async function getCriminalsByCriminalId(criminal_id,name,case_id){
//     const sql =`SELECT * FROM FROM CASES NATURAL JOIN FOUND_CRIMINALS NATURAL JOIN Criminals
//                 WHERE nvl(criminal_id,' ') like  ('%'|| :criminal_id|| '%') AND  case_id=:case_id and lower(name) like lower(('%' || :name|| '%')) `;

//     const binds={
//         criminal_id:criminal_id,
//         name:name,
//         case_id:case_id
//     }

//     return (await database.execute(sql, binds, database.options)).rows;
    
// }


async function getCriminalByCaseId(case_id){
    const sql =`SELECT C2.NAME, C2.INFO, C2.THANA, C2.DISTRICT, C2.DIVISION,F.F_CRIMI_ID, F.F_DATE
                FROM CASES C,FOUND_CRIMI F,CRIMINALS C2
                WHERE C.case_id=F.F_CASE_ID AND F.F_CRIMI_ID=C2.CRIMINAL_ID AND
                C.case_id=:case_id`;

    const binds={
        case_id:case_id
    }

    return (await database.execute(sql, binds, database.options)).rows;
    
}

async function getAllCriminals(){
    const sql =`SELECT * FROM Criminals`;

    const binds={
    }

    return (await database.execute(sql, binds, database.options)).rows;
    
}


async function getCriminalByName(name){
    const sql =`SELECT *
                FROM Criminals WHERE name=:name`;

    const binds={
        name:name
    }

    return (await database.execute(sql, binds, database.options)).rows;
    
}
async function getCriminalByLocation(location){
    const sql =`SELECT *
                FROM Criminals WHERE location=:location`;
    const binds={
        location:location
    }

    return (await database.execute(sql, binds, database.options)).rows;
    
}
async function getCriminalByLocationGroup(){
    const sql =`SELECT COUNT(*) TOTAL, C.DIVISION
                FROM Criminals C 
                GROUP BY C.DIVISION`;
    const binds={
        
    }

    return (await database.execute(sql, binds, database.options)).rows;
    
}


module.exports = {
    updateCriminal,
    getCriminalByLocationGroup,
    deleteCriminal,
    getAllCriminals,
    getCriminalByCaseId,
    getCriminalsByCriminalId,
    getCriminalByName,
    getCriminalByLocation
}