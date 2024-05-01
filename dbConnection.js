const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ruthjepchumba:ktQvLKI6r1aWJJeW@cluster0.i4rocj1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

module.exports = mongoose;
