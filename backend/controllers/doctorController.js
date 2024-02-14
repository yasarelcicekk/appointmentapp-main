const config = require("../config/auth.config");
const db = require("../models");
const Doctor = db.doctor;


exports.create=(req,res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message:'Content cannot be empty'})
        return;
    }
    //new user
    const doctor=new Doctor({
        doctorName:req.body.doctorName,
        doctorLastname:req.body.doctorLastname,
        doctorSpecialty:req.body.doctorSpecialty,
    })
    //save Doctor in the database
    doctor
    .save(doctor)
    .then(data=>{
        //res.send(data)
        // res.redirect('/addDoctor')
        res.send({ message: "User was registered successfully!" });
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message||"Some error occured while creating a create operation"
        })
    })
    }
    //retrieve and return all Doctors/retrieve and return a single Doctor
    exports.find=(req,res)=>{
    if(req.query.id){
        const id=req.query.id;
        Doctor.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:"Not found Doctor with id "+id})
            }
            else{
         
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error retrieving Doctor with id "+id})
        })
    }
    else{
        Doctor.find()
        .then(doctor=>{
            res.send(doctor)
        })
        .catch(err=>{
            res.status(500).send({message:err.message|| "Error occured while retrieving Doctor information"})
        })
    }
        
    }
    //update Doctor by id
    exports.update=(req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message:"Data to update cannot be empty"})
    }
    const id=req.params.id;
    Doctor.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:"Cannot update Doctor with ${id},Maybe Doctor not found"})
        }
        else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Error update Doctor information"})
    })
    }
    //delete Doctor by id
    exports.delete=(req,res)=>{
    const id=req.params.id;
    Doctor.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:"Cannot delete with id ${id}, Maybe id is wrong"})
        }
        else{
            res.send({
                message:"Doctor was deleted successfully"
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:"Could not delete Doctor with id ="+id
        })
    })
    }