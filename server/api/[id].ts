export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  const products = {
    '1': { id: 1, name: 'Wireless Headphones', price: 79.99, description: 'High-quality wireless headphones with noise cancellation' },
    '2': { id: 2, name: 'Smart Watch', price: 199.99, description: 'Feature-rich smartwatch with health tracking' },
    '3': { id: 3, name: 'USB-C Cable', price: 19.99, description: 'Durable USB-C charging and data cable' },
  };

  const product = products[id as keyof typeof products];

  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' });
  }

  return product;
});
