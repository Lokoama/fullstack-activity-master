const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Product = require('./models/Product');
const cors = require('cors')


mongoose.connect('mongodb+srv://thegingerjad:motdepasse@cluster0.nff6ddq.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  app.use(express.json());

  app.use(cors())

  app.get('/api/products', (req, res, next) => {
    Product.find()
      .then(products => res.status(200).json(products))
      .catch(error => res.status(400).json({ error }));
  });

  app.get('/api/products/:id', (req, res, next) => {
    Product.findOne({ _id: req.params.id })
      .then(product => res.status(200).json(product))
      .catch(error => res.status(404).json({ error }));
  });

  app.post('/api/products', (req, res, next) => {
   // delete req.body._id;
    const product = new Product({
        
        "name": "canap",
        "description": "Ceci est une desritpion",
        "price": 127,
        "inStock": true
        
    });
    product.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  });

  app.put('/api/product/:id', (req, res, next) => {
    Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'modified'}))
      .catch(error => res.status(400).json({ error }));
  });

  app.delete('/api/product/:id', (req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'deleted !'}))
      .catch(error => res.status(400).json({ error }));
  });


module.exports = app;