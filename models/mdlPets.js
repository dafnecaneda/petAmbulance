const pool = require("../db");

const getPets = async () => {
  try {
    const query = "select * from pets";
    const rows = await pool.query(query);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

//function to get pet trhought name
const getPet = async (id) => {
  try {
    const query = "select * from pets where id = ?";
    const row = await pool.query(query, [id]);
    return row;
  } catch (error) {
    console.log(error)
}
}

const addPets = async (data) => {
  try {
    const query = "insert into pets set ?";
    const row = await pool.query(query, [data]);
    return row;
  } catch (error) {
    console.log(error);
  }
};

async function modifyPet(data, id) {
  try {
    const query = "update pets set ? where id = ?";
    const row = await pool.query(query, [data, id])
    return row;
  } catch (error) {
    console.log(error)
  }
}; 

const deletePet = async (id) => {
  const query = "delete from pets where id = ?";
  const row = await pool.query(query, [id]);
  return row;
};

module.exports = { getPets, addPets, getPet, deletePet, modifyPet };