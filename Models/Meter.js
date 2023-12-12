const con = require('../Config/dbConnection');

// create meter reading
const create = (reading)=>{
    const {meter_code, floor_no, created_date, time, description, create_by}= reading;
    const values = [meter_code, floor_no, created_date, time, description, create_by];

    const sql = `INSERT INTO meter(meter_code, floor_no, created_date, time, description, create_by)
                VALUES(?,?,?,?,?,?)`;

    return new Promise((resolve,reject)=>{
        con.query(sql,values,(err,result)=>{
            if(err){
                console.log(err);
                reject(err)
            }else{
                resolve(result)
            }
        });
    });
}

// create meter job
const createMeterJob = (reading)=>{
    const {meter_job_no,meter_code, floor_no, created_date, time, description, create_by,meter_id}= reading;
    const values = [meter_job_no,meter_code, floor_no, time, created_date, description, create_by,meter_id];

    const sql = `INSERT INTO meter_job(meter_job_no, meter_code, floor_no, time,created_date, description, create_by,meter_id)
                VALUES(?,?,?,?,?,?,?,?)`;

    return new Promise((resolve,reject)=>{
        con.query(sql,values,(err,result)=>{
            if(err){
                console.log(err);
                reject(err)
            }else{
                resolve(result)
            }
        });
    });
}

//get all meter readings
const getAllReadings=()=>{
    return new Promise((resolve,reject)=>{
        sql = "SELECT * FROM meter";
        try {
            con.query(sql,(err,result)=>{
                if(err){
                    console.log(err)
                    reject(err);
                }else{
                    //console.log(result);
                    resolve(result)
                }
            })
        } catch (error) {
            
        }
    });
}
// get single reading
const getReading=(id)=>{
    return new Promise((resolve,reject)=>{
        sql = `SELECT * FROM meter WHERE id =${id}` ;
        
        con.query(sql,(err,result)=>{
            if(err){
                //console.log(err)
                reject(err);
            }else{
                //console.log(result);
                resolve(result)
            }
        })
        
    });
}

// update meter reading
const update = (reading) => {
    const { id, meter_code, floor_no, time, description } = reading;
    const values = [meter_code, floor_no, time, description, id];

    const sql1 = `UPDATE meter SET meter_code=?, floor_no=?, time=?, description=? WHERE id=?`;

    return new Promise((resolve, reject) => {
        con.query(sql1, values, (err, result) => {
            console.log("query 1 exec")
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

    

    
};
const updateMeterJob = (reading)=>{
    const { id, meter_code, floor_no, time, description } = reading;
    const values = [meter_code, floor_no, time, description, id];
    const sql2 = `UPDATE meter_job SET meter_code=?, floor_no=?, time=?, description=? WHERE meter_id=?`;
    return new Promise((resolve, reject) => {
        con.query(sql2, values, (err, result) => {
            console.log("query 2 exec")
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

//delete department
const del=(id)=>{
    const sql = `DELETE FROM meter WHERE id = ${id}`;
    const sql1 = `DELETE FROM meter_job WHERE meter_id = ${id}`;
    return new Promise((resolve,reject)=>{
        con.query(sql,(err, result)=>{
            if(err){
                reject(err)
            }else{
                resolve(result);
                con.query(sql1,(err1, result1)=>{
                    if(err1){
                        reject(err1)
                    }else{
                        resolve(result1);
                    }
                });
            }
        });
    });
    

    
}


module.exports = {create, createMeterJob,getAllReadings,update,getReading,updateMeterJob,del}