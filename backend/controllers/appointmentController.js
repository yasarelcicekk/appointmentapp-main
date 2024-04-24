const config = require("../config/auth.config");
const db = require("../models");
const authJwt = require("../middlewares/authJwt")
const Appointment = db.appointment;
const Doctor = db.doctor;

exports.create = async (req, res) => {
  try {
    // Validate request
    if (!req.body) {
      return res.status(400).send({ message: 'Content cannot be empty' });
    }

    // Find doctor
    const doctor = await Doctor.findOne({ doctorName: { $regex: new RegExp(req.body.doctorName, 'i') } });
    if (!doctor) {
      return res.status(500).send({ message: "Can't find doctor" });
    }

    // Create appointment
    const appointment = new Appointment({
      userID: req.body.userID,
      DoctorID: doctor._id,
      date: req.body.date
    });

    // Save appointment
    const savedAppointment = await appointment.save();
    if (!savedAppointment) {
      return res.status(500).send({ message: "Can't save appointment" });
    }

    // If doctorName is provided, find doctor and update appointment
    if (req.body.doctorName) {
      const doctor = await Doctor.findOne({ doctorName: { $regex: new RegExp(req.body.doctorName, 'i') } });
      if (!doctor) {
        return res.status(500).send({ message: "Can't find doctor" });
      }

      savedAppointment.DoctorID = doctor._id;
      await savedAppointment.save();
    } else {
      // If doctorName is not provided, find default doctor and update appointment
      const doctor = await Doctor.findOne({ doctorName: "Serkan" });
      if (!doctor) {
        return res.status(500).send({ message: "Can't find doctor" });
      }

      savedAppointment.DoctorID = doctor._id;
      await savedAppointment.save();
    }

    res.send({ message: "Appointment was registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
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

exports.findDoctorAppointments=(req,res)=>{
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

      //

exports.findUserAppointments=(req,res)=>{
  const userID = req.params.id;
  Appointment.find({ userID: userID })
  .populate('DoctorID')
    .then(data => {
      if(!data){
        res.status(404).send({message:"Not found Appointment with userID "+userID})
      }
      else{
        res.send(data)
      }
    })
    .catch(err => {
      res.status(500).send({message:"Error retrieving Appointment with userID "+userID})
    });         
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