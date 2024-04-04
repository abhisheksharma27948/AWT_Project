// Import Sequelize and the necessary data types
const { DataTypes } = require("sequelize");

// Define and export the Shop model
module.exports = (sequelize) => {
  const Shopkeepers = sequelize.define(
    "Shopkeepers",
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
      tableName: "Shopkeepers", // Specify the table name
      timestamps: false, // Disable timestamps
      underscored: true, // Use underscored naming for fields
    }
  );

  // Define associations if needed
  // Shop.hasMany(sequelize.models.Shopkeeper, { foreignKey: 'shop_id' });
  Shopkeepers.belongsTo(models.Shop, { foreignKey: 'shop_id' });
  return Shopkeepers;
};
