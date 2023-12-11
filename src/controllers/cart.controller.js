const { UUIDV4 } = require('sequelize');
const db = require('../models');
const Cart = db.Cart;
const Op = db.Sequelize.Op;
// Create and Save a new Tutorial
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: 'name can not be empty!',
    });
    return;
  }

  //   Create a Tutorial
  const dataCart = {
    name: req.body.name,
    price: req.body.price,
  };

  // Save Tutorial in the database
  try {
    let data = await Cart.create(dataCart);
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || 'Some error occurred while creating the Tutorial.',
    });
  }
};
// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
  let { limit, page, q = '' } = req.query;

  var name = q ? { name: { [Op.like]: `%${q}%` } } : null;
  if (limit && page) {
    try {
      let data = await Cart.findAndCountAll({
        where: name,
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
      let data = await Cart.findAll();
      res.send({ status: 'success', data: data });
    } catch (error) {
      res.status(500).send({
        message:
          error.message || 'Some error occurred while retrieving tutorials.',
      });
    }
  }
};
exports.findOne = async (req, res) => {
  let id = req.params.id;
  try {
    let data = await Cart.findByPk(id);
    res.send({ status: 'success', data: data });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || 'Some error occurred while retrieving tutorials.',
    });
  }
};

exports.deleteOne = async (req, res) => {
  let id = req.params.id;
  if (!id) {
    res.status(400).send({
      message: 'cardId can not be empty!',
    });
    return;
  }
  try {
    let data = await Cart.destroy({
      where: {
        cartId: id,
      },
    });
    res.send({ status: 'success', data: data });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || 'Some error occurred while retrieving tutorials.',
    });
  }
};

exports.deleteMulti = async (req, res) => {
  let { arrId = [] } = req.body;
  if (!arrId.length > 0) {
    res.status(400).send({
      message: 'cardId can not be empty!',
    });
    return;
  }
  try {
    let data = await Cart.destroy({
      where: {
        cartId: arrId,
      },
    });
    res.send({ status: 'success', data: data });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || 'Some error occurred while retrieving tutorials.',
    });
  }
};
