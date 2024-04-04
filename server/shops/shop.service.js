const db = require("../helpers/db.helper");
const { Op } = require("sequelize");

module.exports = {
  getAllShops,
  getShopById,
  createShop,
  updateShop,
  deleteShop,
};

async function getAllShops() {
  try {
    const shops = await db.Shop.findAll();
    return shops;
  } catch (error) {
    throw error;
  }
}

async function getShopById(id) {
  try {
    const shop = await db.Shop.findByPk(id);
    if (!shop) throw new Error("Shop not found");
    return shop;
  } catch (error) {
    throw error;
  }
}

async function createShop(params) {
  try {
    const existingShop = await db.Shop.findOne({ where: { shop_name: params.shop_name } });
    if (existingShop) throw new Error("Shop already exists");

    const shop = await db.Shop.create(params);
    return shop;
  } catch (error) {
    throw error;
  }
}

async function updateShop(id, params) {
  try {
    const shop = await db.Shop.findByPk(id);
    if (!shop) throw new Error("Shop not found");

    await shop.update(params);
    return shop;
  } catch (error) {
    throw error;
  }
}

async function deleteShop(id) {
  try {
    const shop = await db.Shop.findByPk(id);
    if (!shop) throw new Error("Shop not found");

    await shop.destroy();
    return { message: "Shop deleted successfully" };
  } catch (error) {
    throw error;
  }
}
async function searchByKeyword(searchKeyword) {
  try {
    const products = await db.Product.findAll({
      where: { product_name: { [Op.like]: "%" + searchKeyword + "%" } },
    });

    if (!products || products.length === 0) {
      throw new Error("No products found");
    }

    return products;
  } catch (error) {
    throw error;
  }
}
