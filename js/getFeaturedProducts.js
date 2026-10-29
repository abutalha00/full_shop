import { products } from "../db/products.js";

export const getProducts = (type, range) => {
  if (type === 'featured') {
    return products.filter(product => product.featured === true);
  }
  else if (type === 'all') {
    return products;
  }
  else if (type === 'price-range' && range) {
    const [minPrice, maxPrice] = range.split('-').map(Number);
    return products.filter(product => product.price >= minPrice && product.price <= maxPrice);
  }
}
