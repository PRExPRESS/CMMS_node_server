const con = require('../Config/dbConnection');

// create meter reading
const create = (jobs)=>{
    const {insert_by,created_date,job_no,critical,floor_no,
        occupied,location,equipment,comments,photos,status,category,created_by}= jobs;
    const values = [insert_by,created_date,job_no,critical,floor_no,
        occupied,location,equipment,comments,photos,status,category,created_by];

    const sql = `INSERT INTO jobs(insert_by,created_date,job_no,critical,floor_no,
                occupied,location,equipment,comments,photos,status,category,created_by)
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`;

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

const getJobNo = ()=>{
    return new Promise((resolve,reject)=>{
        sql = "SELECT job_no FROM jobs ORDER BY id DESC LIMIT 1";
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
            reject(error)
        }
    });
}

//get all meter readings
const getAllJobs=()=>{
    return new Promise((resolve,reject)=>{
        sql = "SELECT * FROM jobs";
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
const getJob=(id)=>{
    return new Promise((resolve,reject)=>{
        sql = `SELECT * FROM jobs WHERE id =${id}` ;
        
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
const update = (jobs) => {
    const {critical,date,floor_no,location,equipment,comments,photos,id}= jobs;
    const values = [critical,date,floor_no,location,equipment,comments,photos,id];

    const sql = `UPDATE jobs SET critical=?,date=?,floor_no=?,location=?,equipment=?,comments=?,photos=?
                WHERE id = ?`;

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
};

// edit 
const edit = (jobs) => {
    const {deadline,asign_to,update_comments,update_cost,status,uploads,id}= jobs;
    const values = [deadline,asign_to,update_comments,update_cost,status,uploads,id];

    const sql = `UPDATE jobs SET deadline=?,asign_to=?,update_comments=?,update_cost=?,status=?,upload=?
                WHERE id = ?`;

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
};


//delete department
const del=(id)=>{
    const sql = `DELETE FROM jobs WHERE id = ${id}`;
    
    return new Promise((resolve,reject)=>{
        con.query(sql,(err, result)=>{
            if(err){
                reject(err)
            }else{
                resolve(result);
                
            }
        });
    });
    

    
}


module.exports = {create,getAllJobs,update,edit,getJob,del,getJobNo}