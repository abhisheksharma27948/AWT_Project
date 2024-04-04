const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    product_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    product_name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    discount: { type: DataTypes.DECIMAL(5, 2), allowNull: false, defaultValue: 0.00 },
    stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    category_id: { type: DataTypes.INTEGER, allowNull: false },
    shop_id: { type: DataTypes.INTEGER, allowNull: false },
    product_image: { type: DataTypes.BLOB('long'), allowNull: true }
  };
  const options = {
    // Define foreign key relationships
    indexes: [
      {
        name: 'category_id_index',
        fields: ['category_id']
      },
      {
        name: 'shop_id_index',
        fields: ['shop_id']
      }
    ],
    // Define foreign key constraints
    references: [
      {
        model: 'Category',
        key: 'category_id',
        onDelete: 'CASCADE'
      },
      {
        model: 'Shop',
        key: 'shop_id',
        onDelete: 'CASCADE'
      }
    ]
  };
  return sequelize.define("Product", attributes, options);
}
