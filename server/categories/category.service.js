const db = require("../helpers/db.helper");
const { Op } = require("sequelize");

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  searchByKeyword,
};

async function getAllCategories() {
  try {
    const categories = await db.Category.findAll();
    return categories;
  } catch (error) {
    throw error;
  }
}

async function getCategoryById(categoryId) {
  try {
    const category = await db.Category.findByPk(categoryId);
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  } catch (error) {
    throw error;
  }
}

async function createCategory(categoryData) {
  try {
    const category = await db.Category.create(categoryData);
    return category;
  } catch (error) {
    throw error;
  }
}

async function updateCategory(categoryId, categoryData) {
  try {
    const category = await db.Category.findByPk(categoryId);
    if (!category) {
      throw new Error("Category not found");
    }

    await category.update(categoryData);
    return category;
  } catch (error) {
    throw error;
  }
}

async function deleteCategory(categoryId) {
  try {
    const result = await db.Category.destroy({
      where: {
        category_id: categoryId,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
}

async function searchByKeyword(keyword) {
  try {
    const categories = await db.Category.findAll({
      where: {
        category_name: {
          [Op.like]: `%${keyword}%`,
        },
      },
    });
    return categories;
  } catch (error) {
    throw error;
  }
}
