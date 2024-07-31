import React, { useState } from 'react';
import { Container, Box, Grid, Card, CardMedia, CardContent, CardActions, Typography, Button, MenuItem, FormControl, Select, InputLabel } from '@mui/material';

const dummyData = [
  {
    url: 'https://plus.unsplash.com/premium_photo-1720823182783-3b9fb27e40d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8',
    productName: 'Product 1',
    productPrice: 29.99,
    productDesc: 'This is a description for product 1.',
    category: 'Electronics',
  },
  {
    url: 'https://images.unsplash.com/photo-1721633617180-97c67428a48e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8',
    productName: 'Product 2',
    productPrice: 49.99,
    productDesc: 'This is a description for product 2.',
    category: 'Books',
  },
  {
    url: 'https://images.unsplash.com/photo-1722169970002-794cbdd0fef7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D',
    productName: 'Product 3',
    productPrice: 19.99,
    productDesc: 'This is a description for product 3.',
    category: 'Clothing',
  },
  {
    url: 'https://images.unsplash.com/photo-1719937206220-f7c76cc23d78?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNnx8fGVufDB8fHx8fA%3D%3D',
    productName: 'Product 4',
    productPrice: 99.99,
    productDesc: 'This is a description for product 4.',
    category: 'Furniture',
  },
  {
    url: 'https://via.placeholder.com/150',
    productName: 'Product 5',
    productPrice: 99.99,
    productDesc: 'This is a description for product 5.',
    category: 'Electronics',
  },
  {
    url: 'https://via.placeholder.com/150',
    productName: 'Product 6',
    productPrice: 99.99,
    productDesc: 'This is a description for product 6.',
    category: 'Books',
  },
  {
    url: 'https://via.placeholder.com/150',
    productName: 'Product 7',
    productPrice: 99.99,
    productDesc: 'This is a description for product 7.',
    category: 'Clothing',
  },
];

const categories = [...new Set(dummyData.map(product => product.category))];

const priceRanges = [
  { label: '0-100', min: 0, max: 100 },
  { label: '100-200', min: 100, max: 200 },
  { label: '200-400', min: 200, max: 400 },
  { label: '400-1000', min: 400, max: 1000 },
  { label: 'Above 1000', min: 1000, max: Infinity }
];

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');

  const handleAddToCart = (productName) => {
    console.log(`${productName} added to cart`);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    console.log(`Category selected: ${category}`);
  };

  const handlePriceRangeChange = (event) => {
    const priceRange = event.target.value;
    setSelectedPriceRange(priceRange);
    console.log(`Price range selected: ${priceRange}`);
  };

  const filterProducts = (product) => {
    const categoryMatch = selectedCategory === '' || product.category === selectedCategory;
    const priceRange = priceRanges.find(range => range.label === selectedPriceRange);
    const priceMatch = selectedPriceRange === '' || (product.productPrice >= priceRange.min && product.productPrice < priceRange.max);

    return categoryMatch && priceMatch;
  };

  return (
    <Container>
      <Box my={4}>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
            label="Category"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="price-range-label">Price Range</InputLabel>
          <Select
            labelId="price-range-label"
            id="price-range-select"
            value={selectedPriceRange}
            onChange={handlePriceRangeChange}
            label="Price Range"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {priceRanges.map((range, index) => (
              <MenuItem key={index} value={range.label}>
                {range.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Grid container spacing={4}>
          {dummyData
            .filter(filterProducts)
            .map((product, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    height="150"
                    image={product.url}
                    alt={product.productName}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.productName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.productDesc}
                    </Typography>
                    <Typography variant="h6" component="div">
                      ${product.productPrice.toFixed(2)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => handleAddToCart(product.productName)}>
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default HomePage;


//node js:
// exports.getProducts = async (req, res) => {
//     try {
//       const { category, minPrice, maxPrice } = req.query;
//       const query = {};
  
//       if (category) {
//         query.category = category;
//       }
  
//       if (minPrice && maxPrice) {
//         query.productPrice = { $gte: Number(minPrice), $lte: Number(maxPrice) };
//       } else if (minPrice) {
//         query.productPrice = { $gte: Number(minPrice) };
//       } else if (maxPrice) {
//         query.productPrice = { $lte: Number(maxPrice) };
//       }
  
//       const products = await Product.find(query);
//       res.status(200).json(products);
//     } catch (error) {
//       res.status(500).json({ message: 'Server error', error });
//     }
//   };

//example url :http://your-domain.com/api/products?category=CategoryName&minPrice=MinimumPrice&maxPrice=MaximumPrice