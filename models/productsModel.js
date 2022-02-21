const pool = require("../db");

const getProducts = async () => {
  try {
    const query = "select * from products";
    const rows = await pool.query(query);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const addProduct = async (data) => {
  try {
    const query = "insert into products set ?";
    const row = await pool.query(query, [data]);
    return row;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getProducts, addProduct };