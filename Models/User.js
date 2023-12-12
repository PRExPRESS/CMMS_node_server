const mysql = require('mysql');
const con = require('../Config/dbConnection');

const create = (user, callback) => {
    
    const {
        user_type,
        department,
        email,
    } = user;

    const sql = "INSERT INTO user (status,user_type, departments, email) VALUES (?,?,?,?)";
    const values = ['pending',user_type, department, email, ];

    con.query(sql, values, (err, result) => {
        if (err) {
            callback(err, null); // Pass the error to the callback
        } else {
            callback(null, result.insertId); // Pass the insertId to the callback
        }
    });
};
const createUserAccount = (user, callback) => {
    
    
    const uid= user[0];
    const status=user[1];
    const name=user[2];
    const sap=user[3];
    const contact=user[4];
    const username=user[5];
    const password=user[6];
    const picture=user[7];
    

    const sql = "UPDATE user SET status=?, name=?, tel_no=?, sap=?, user_name=?, password=?, picture=? WHERE id=?";
    const values = [status, name, sap, contact, username, password, picture, uid];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.log("Error:", err);
            callback(err, null); // Pass the error to the callback
        } else {
            
            callback(null, result.affectedRows); // Pass the affectedRows to the callback
        }
    });
};


const checkUserEmail = (email) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM user WHERE email = ?";
        con.query(sql, [email], (err, result) => {
            if (err) {
                reject(err);
            } else {

                resolve(result.length > 0); // Resolve with true if email is taken, false otherwise
            }
        });
    });
};

const checkUsername = (username) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM user WHERE user_name = ?";
        con.query(sql, [username], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.length > 0); // Resolve with true if username is taken, false otherwise
            }
        });
    });
};
const createUserPrivileges = (userPrivileges)=>{
    const {
        user_id,job_add,job_edit,job_view,
            dep_add,dep_edit,dep_view,loc_add,loc_edit,
            loc_view,rost_add, rost_edit, rost_view, 
            meter_add,meter_edit,meter_view, setting, 
            cat_add, cat_edit, cat_view, eqp_add, eqp_edit,
            eqp_view, super_up, admin_up, tech_up, user_up, user_view,
            pending_job, complete_job, cancel_job, total_job,
            jobcomplete_technician, floorwise_job, departwise_job,
            holdpm_work, completepm_work,upcomingpm_work
    }=userPrivileges;
    sql = `
    INSERT INTO user_privileges(
        user_id, job_add, job_edit, job_view,
        dep_add, dep_edit, dep_view, loc_add, loc_edit,
        loc_view, rost_add, rost_edit, rost_view, 
        meter_add, meter_edit, meter_view, setting, 
        cat_add, cat_edit, cat_view, eqp_add, eqp_edit,
        eqp_view, super_up, admin_up, tech_up, user_up, user_view,
        pending_job, complete_job, cancel_job, total_job,
        jobcomplete_technician, floorwise_job, departwise_job,
        holdpm_work, completepm_work, upcomingpm_work
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?);
    
    `
    const values=[
            user_id,job_add,job_edit,job_view,
            dep_add,dep_edit,dep_view,loc_add,loc_edit,
            loc_view,rost_add, rost_edit, rost_view, 
            meter_add,meter_edit,meter_view, setting, 
            cat_add, cat_edit, cat_view, eqp_add, eqp_edit,
            eqp_view, super_up, admin_up, tech_up, user_up, user_view,
            pending_job, complete_job, cancel_job, total_job,
            jobcomplete_technician, floorwise_job, departwise_job,
            holdpm_work, completepm_work,upcomingpm_work
    ];
    try {
        new Promise((resolve,reject)=>{
            con.query(sql,values,(err,result)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(result.affectedRows);
                }
            })
        })
    } catch (error) {
        console.error(error);
        
    }
}

//get all users
const getAllUsers=()=>{
    return new Promise((resolve,reject)=>{
        sql = "SELECT * FROM user";
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

//user login
const userLogin = (username) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM user WHERE user_name = ?";
        con.query(sql, [username], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result); 
            }
        });
    });
};

//get single user
const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM user WHERE id = ?";
        con.query(sql, [id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result); 
            }
        });
    });
};

//edit user
const editUser = (user)=>{
    
    const {
        user_id,
        user_type,
        name,
        sap,
        departments,
        email,
        tel_no,
        picture,
        job_add,job_edit,job_view,
        dep_add,dep_edit,dep_view,loc_add,loc_edit,
        loc_view,rost_add, rost_edit, rost_view, 
        meter_add,meter_edit,meter_view, setting, 
        cat_add, cat_edit, cat_view, eqp_add, eqp_edit,
        eqp_view, super_up, admin_up, tech_up, user_up, user_view,
        pending_job, complete_job, cancel_job, total_job,
        jobcomplete_technician, floorwise_job, departwise_job,
        holdpm_work, completepm_work,upcomingpm_work
    } = user;
    
    return new Promise((resolve, reject)=>{
        const sql = `UPDATE user SET user_type=?, name=?,sap=?, departments=?, email=?, tel_no=?, picture=? WHERE id=${user_id}`;
        const sql2 = `
        UPDATE user_privileges SET 
        job_add=?,job_edit=?,job_view=?,dep_add=?,dep_edit=?,dep_view=?,loc_add=?,loc_edit=?,
        loc_view=?,rost_add=?,rost_edit=?,rost_view=?,meter_add=?,meter_edit=?,meter_view=?,setting=?,
        cat_add=?,cat_edit=?,cat_view=?,eqp_add=?,eqp_edit=?,eqp_view=?,super_up=?,admin_up=?,tech_up=?,
        user_up=?,user_view=?,pending_job=?,complete_job=?,cancel_job=?,total_job=?,jobcomplete_technician=?,
        floorwise_job=?,departwise_job=?,holdpm_work=?,completepm_work=?,upcomingpm_work=? 
        WHERE user_id=${user_id}
        `
        const userData = [ user_type, name, sap, departments, email, tel_no,picture];
        const userPriv = [
            job_add,job_edit,job_view,
            dep_add,dep_edit,dep_view,loc_add,loc_edit,
            loc_view,rost_add, rost_edit, rost_view, 
            meter_add,meter_edit,meter_view, setting, 
            cat_add, cat_edit, cat_view, eqp_add, eqp_edit,
            eqp_view, super_up, admin_up, tech_up, user_up, user_view,
            pending_job, complete_job, cancel_job, total_job,
            jobcomplete_technician, floorwise_job, departwise_job,
            holdpm_work, completepm_work,upcomingpm_work
        ]
        console.log(userPriv)
        let isError = false;
        try {
            con.query(sql, userData, (err, result) => {
                if (err) {
                    console.log("error 1: ", err);
                    reject(err);
                } else {
                    con.query(sql2, [...userPriv, user_id], (err2, result2) => {
                        if (err2) {
                            console.log("error 2: ", err2);
                            reject(err2); // Reject the promise if there's an error in the second query
                        } else {
                            resolve(result.affectedRows); // Resolve the promise with the result of the second query
                        }
                    });
                }
            });
            
        } catch (error) {
            console.log("Error:",error)
        }
        
    })
}

//change password
const changePassword = (data) => {
    
    const {userId, password} = data; // Check if data is an array

    const values = [password, userId]; // Reorder values if needed

    const sql = 'UPDATE user SET password=? WHERE id=?';

    return new Promise((resolve, reject) => {
        try {
            con.query(sql, values, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result.affectedRows);
            });
        } catch (error) {
            return error;
        }
    });
}

//change status
const changeStatus =(data)=>{
    const {userId, status} = data; // Check if data is an array

    const values = [status, userId]; // Reorder values if needed

    const sql = 'UPDATE user SET status=? WHERE id=?';

    return new Promise((resolve, reject) => {
        try {
            con.query(sql, values, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result.affectedRows);
            });
        } catch (error) {
            return error;
        }
    });
}

// get inactive users
const inactive=()=>{
    return new Promise((resolve,reject)=>{
        sql = "SELECT * FROM user WHERE status='inactive'";
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
            console.error(error);
            reject(error.message);
        }
    });
}

// get only technicians 
const getTech=()=>{
    return new Promise((resolve,reject)=>{
        sql = "SELECT * FROM user WHERE user_type='Technician'";
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
            console.error(error);
            reject(error.message);
        }
    });
}

module.exports = {
    create,
    createUserPrivileges,
    createUserAccount,
    checkUserEmail,
    checkUsername,
    getAllUsers,
    userLogin,
    getUser,
    editUser,
    changePassword,
    changeStatus,
    inactive,
    getTech
};
