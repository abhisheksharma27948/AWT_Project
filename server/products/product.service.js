const db = require("../helpers/db.helper");
const { Op } = require("sequelize");

module.exports = {
  getAll,
  getById,
  create,
  update,
  del,
  changeStatus,
  searchByKeyword,
};

async function getAll() {
  try {
    const products = await db.Product.findAll();
    return products;
  } catch (error) {
    throw error;
  }
}

async function getById(id) {
  try {
    const product = await getProduct(id);
    return product;
  } catch (error) {
    throw error;
  }
}

async function update(id, params) {
  try {
    const product = await getProduct(id);

    if (params.product_name && params.product_name !== product.product_name) {
      const existingProduct = await db.Product.findOne({ where: { product_name: params.product_name } });
      if (existingProduct) {
        throw new Error("Product with name " + params.product_name + " already exists");
      }
    }

    Object.assign(product, params);
    await product.save();
    return product;
  } catch (error) {
    throw error;
  }
}

async function create(params) {
  try {
    const existingProduct = await db.Product.findOne({ where: { product_name: params.product_name } });
    if (existingProduct) {
      throw new Error("Product " + params.product_name + " already exists");
    }

    const product = await db.Product.create(params);
    return product;
  } catch (error) {
    throw error;
  }
}

async function changeStatus(id) {
  try {
    const product = await getProduct(id);
    product.product_status = !product.product_status; // Toggle the status

    await product.save();
    return product;
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

async function getProduct(id) {
  try {
    const product = await db.Product.findByPk(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    throw error;
  }
}

async function del(id) {
  try {
    const result = await db.Product.destroy({
      where: { id: id },
    });
    return result;
  } catch (error) {
    throw error;
  }
}
