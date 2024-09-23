const CategoryModel = require("../models/Category");


async function dbGetCategories () {
    return await CategoryModel.find({});
}


module.exports = {
    dbGetCategories
}