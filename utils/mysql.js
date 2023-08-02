import mysql from 'mysql';
let pool = mysql.createPool({
  connectionLimit: 10,
  host: '123.207.213.124',
  user: 'socket',
  prot: 3306,
  password: '0305.1012',
  database: 'socket',
});
let connect = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      !err ? resolve(connection) : reject(err);
    });
  });
};
let find = (sql) => {
  return new Promise(async (resolve, reject) => {
    let connection = await connect();
    connection.query(sql, (err, result, fields) => {
      !err ? resolve(result) : reject(err);
      connection.release();
    });
  });
};
let insert = (sql) => {
  return new Promise(async (resolve, reject) => {
    let connection = await connect();
    connection.query(sql, (error, results, fields) => {
      !error ? resolve(results) : reject(error);
    });
  });
};
let createUser = (userInfo) => {
  return new Promise(async (resolve, reject) => {
    let connection = await connect();
    connection.query('INSERT INTO users SET ?', userInfo, (error, results, fields) => {
      !error ? resolve(results) : reject(error);
    });
  });
}

export { find, insert, createUser };
