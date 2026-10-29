import { createServer } from 'http';
import { getProducts } from './getFeaturedProducts.js';

const server = createServer((req, res) => {

  console.log(`Request received: ${req.method} ${req.url}`);

  if (req.method === 'GET' && req.url === '/featured') {
    const featured = getProducts('featured');

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(featured));
  }
  else if (req.method === 'GET' && req.url === '/products' || req.url === '/') {
    const products = getProducts('all')

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(products));
  }
  else if (req.method === 'GET' && req.url.startsWith('/price-range')) {
    const [minPrice, maxPrice] = req.url.split('/').at(-1).split('-').map(Number);
    const productsInRange = getProducts('price-range', `${minPrice}-${maxPrice}`);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(productsInRange));
  }
  else {
    res.statusCode = 404;
    res.end('Not Found');
  }


})

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
