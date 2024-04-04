const express = require('express');
const cors = require('cors');
const errors = require('./middleware/error');
const product = require('./products/product.routes');
const category = require('./categories/category.routes');
const shop = require('./shops/shop.routes');
const shopkeeper = require('./shopkeepers/shopkeeper.routes');


const app = express();
const port = 3000;

app.use(cors()); // Add this line to enable CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errors.errorHandler);
app.use('/products', product);
app.use('/categories', category);
app.use('/shops', shop);
app.use('/shopkeepers', shopkeeper);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
