const db = require('../configurations/db');

const User = {
  createUser: ({ username, fullName, email, mobileNumber, password }) => {
    return new Promise((resolve, reject) => {
      const query =
        'INSERT INTO user (username, fullName, email, mobileNumber, password) VALUES (?,?,?,?,?)';
      db.query(
        query,
        [username, fullName, email, mobileNumber, password],
        (err, results) => {
          if (err) {
            return reject(err);
          }

          return resolve(results);
        }
      );
    });
  },
  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      const query =
        'SELECT id, username, fullName, email, mobileNumber FROM user WHERE id = ?';
      db.query(query, [id], (err, results) => {
        if (err) {
          return reject(err);
        }

        return resolve(results[0]);
      });
    });
  },
  getUserByEmail: (email) => {
    return new Promise((resolve, reject) => {
      const query =
        'SELECT id, username, fullName, email, mobileNumber, password FROM user WHERE email = ?';
      db.query(query, [email], (err, results) => {
        if (err) {
          return reject(err);
        }

        return resolve(results[0]);
      });
    });
  },
};

module.exports = User;
