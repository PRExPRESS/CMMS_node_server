const con = require('../Config/dbConnection');

// create meter reading
const create = (reading)=>{
    const {code_no,name, category,description,room_no,picture,user_manuals,
        start_date,last_date,next_date,frequency}= reading;
    const values = [code_no,name, category,description,room_no,picture,user_manuals,
        start_date,last_date,next_date,frequency];

    const sql = `INSERT INTO equipment(code_no,name, category,description,room_no,picture,user_manuals,
        start_date,last_date,next_date,frequency)
                VALUES(?,?,?,?,?,?,?,?,?,?,?)`;

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
        sql = "SELECT * FROM equipment";
        try {
            con.query(sql,(err,result)=>{
                if(err){
                    console.log(err)
                    reject(err);
                }else{
                    //console.log(result);
                    resolve(result);
                }
            })
        } catch (error) {
            
        }
    });
}
// get single reading
const getReading=(id)=>{
    return new Promise((resolve,reject)=>{
        sql = `SELECT * FROM equipment WHERE id =${id}` ;
        
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
    const {code_no,name, category,description,room_no,picture,user_manuals,
        start_date,last_date,next_date,frequency,id}= reading;
    const values = [code_no,name, category,description,room_no,picture,user_manuals,
        start_date,last_date,next_date,frequency,id];

    const sql1 = `UPDATE equipment SET code_no=?,name=?, category=?,description=?,room_no=?,picture=?,user_manuals=?,
    start_date=?,last_date=?,next_date=?,frequency=? WHERE id=?`;

    return new Promise((resolve, reject) => {
        con.query(sql1, values, (err, result) => {
            
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

    

    
};


//delete department
const del=(id)=>{
    const sql = `DELETE FROM equipment WHERE id = ${id}`;
    
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


module.exports = {create,getAllReadings,update,getReading,del}