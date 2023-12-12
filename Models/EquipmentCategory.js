const { promises } = require('nodemailer/lib/xoauth2');
const con = require('../Config/dbConnection');

// add department
const create = (eqp) => {
    const { category } = eqp;
    const value = [category];
    const sql = `INSERT INTO equip_category (category) VALUES (?)`;

    return new Promise((resolve, reject) => {
        con.query(sql, value, (err, result) => {
            if (err) {
                //console.error(err);
                reject({ error: 'Error inserting data' }); // Sending error response as JSON
            } else {
                resolve(result);
            }
        });
    });
};

//get all departments
const getAllEQCat=()=>{
    return new Promise((resolve,reject)=>{
        sql = "SELECT * FROM equip_category";
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
// edit department
const edit = (eqp)=>{
    //console.log(dep);
    const {id, department_name}= dep;
    const value = [department_name];
    console.log(value)
    const sql  = `UPDATE department SET department_name=? WHERE id = ${id}`;
    console.log(sql)
    return new Promise((resolve,reject)=>{
        con.query(sql,value,(err, result)=>{
            if(err){
                console.log(err)
                reject({error:'Update error'});
            }
            else{
                console.log(result)
                resolve(result);
            }
        })
    })
}

// get single dep
const getEqp=(id)=>{
    return new Promise((resolve,reject)=>{
        sql = `SELECT * FROM department WHERE id =${id}` ;
        
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

//delete department
const del=(id)=>{
    const sql = `DELETE FROM department WHERE id = ${id}`
    return new Promise((resolve,reject)=>{
        con.query(sql,(err, result)=>{
            if(err){
                reject(err)
            }else{
                resolve(result);
            }
        })
    })
}

module.exports = {
    create,
    getAllEQCat,
    edit,
    getEqp,
    del
}

