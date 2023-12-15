const con = require('../Config/dbConnection');

// create location
const create = (location)=>{
    const {
        location_type,
        room,
        floor_no,
        description
    }=location;
    const values = [
        location_type,
        room,
        floor_no,
        description
    ];
    const sql = `INSERT INTO location_manager(location_type,room,floor_no,description) 
    VALUES(?,?,?,?)`;
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

//get all locations
const getAllLoc = ()=>{
    const sql =  'SELECT * FROM location_manager ORDER BY `id` DESC';
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
// check is record exits
const isExits = async (data)=>{
    const {
        location_type,
        room,
        floor_no
       
    }=data;
    const values = [
        location_type,
        room,
        floor_no
    ];
    const sql = 'SELECT COUNT(*) AS recordCount FROM location_manager WHERE location_type=? AND room=? AND floor_no=?';
    return new Promise((resolve, reject)=>{
        con.query(sql,values,(err, result)=>{
            if(err){
                reject(err);
            }else{
                
                resolve(result[0].recordCount);
            }
        })
    })
}
//get  location
const getLoc = (id)=>{
    const sql =  `SELECT * FROM location_manager WHERE id = ${id}`
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

//get location by room name
const getLocByRoom = (room)=>{
    const sql =  `SELECT * FROM jobs WHERE location = '${room}' ORDER BY \`id\` DESC`
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
//update location
const update = (location)=>{
    const {
        id,
        location_type,
        room,
        floor_no,
        description
    }=location;
    const values = [
        location_type,
        room,
        floor_no,
        description
    ];
    const sql = `UPDATE location_manager SET location_type=?,room=?,floor_no=?,description=? WHERE id= ${id} `;
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

//delete department
const del=(id)=>{
    const sql = `DELETE FROM location_manager WHERE id = ${id}`
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
    isExits,
    getAllLoc,
    getLoc,
    update,
    del,
    getLocByRoom
}