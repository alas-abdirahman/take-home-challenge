const express = require('express');
const beneficiaryController = require('../controllers/beneficiaryController');

const router = express.Router();

// GET /beneficiaries - Get all beneficiaries
router.get('/beneficiaries', beneficiaryController.getAllBeneficiaries);

// GET /beneficiaries/:id - Get a single beneficiary by ID
router.get('/get-beneficiary/:id', beneficiaryController.getBeneficiaryById);

// POST /beneficiaries - Create a new beneficiary
router.post('/create-beneficiary', beneficiaryController.createBeneficiary);

// PUT /beneficiaries/:id - Update an existing beneficiary
router.put('/update-beneficiary/:id', beneficiaryController.updateBeneficiary);

// DELETE /beneficiaries/:id - Delete an existing beneficiary
router.delete('/delete-beneficiary/:id', beneficiaryController.deleteBeneficiary);

module.exports = router;