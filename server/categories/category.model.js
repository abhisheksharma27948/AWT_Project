const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/db.helper");

module.exports = (sequelize) => {
  const Category = sequelize.define(
    "Category",
    {
      category_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      category_name: { type: DataTypes.STRING, allowNull: false },
      shop_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Shop', key: 'shop_id' } }
    },
    {
      tableName: "categories", // Specify the table name
      timestamps: false, // Disable timestamps
      underscored: true, // Use underscored naming for fields
    }
  );

  // Define relationships or associations with other models if needed
  Category.associate = (models) => {
    Category.belongsTo(models.Shop, { foreignKey: 'shop_id' });
    Category.hasMany(models.Product, { foreignKey: 'category_id' });
  };

  return Category;
};
