const mongoose = require('mongoose');
const mongoURL = 'mongodb+srv://HarshJain:Harsh%400207@gofood.umtrz.mongodb.net/GoFood?retryWrites=true&w=majority&appName=GoFood';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log("Connected to MongoDB");

        // Define the FoodItem schema and model
        const foodItemSchema = new mongoose.Schema({
            name: { type: String, required: true },
            price: { type: Number, required: true },
            // Add other fields as needed
        }, { collection: 'Food-items' }); // Specify the collection name for Food-items

        const FoodItem = mongoose.model('FoodItem', foodItemSchema);

        // Define a separate schema and model for FoodCategory
        const foodCategorySchema = new mongoose.Schema({
            categoryName: { type: String, required: true },
            // Add other fields as needed
        }, { collection: 'FoodCategory' }); // Specify the collection name for FoodCategory

        const FoodCategory = mongoose.model('FoodCategory', foodCategorySchema);

        // Fetch data from the Food-items collection
        const foodItemsData = await FoodItem.find();
        //console.log("Food items:", foodItemsData);

        // Fetch data from the FoodCategory collection
        const foodCategoryData = await FoodCategory.find();
        //console.log("Food categories:", foodCategoryData);

        // Store the results globally if needed
        global.Food_items = foodItemsData;
        global.FoodCategory = foodCategoryData;

    } catch (error) {
        console.error("Connection error:", error);
    }
};

module.exports = mongoDB;
