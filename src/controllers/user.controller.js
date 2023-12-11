const { UUIDV4 } = require('sequelize');
const db = require('../models');
const handleSuccess = require('../common/success');
const Users = db.Users;
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
      let data = await Users.findAll({
        include: [db.Roles],
      });
      res.send(handleSuccess(data));
    } catch (error) {
      res.status(500).send({
        message:
          error.message || 'Some error occurred while creating the Tutorial.',
      });
    }
  }
};
exports.getMe = async (req, res, next) => {
  let accId = req.params.accountId;

  if (!accId) {
    res.status(400).send({
      message: 'accountId can not be empty!',
    });
    return;
  }

  try {
    let data = await Users.findByPk(accId);
    res.send(handleSuccess(data));
  } catch (error) {
    res.status(500).send({
      message:
        error.message || 'Some error occurred while retrieving tutorials.',
    });
  }
};
exports.create = async (req, res) => {
  // // Validate request
  if (!req.body.password || !req.body.email || !req.body.userName) {
    res.status(400).send({
      message: 'can not be empty!',
      status: 'error',
      statusCode: 400,
    });
    return;
  }
  try {
    let data = await Users.findOne({
      where: { email: req.body.email },
    });

    if (data) {
      res.status(400).send({
        message: 'Người dùng đã tồn tại',
        status: 'error',
        statusCode: 400,
      });
      return;
    }
  } catch (error) {}
  //   Create a Tutorial
  const dataInfo = {
    password: req.body.password,
    userName: req.body.userName,
    email: req.body.email,
    roleKey: req.body.roleKey ? req.body.roleKey : 0,
  };
  // Save Tutorial in the database
  try {
    let data = await Users.create(dataInfo);
    res.send(handleSuccess(data));
  } catch (error) {
    res.status(500).send({
      message:
        error.message || 'Some error occurred while creating the Tutorial.',
    });
  }
};
