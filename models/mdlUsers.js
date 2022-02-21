const pool = require("../db");
const md5 = require("md5");

const getUser = async (user, pass) => {
  const query = "select * from authuser where userName = ? and userPass = ?";
  const row = await pool.query(query, [user, md5(pass)]);
  return row[0];
};

const addUser = async (data) => {
  try {
    const query = "insert into authuser set ?";
    const row = await pool.query(query, [data]);
    return row[0];
  }
  catch (error) {
    console.log(error);
  }
};

const callUser = async(userName) => {
  try {
    const query = "select * from authuser where userName = ?";
    const row = await pool.query(query, [userName]);
    return row[0];
  } catch (error) {
    console.log(error);
  }
}; 

const getEmail = async (userEmail) => {
  try {
    const query = "select * from authuser where userEmail = ?";
    const row = await pool.query(query, [userEmail]);
    return row[0];
  } catch (error) {
    console.log(error);
  }
};

async function modifyUser (data, id) {
  try {
    const query = "update authuser set ?";
    const row = await pool.query(query, [data, id])
    return row;
  } catch (error) {
    console.log(error)
  }
}; 

module.exports = { getUser, addUser, modifyUser, callUser, getEmail };

