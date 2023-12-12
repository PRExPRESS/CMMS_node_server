const Department = require('../Models/Department.js');

const asyncHandler = require('express-async-handler');



//create department

const createDepartment = asyncHandler( async (req,res)=>{
    console.log("fn trigger!")
    const {department_name}=req.body;
    const dep = {department_name};

    try {
        const Dep = await Department.createDep(dep);
        const insertId = Dep.insertId;
        if(insertId){
            res.status(201).json({message:"New Department Inserted!"});
        }else{
            res.status(400).json({message:`Data insertion error!`});
            console.log(Dep)
        }
            
    } catch (error) {
        res.status(500).json({message:`Server Error`});
    }
});

//get all departments

const getAllDeps =asyncHandler(async (req,res)=>{
    console.log("fn ok")
    try {
        const response = await Department.getAllDeps();
        if(response.length>0)
            res.status(200).json(response);
        else{
            res.status(400).json({message:"table empty"});
        }
    } catch (error) {
        res.status(500).json({message:`Server Error`});
    }
});


//get all departments
const getDep =asyncHandler(async (req,res)=>{
    const id = req.params.id;

    try {
        const response = await Department.getDep(id);
        if(response.length>0)
            res.status(200).json(response);
        else{
            res.status(404).json({message:"department not Found"});
        }
    } catch (error) {
        res.status(500).json({message:`Server Error`});
    }
});


//update department
const update = asyncHandler(async (req,res)=>{
    const depId = req.params.id;
    const {department_name}=req.body;
    const value = {id:depId,department_name};
    //console.log("fn triggered ",id)
    try {
        const isdep = await Department.getDep(depId);
        console.log(value)
        if(isdep.length>0){
            const response = await Department.edit(value);
            if(response.affectedRows==1)
                res.status(200).json({message:"Updated successful"});
            else
            res.status(500).json({Error:"Server Error!"});
        }else
            res.status(404).json({message:"department not Found"});
    } catch (error) {
        res.status(500).json({Error:"Internal Server Error!"});
    }

});

//update department
const del = asyncHandler(async (req,res)=>{
    const id = req.params.id;
    //console.log("fn triggered ",id)
    try {
        const isdep = await Department.getDep(id);
        console.log(isdep)
        if(isdep.length>0){
            const response = await Department.del(id);
            if(response.affectedRows==1)
                res.status(200).json({message:"Deleted successful"});
            else
            res.status(500).json({Error:"Server Error!"});
        }else
            res.status(404).json({message:"department not Found"});
    } catch (error) {
        res.status(500).json({Error:"Internal Server Error!"});
    }

});


module.exports = {
    createDepartment,
    getAllDeps,
    getDep,
    update,
    del
}