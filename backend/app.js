const express = require('express');
const axios = require('axios');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.get('/products', async (req, res) => {
  try {

    const response = await axios.get('https://dummyjson.com/products');
    const products = response.data.products;

    // Structure the data to only return relevant fields
    const structuredProducts = products.map(product => ({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.thumbnail,
    }));

 
    res.json({ products: structuredProducts });
  } catch (error) {

    res.status(500).json({ error: 'Failed to fetch products. Please try again later.' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
