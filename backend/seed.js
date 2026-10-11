require("dotenv/config");

const mongoose = require("mongoose");
const Product = require("./model/ProductModal");
const Category = require("./model/CatModal");
const catalog = require("../frontend/src/components/shop-items/shop-data.json");

async function seedCatalog() {
  if (!process.env.DB_CONNECTION) {
    throw new Error("DB_CONNECTION is missing from backend/.env");
  }

  await mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const currentProducts = await Product.countDocuments();
  if (currentProducts > 0) {
    console.log(
      `Found ${currentProducts} existing product categories; leaving them unchanged.`
    );
    return;
  }

  for (const category of catalog) {
    await Category.updateOne(
      { name: category.title },
      { $setOnInsert: { name: category.title } },
      { upsert: true }
    );
  }

  const productCategories = catalog.map(({ title, routeName, items }) => ({
    title,
    routeName,
    items: items.map(({ name, imageUrl, price }) => ({
      name,
      imageUrl,
      price: String(price),
    })),
  }));

  await Product.insertMany(productCategories);
  console.log(
    `Added ${catalog.length} categories and ${catalog.reduce(
      (total, category) => total + category.items.length,
      0
    )} sample products.`
  );
}

seedCatalog()
  .catch((error) => {
    console.error("Catalog seed failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  });
