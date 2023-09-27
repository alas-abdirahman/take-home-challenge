const fs = require('fs');
const path = require('path');

const beneficiariesFilePath = path.join(__dirname, '../data/beneficiaries.json');

// Get all beneficiaries
exports.getAllBeneficiaries = (req, res) => {
  try {
    const data = fs.readFileSync(beneficiariesFilePath, 'utf8');
    const beneficiaries = JSON.parse(data);
    res.json(beneficiaries);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single beneficiary by ID
exports.getBeneficiaryById = (req, res) => {
  try {
    const beneficiaryId = parseInt(req.params.id);
    const data = fs.readFileSync(beneficiariesFilePath, 'utf8');
    const beneficiaries = JSON.parse(data);
    const beneficiary = beneficiaries.find((b) => b.id === beneficiaryId);

    if (!beneficiary) {
      return res.status(404).json({ error: 'Beneficiary not found' });
    }

    res.json(beneficiary);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new beneficiary
exports.createBeneficiary = (req, res) => {
  try {
    console.log(req.body);

    const { avatar, fullName, mobile, targetGroup } = req.body;

    const data = fs.readFileSync(beneficiariesFilePath, 'utf8');
    const beneficiaries = JSON.parse(data);

    const newId = beneficiaries.length > 0 ? beneficiaries[beneficiaries.length - 1].id + 1 : 1;

    const newBeneficiary = {
      id: newId,
      avatar,
      fullName,
      mobile,
      targetGroup,
    };

    beneficiaries.push(newBeneficiary);

    fs.writeFileSync(beneficiariesFilePath, JSON.stringify(beneficiaries), 'utf8');

    res.status(201).json(newBeneficiary);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update an existing beneficiary
exports.updateBeneficiary = (req, res) => {
  try {
    console.log(req.params.id);
    const beneficiaryId = parseInt(req.params.id);
    const { avatar, fullName, mobile, targetGroup } = req.body;

    const data = fs.readFileSync(beneficiariesFilePath, 'utf8');
    const beneficiaries = JSON.parse(data);

    const beneficiaryIndex = beneficiaries.findIndex((b) => b.id === beneficiaryId);

    if (beneficiaryIndex === -1) {
      return res.status(404).json({ error: 'Beneficiary not found' });
    }

    const updatedBeneficiary = {
      id: beneficiaryId,
      avatar,
      fullName,
      mobile,
      targetGroup,
    };

    beneficiaries[beneficiaryIndex] = updatedBeneficiary;

    fs.writeFileSync(beneficiariesFilePath, JSON.stringify(beneficiaries), 'utf8');

    res.json(updatedBeneficiary);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete an existing beneficiary
exports.deleteBeneficiary = (req, res) => {
  try {
    const beneficiaryId = parseInt(req.params.id);

    const data = fs.readFileSync(beneficiariesFilePath, 'utf8');
    const beneficiaries = JSON.parse(data);

    const beneficiaryIndex = beneficiaries.findIndex((b) => b.id === beneficiaryId);

    if (beneficiaryIndex === -1) {
      return res.status(404).json({ error: 'Beneficiary not found' });
    }

    beneficiaries.splice(beneficiaryIndex, 1);

    fs.writeFileSync(beneficiariesFilePath, JSON.stringify(beneficiaries), 'utf8');

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};