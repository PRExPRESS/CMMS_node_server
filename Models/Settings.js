const con = require('../Config/dbConnection');

// create Settings
const create = (settings)=>{
    const {
        updated_date, daily_occupancy, no_of_rooms, guest_nights, notice, all, eng, tech, sms
    }=settings;
    const values = [updated_date, daily_occupancy, no_of_rooms, guest_nights, notice, all, eng, tech, sms];
    const sql = `INSERT INTO settings(updated_date, daily_occupancy, no_of_rooms, guest_nights, notice, all, eng, tech, sms) 
    VALUES(?,?,?,?,?,?,?,?,?)`;
    return new Promise((resolve, reject)=>{
        con.query(sql,values,(err, result)=>{
            if(err){
                console.log(err);
                reject(err);
            }else{
                resolve(result);
            }

        })
    })
}
const update = (settings)=>{
    const {
        id,updated_date, daily_occupancy, no_of_rooms, guest_nights, notice, all, eng, tech, sms
    }=settings;
    const values = [updated_date, daily_occupancy, no_of_rooms, guest_nights, notice, all, eng, tech, sms];
    const sql = `UPDATE settings SET updated_date=?, daily_occupancy=?, no_of_rooms=?, guest_nights=?, notice=?, \`all\`=?, eng=?, tech=?, sms=? 
    WHERE id = ${id}`;

    return new Promise((resolve, reject)=>{
        con.query(sql,values,(err, result)=>{
            if(err){
                console.log(err);
                reject(err);
            }else{
                resolve(result);
            }

        })
    })
}

//get settings
const getSettings = ()=>{
    const sql =  `SELECT * FROM settings`
    return new Promise((resolve,reject)=>{
        con.query(sql,(err, result)=>{
            if(err){
                console.log(err);
                reject(err);
            }else{
                resolve(result);
            }
        })
    })
}

module.exports  = {
    create,
    update,
    getSettings
}