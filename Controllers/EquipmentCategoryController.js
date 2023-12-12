const EQP = require('../Models/EquipmentCategory.js');
const asyncHandler = require('express-async-handler');



//create department

const create = asyncHandler( async (req,res)=>{
    //console.log("fn trigger!")
    const {category}=req.body;
    const eqp = {category};

    try {
        const Dep = await EQP.create(eqp);
        const insertId = Dep.insertId;
        if(insertId){
            res.status(201).json({message:`inserted item id:${insertId}`});
        }else{
            res.status(400).json({message:`Data insertion error!`});
            console.log(Dep)
        }
            
    } catch (error) {
        res.status(500).json({message:`Server Error`});
    }
});

//get all departments

const getAllEQPC =asyncHandler(async (req,res)=>{
    console.log("fn ok")
    try {
        const response = await EQP.getAllEQCat();
        if(response.length>0)
            res.status(200).json(response);
        else{
            res.status(204).json({message:"table empty"});
        }
    } catch (error) {
        res.status(500).json({message:`Server Error`});
    }
});


//get all departments
const getEQPC =asyncHandler(async (req,res)=>{
    const id = req.params.id;
    try {
        const response = await EQP.getDep(id);
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
    const eqpCId = req.params.id;
    const {category}=req.body;
    const value = {id:eqpCId,category};
    //console.log("fn triggered ",id)
    try {
        const isCat = await EQP.getEqp(eqpCId);
        console.log(value)
        if(isCat.length>0){
            const response = await EQP.edit(value);
            if(response.affectedRows==1)
                res.status(200).json({message:"Updated successful"});
            else
            res.status(500).json({Error:"Server Error!"});
        }else
            res.status(404).json({message:"Equipment Category not Found"});
    } catch (error) {
        res.status(500).json({Error:"Internal Server Error!"});
    }

});

//update department
const del = asyncHandler(async (req,res)=>{
    const id = req.params.id;
    //console.log("fn triggered ",id)
    try {
        const isCat = await EQP.getEqp(id);
        //console.log(isdep)
        if(isCat.length>0){
            const response = await EQP.del(id);
            if(response.affectedRows==1)
                res.status(200).json({message:"Deleted successful"});
            else
            res.status(500).json({Error:"Server Error!"});
        }else
            res.status(404).json({message:"EQP category not Found"});
    } catch (error) {
        res.status(500).json({Error:"Internal Server Error!"});
    }

});


module.exports = {
    create,
    getAllEQPC,
    getEQPC,
    update,
    del
}