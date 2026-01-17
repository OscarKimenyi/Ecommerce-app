import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";
import Product from "./models/Product.js";

dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected");

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
      isAdmin: true,
    });

    // Create regular user
    const regularUser = await User.create({
      name: "John Doe",
      email: "john@example.com",
      password: hashedPassword,
      isAdmin: false,
    });

    console.log("👥 Users created");

    // Create sample products
    const products = [
      {
        name: "iPhone 15 Pro",
        price: 999.99,
        description: "Latest iPhone with advanced camera system",
        image:
          "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500",
        brand: "Apple",
        category: "Electronics",
        countInStock: 10,
        user: adminUser._id,
      },
      {
        name: "Samsung Galaxy S23",
        price: 799.99,
        description: "Powerful Android smartphone",
        image:
          "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500",
        brand: "Samsung",
        category: "Electronics",
        countInStock: 15,
        user: adminUser._id,
      },
      {
        name: "Nike Air Max 270",
        price: 149.99,
        description: "Comfortable running shoes",
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        brand: "Nike",
        category: "Sports",
        countInStock: 25,
        user: adminUser._id,
      },
      {
        name: "MacBook Pro 14-inch",
        price: 1999.99,
        description: "Professional laptop with M3 Pro chip",
        image:
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
        brand: "Apple",
        category: "Electronics",
        countInStock: 5,
        user: adminUser._id,
      },
    ];

    await Product.insertMany(products);
    console.log("📦 Products created");

    console.log("✅ Database seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedData();
