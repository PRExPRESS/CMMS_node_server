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
            res.status(201).json({message:'New record insert successful!'});
        }else{
            res.status(400).json({message:`Data insertion error!`});
            console.log(Dep)
        }
            
    } catch (error) {
        console.log(error)
        res.status(500).json({message:`Server Error`});
    }
});

//get all departments

const getAllEQPC =asyncHandler(async (req,res)=>{
    
    try {
        const response = await EQP.getAllEQCat();
        if(response.length>0)
            res.status(200).json(response);
        else{
            res.status(204).json({message:"table empty"});
        }
    } catch (error) {
        console.log(error);
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
        console.log(error)
        res.status(500).json({Error:"Internal Server Error!"});
    }

});

//delete category
const del = asyncHandler(async (req, res) => {
    const id = req.params.id;
  
    try {
      const isCat = await EQP.getEqp(id);
  
      if (isCat.length > 0) {
        const response = await EQP.del(id);
  
        const statusCode = response.affectedRows === 1 ? 200 : 500;
        const message =
          response.affectedRows === 1
            ? "Deleted successfully"
            : "Deletion failed. Server Error!";
  
        res.status(statusCode).json({ message });
      } else {
        res.status(404).json({ error: "EQP category not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  const getEqpByCat= asyncHandler(async(req,res)=>{
        const cat=req.params.cat;
        try {
            const response = await EQP.getEqpByCat(cat);
            if(Array.isArray(response)){
                res.status(200).json(response);
            }
            

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
        

  });


module.exports = {
    create,
    getAllEQPC,
    getEQPC,
    update,
    del,
    getEqpByCat
}