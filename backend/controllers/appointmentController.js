const config = require("../config/auth.config");
const db = require("../models");
const authJwt = require("../middlewares/authJwt")
const Appointment = db.appointment;
const Doctor = db.doctor;

exports.create=(req,res)=>{

  authJwt.verifyToken(req, res, () => {
    const userId = req.userId;

    //validate request
    if(!req.body){
        res.status(400).send({message:'Content cannot be empty'})
        return;
    }
    //new user
    const appointment=new Appointment({
        userID:userId,
        date:req.body.date
    })
  
    appointment.save((err, appointment) => {
    //save Doctor in the database
    if (req.body.DoctorID) {
      Doctor.find(
        {
          DoctorID: { $in: req.body.DoctorID },
        },
        (err, DoctorID) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          appointment.DoctorID = DoctorID.map((doc) => doc._id);
          appointment.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "Appointment was registered successfully!" });
          });
        }
      );
    } else {
      Doctor.findOne({ name:req.body.name  }, (err, doc) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        appointment.DoctorID = doc._id;
        appointment.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "appointment was registered successfully!" });
        });
      });
    }
  });
}); 
};

    //retrieve and return all Doctors/retrieve and return a single Appointment
    exports.find=(req,res)=>{
    if(req.query.id){
        const id=req.query.id;
        Appointment.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:"Not found Appointment with id "+id})
            }
            else{
         
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error retrieving Appointment with id "+id})
        })
    }
    else{
      Appointment.find()
        .then(appointment=>{
            res.send(appointment)
        })
        .catch(err=>{
            res.status(500).send({message:err.message|| "Error occured while retrieving Appointment information"})
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
    const upBodyDate=req.body.date
    let upBodyID;
    Doctor.findOne({ name:req.body.name  }, (err, doc) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
       upBodyID=doc._id;
      const upBody={
        DoctorID: upBodyID,
        date : upBodyDate  
      };
    
    
    Appointment.findByIdAndUpdate(id,upBody,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:"Cannot update appointment with ${id},Maybe Doctor not found"})
        }
        else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Error update appointment information"})
    })
  });
    }
    //delete Doctor by id
    exports.delete=(req,res)=>{
    const id=req.params.id;
    Appointment.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:"Cannot delete with id ${id}, Maybe id is wrong"})
        }
        else{
            res.send({
                message:"appointment was deleted successfully"
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:"Could not delete appointment with id ="+id
        })
    })
    }