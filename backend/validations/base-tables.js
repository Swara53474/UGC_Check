const { body, validationResult } = require("express-validator");
const country = require("../schema/countries");

//Validate Base Tables
const baseTableValidateRules = () => {
  return [body("name").isLength({ min: 3, max: 20 })];
};

const validateBaseTables = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  } else {
    return res.status(400).json({ errors: errors.array() });
  }
};

//Validate Streams
const streamValidateRules = () => {
  return [
    body("name").isLength({ min: 3, max: 20 }),
    body("description").isLength({ min: 3, max: 100 }),
  ];
};

const validateStreams = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  } else {
    return res.status(400).json({ errors: errors.array() });
  }
};

//Validate Universities
const universityValidateRules = () => {
  return [body("name").isLength({ min: 5, max: 100 })];
};

const validateUniversities = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  } else {
    return res.status(400).json({ errors: errors.array() });
  }
};

//Validate Funding Agency
const fundingAgencyValidateRules = () => {
  return [
    body("name").isLength({ min: 3, max: 20 }),
    body("address").isLength({ min: 3, max: 50 }),
  ];
};

const validateFundingAgency = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  } else {
    return res.status(400).json({ errors: errors.array() });
  }
};

//Validate hei
const heiValidateRules = () => {
  return [
    body("name").isLength({ min: 3, max: 20 }),
    body("address").isLength({ min: 3, max: 50 }),
  ];
};

const validateHei = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  } else {
    return res.status(400).json({ errors: errors.array() });
  }
};

module.exports = {
  validateBaseTables,
  baseTableValidateRules,
  streamValidateRules,
  validateStreams,
  universityValidateRules,
  validateUniversities,
  fundingAgencyValidateRules,
  validateFundingAgency,
  heiValidateRules,
  validateHei,
};
