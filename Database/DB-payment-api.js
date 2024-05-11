const database = require('./database');

async function addPayment(client_id,case_id, p_obj){
    const sql =`BEGIN
    ADDPAYMENT(:client_id,:case_id,:t_id,:taka,:medium,:rating);
    END;`;

    const binds={
        case_id:case_id,
        client_id:client_id,
        t_id: p_obj.transId,
        taka:p_obj.amountGiven,
        medium: p_obj.medium,
        rating: p_obj.rating
    }
    return (await database.execute(sql, binds, database.options)).rows;
}
async function addCart(client_id, detective_id, case_id, taka){
    const sql =`BEGIN 
                ADDCART(:client_id, :detective_id, :case_id,:taka);
                END;`;

    const binds={
        case_id:case_id,
        client_id: client_id,
        detective_id:detective_id,
        taka:taka
    }
    return (await database.execute(sql, binds, database.options)).rows;
}



async function updatePayment(case_id,percentage){
    const sql =`UPDATE PAYMENT SET percentage=:percentage where case_id=:case_id`;

    const binds={
        case_id:case_id,
        percentage:percentage
    }
    await database.execute(sql, binds, database.options);
    return ;
}


async function deletePayment(case_id){
    const sql =`DELETE FROM Payment WHERE case_id=:case_id`;

    const binds={
        case_id: case_id
    }
    await database.execute(sql, binds, database.options);
    return ;
}

async function getPaymentByCaseId(case_id){
    const sql =`SELECT * FROM Payment NATURAL JOIN FILED_CASES
                WHERE case_id=:case_id`;

    const binds={
        case_id:case_id
    }

    return (await database.execute(sql, binds, database.options)).rows;
    
}
async function getCartCases(user_id){
    const sql =`SELECT *
            FROM Cart C, Cases C2
            WHERE C.C_CASE_ID = C2.CASE_ID AND (C.C_TO=:user_id OR 
            c.C_FROM = :user_id)`;

    const binds={
        user_id:user_id
    }

    return (await database.execute(sql, binds, database.options)).rows;
    
}
async function getCartPaidCases(user_id){
    const sql =`SELECT C.CASE_ID, C.TRANSID,C.AMOUNTGIVEN,C.MEDIUM,substr(To_char(c.P_DATE),1,10) PDATE
            FROM Payment C, Filed_Cases C2
            WHERE C.CASE_ID = C2.CASE_ID AND (C2.DETECTIVE_ID=:user_id)`;

    const binds={
        user_id:user_id
    }

    return (await database.execute(sql, binds, database.options)).rows;
    
}

async function getPaymentByDate(payment_date){
    const sql =`SELECT *
                FROM Payment  NATURAL JOIN FILED_CASES
                WHERE payment_date=:payment_date`;

    const binds={
        payment_date:payment_date
    }

    return (await database.execute(sql, binds, database.options)).rows;
    
}


async function getPaymentByMethod(method){
    const sql =`SELECT *
                FROM Payment  NATURAL JOIN FILED_CASES
                WHERE method=:method`;

    const binds={
        method:method
    }

    return (await database.execute(sql, binds, database.options)).rows;
    
}

async function getPaymentByCardNo(card_no){
    const sql =`SELECT *
                FROM Payment  NATURAL JOIN FILED_CASES
                WHERE card_no=:card_no`;

    const binds={
        card_no:card_no
    }

    return (await database.execute(sql, binds, database.options)).rows;
    
}

async function getAllPayments(){
    const sql =`SELECT * FROM Payment  NATURAL JOIN FILED_CASES`;

    const binds={
    }

    return (await database.execute(sql, binds, database.options)).rows;
    
}



async function getPaymentByDetectiveId(detective_id){
    const sql =`SELECT * FROM PAYMENT NATURAL JOIN FILED_CASES
                WHERE DETECTIVE_ID=:detective_id`;

    const binds={
        detective_id:detective_id
    }

    return (await database.execute(sql, binds, database.options)).rows;
    
}

module.exports = {
    addPayment,
    addCart,
    getCartCases,
    updatePayment,
    deletePayment,
    getAllPayments,
    getPaymentByCaseId,
    getPaymentByDate,
    getPaymentByMethod,
    getPaymentByCardNo,
    getPaymentByDetectiveId,
    getCartPaidCases
}