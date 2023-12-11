const { UUIDV4 } = require('sequelize');
const db = require('../models');
const handleSuccess = require('../common/success');
const Roles = db.Roles;
const Op = db.Sequelize.Op;
// Create and Save a new Tutorial

exports.getAll = async (req, res, next) => {
  let { limit, page, q = '' } = req.query;
  let userName = q ? { userName: { [Op.like]: `%${q}%` } } : null;
  let email = q ? { email: { [Op.like]: `%${q}%` } } : null;
  if (limit && page) {
    try {
      let data = await Users.findAndCountAll({
        where: { [Op.or]: [userName, email] },
        offset: Number(page) * Number(limit),
        limit: Number(limit),
      });

      res.send({
        status: 'success',
        data: data,
        page: Number(page),
        limit: Number(limit),
      });
    } catch (error) {
      res.status(500).send({
        message:
          error.message || 'Some error occurred while retrieving tutorials.',
      });
    }
  } else {
    try {
      let data = await Users.findAll();
      res.send(handleSuccess(data));
    } catch (error) {
      res.status(500).send({
        message:
          error.message || 'Some error occurred while creating the Tutorial.',
      });
    }
  }
};

exports.create = async (req, res) => {
  // // Validate request
  if (!req.body.roleKey || !req.body.roleValue) {
    res.status(400).send({
      message: 'can not be empty!',
      status: 'error',
      statusCode: 400,
    });
    return;
  }
  try {
    let data = await Roles.findOne({
      where: { roleKey: req.body.roleKey },
    });

    if (data) {
      res.status(400).send({
        message: 'Quyền đã tồn tại',
        status: 'error',
        statusCode: 400,
      });
      return;
    }
  } catch (error) {}
  //   Create a Tutorial
  const dataInfo = {
    roleValue: req.body.roleValue,
    roleKey: Number(req.body.roleKey),
  };
  // Save Tutorial in the database
  try {
    let data = await Roles.create(dataInfo);
    res.send(handleSuccess(data));
  } catch (error) {
    res.status(500).send({
      message:
        error.message || 'Some error occurred while creating the Tutorial.',
    });
  }
};
