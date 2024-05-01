const Card = require('../Models/cardModel');

exports.getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.json({ statusCode: 200, data: cards, message: 'Success' });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

exports.createCard = async (req, res) => {
  try {
    const { title, image, link, description } = req.body;
    const newCard = new Card({ title, image, link, description });
    await newCard.save();
    res.status(201).json({ statusCode: 201, data: newCard, message: 'Card created successfully' });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};
