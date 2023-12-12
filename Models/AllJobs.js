const con = require('../Config/dbConnection');

// create all jobs
const create = (reading)=>{
    const {job_id, created_date, insert_by, job_no, job_type, deadline, location, comments, status}= reading;
    const values = [job_id, created_date, insert_by, job_no, job_type, deadline, location, comments, status];

    const sql = `INSERT INTO all_jobs(job_id, created_date, insert_by, job_no, job_type, deadline, location, comments, status)
                VALUES(?,?,?,?,?,?,?,?,?)`;

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
const update = (job)=>{
    const {deadline,location,comments,id}=job;
    const value = [deadline,location,comments,id];
    const sql =`UPDATE all_jobs SET deadline=?,location=?,comments,id=? WHERE id=?`;

    return new Promise((resolve,reject)=>{
        con.query(sql,value,(err,result)=>{
            if(err){
                console.log(err);
                reject(err)
            }else{
                resolve(result)
            }
        });
    });
}
module.exports = {create,update}