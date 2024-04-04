// Import the necessary modules
const { DataTypes } = require("sequelize");

// Define and export the Shop model
module.exports = (sequelize, models) => {
  const Shop = sequelize.define(
    "Shop",
    {
      shop_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      shop_name: { type: DataTypes.STRING, allowNull: false },
      shop_owner: { type: DataTypes.STRING, allowNull: false },
      address: { type: DataTypes.STRING, allowNull: false },
      city: { type: DataTypes.STRING, allowNull: false },
      state: { type: DataTypes.STRING, allowNull: false },
      country: { type: DataTypes.STRING, allowNull: false },
      pincode: { type: DataTypes.STRING, allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
    },
    {
      tableName: "shop", // Specify the table name
      timestamps: false, // Disable timestamps
      underscored: true, // Use underscored naming for fields
    }
  );

  // Define relationships or associations with other models using the models object
  // Shop.hasMany(models.Shopkeepers, { foreignKey: 'shop_id' });
  // Shop.hasMany(models.Categories, { foreignKey: 'shop_id' });
  // Shop.hasMany(models.Products, { foreignKey: 'shop_id' });

  return Shop;
};
