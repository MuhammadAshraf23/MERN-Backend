import { products } from './constants/data.js'; 
import Product from './models/productSchema.js';

export const DefaultData = async () => {
    try {
        // Check if products already exist in the database
        const existingProducts = await Product.find({}); // Fetch all existing products
        if (existingProducts.length === 0) {
            // Insert multiple products if the database is empty
            await Product.insertMany(products);
            console.log('Products inserted successfully');
        } else {
            console.log('Products already exist in the database');
        }
    } catch (error) {
        console.error('Error inserting products:', error.message);
    }
};
