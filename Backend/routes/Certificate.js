const express = require("express");
const router = express.Router();
const Certificate = require("../models/Certificate");

// Create a new certificate entry
router.post("/applycertificate", async (req, res) => {
    const { name, email, domain } = req.body;
    console.log(name,email,domain);
    try {
        const existingCertificate = await Certificate.findOne({ email });
        if (existingCertificate) {
            return res.status(400).json({ error: "Certificate already exists for this email" });
        }
        const newCertificate = new Certificate({
            name, email, domain,
        });

        await newCertificate.save();
        res.status(201).json({ message: "Certificate added successfully", certificate: newCertificate });

    } catch (error) {
        console.error("Save Error:", error); 
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/getcertificate", async (req, res) => {
    try {
        const email = req.query.email;  
        if (!email) {
            return res.status(400).json({ error: "Email parameter is required" });
        }
        const certificate = await Certificate.findOne({ email: email });  // Find certificate by email
        if (!certificate) {
            return res.status(404).json({ error: "Certificate not found" });
        }
        res.json(certificate);  // Return the certificate if found
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});


module.exports = router;