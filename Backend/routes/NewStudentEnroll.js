const express = require('express');
const router = express.Router();
const NewEnrollStudent = require('../models/NewStudentEnroll');
const CreateCourse = require("../models/CreateCourse");
const mongoose = require('mongoose');
// post request to post all the new student enroll
router.post("/newstudentenroll", async (req, res) => {
  const { fullname,email,phone,program,counselor,domain,programPrice,paidAmount,monthOpted,clearPaymentMonth,operationName, operationId , transactionId, alternativeEmail, modeofpayment } = req.body; 
  // console.log("data coming from frontend" , req.body)
  try {
    const course = await CreateCourse.findOne({ title: domain });
    // console.log("coures found" , course)

    const newStudent = new NewEnrollStudent({
        fullname,email,alternativeEmail,phone,program,counselor,domain,programPrice,paidAmount,monthOpted,clearPaymentMonth,operationName,modeofpayment, transactionId, operationId, status: "booked", domainId: course._id,
    });

    // console.log("data saved", newStudent);
    await newStudent.save();3
    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
}); 

// GET request to retrieve all new student enroll
router.get("/getnewstudentenroll", async (req, res) => {
  const { studentenrollid } = req.query;
  try {
    let StudentEnroll;
    if (studentenrollid) {
      // Fetch specific operation by userId
      StudentEnroll = await NewEnrollStudent.findById(studentenrollid);
      if (!StudentEnroll) {
        return res.status(404).json({ message: "Student Eroll not found for the given userId" });
      }
    } else {
      StudentEnroll = await NewEnrollStudent.find().sort({ _id: -1 });
    }
    res.status(200).json(StudentEnroll);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching data", error: error.message });
  }
});

// Handle POST request to update remark for an existing student
router.post("/updateremark", async (req, res) => {
  const { remark, studentId } = req.body;
  try {
    const existingStudent = await NewEnrollStudent.findById(studentId);
    if (!existingStudent) {
      return res.status(404).json({ error: "Student not found." });
    }
    existingStudent.remark.push(remark);
    await existingStudent.save();
    return res.status(200).json({ message: "Remark added successfully!" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error. Please try again later." });
  }
});

// Handle PUT request to update student details
router.put("/editstudentdetails/:_id", async (req, res) => {
  const { _id } = req.params;
  const { fullname, email,alternativeEmail, phone, program, counselor, domain, programPrice, paidAmount, monthOpted, clearPaymentMonth } = req.body;

  try {
    // Check if domain has changed
    let domainId = null;
    if (domain) {
      // Fetch the domainId based on the domain name
      const foundDomain = await CreateCourse.findOne({ title: domain }); // assuming domain field is 'name'
      if (foundDomain) {
        domainId = foundDomain._id;
      } else {
        return res.status(404).json({ message: "Domain not found" });
      }
    }

    // Update the student details including domainId
    const studentData = await NewEnrollStudent.findByIdAndUpdate(
      _id,
      {
        fullname,
        email,
        alternativeEmail,
        phone,
        program,
        counselor,
        domain,
        domainId, 
        programPrice,
        paidAmount,
        monthOpted,
        clearPaymentMonth,
      },
      { new: true }
    );

    if (!studentData) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(studentData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// handle post request to update the student's status and edit access
router.post("/updateStudentStatus", async (req, res) => {
  const { studentId, status } = req.body;
  try {
    const student = await NewEnrollStudent.findById(studentId);
    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }
    if (status) {
      student.status = status;
    }
    await student.save();
    res.status(200).send({ message: "Student updated successfully", student });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).send({ message: "Server error" });
  }
});

// GET request to retrieve all enroll data with course
router.get("/enrollments", async (req, res) => {
  try {
    // Fetch all enrollments
    const enrollments = await NewEnrollStudent.find().lean();

    // Iterate over enrollments and replace domainId with course data
    const updatedEnrollments = await Promise.all(
      enrollments.map(async (enrollment) => {
        if (enrollment.domainId) {
          const course = await CreateCourse.findById(enrollment.domainId).lean();
          enrollment.domain = course || null; // Replace domainId with course data
        }
        return enrollment;
      })
    );

    res.status(200).json(updatedEnrollments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch enrollments", error });
  }
});

//post request to update the operation name and id from admin panel 
router.post('/update-operation/:id', async (req, res) => {
  try {
    const { operationName, operationId } = req.body;
    const { id } = req.params;
   const objectId = new mongoose.Types.ObjectId(id);
    const updatedItem = await NewEnrollStudent.findByIdAndUpdate(
     { _id : objectId},
      {
       operationName: operationName,
        operationId: operationId,
      },
      { new: true }
    );
    if (updatedItem) {
      res.status(200).json({ message: 'Operation updated successfully' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating operation', error });
  }
});

module.exports = router;