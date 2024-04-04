const db = require("../helpers/db.helper");
const { Op } = require("sequelize");

module.exports = {
  getAllShopkeepers,
  getShopkeeperById,
  createShopkeeper,
  updateShopkeeper,
  deleteShopkeeper,
  searchShopkeepersByKeyword,
};

async function getAllShopkeepers() {
  try {
    const shopkeepers = await db.Shopkeeper.findAll();
    return shopkeepers;
  } catch (error) {
    throw error;
  }
}

async function getShopkeeperById(id) {
  try {
    const shopkeeper = await db.Shopkeeper.findByPk(id);
    if (!shopkeeper) throw new Error("Shopkeeper not found");
    return shopkeeper;
  } catch (error) {
    throw error;
  }
}

async function createShopkeeper(params) {
  try {
    const existingShopkeeper = await db.Shopkeeper.findOne({ where: { shopkeeper_email: params.shopkeeper_email } });
    if (existingShopkeeper) throw new Error("Shopkeeper with this email already exists");

    const shopkeeper = await db.Shopkeeper.create(params);
    return shopkeeper;
  } catch (error) {
    throw error;
  }
}

async function updateShopkeeper(id, params) {
  try {
    const shopkeeper = await db.Shopkeeper.findByPk(id);
    if (!shopkeeper) throw new Error("Shopkeeper not found");

    Object.assign(shopkeeper, params);
    await shopkeeper.save();
    return shopkeeper;
  } catch (error) {
    throw error;
  }
}

async function deleteShopkeeper(id) {
  try {
    const result = await db.Shopkeeper.destroy({ where: { shopkeeper_id: id } });
    return result;
  } catch (error) {
    throw error;
  }
}

async function searchShopkeepersByKeyword(searchKeyword) {
  try {
    const shopkeepers = await db.Shopkeeper.findAll({
      where: {
        [Op.or]: [
          { shopkeeper_name: { [Op.like]: "%" + searchKeyword + "%" } },
          { shopkeeper_email: { [Op.like]: "%" + searchKeyword + "%" } },
        ],
      },
    });
    return shopkeepers;
  } catch (error) {
    throw error;
  }
}
