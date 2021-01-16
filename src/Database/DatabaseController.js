var {Database} = require('sqlite3');
const Promise = require('bluebird');

/*
* date: TEXT (1/13/2021)
* data: TEXT (json to string)
*/

class dbManager {
  constructor(dbFilePath) {
    this.db = new Database(dbFilePath,  (err) => {
      if(err) {
        console.log('Can\'t connect to database', err);
      }
      else {
        console.log('Connected to database');
      }
    })
  }

  run(sql, params =[]) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if(err) {
          console.log('Err running sql ', sql, err);
          reject(err);
        }
        else {
          resolve({id: this.lastID});
        }
      })
    })
  }

  // id INTEGER PRIMARY KEY AUTOINCREMENT,
  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS todos (
        date TEXT PRIMARY KEY,
        data TEXT
      )
    `
    return this.run(sql);
  }
  
  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if(err) {
          console.log('Err running sql ', sql, err);
          reject(err);
        }
        else {
          resolve(result);
        }
      })
    })
  }
  
  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if(err) {
          console.log('Err running sql ', sql, err);
          reject(err);
        }
        else {
          resolve(rows);
        }
      })
    })
  }


  create(date, data) {
    return this.run(`
      INSERT INTO todos (date, data) VALUES (?, ?) 
      ON CONFLICT(date)
      DO UPDATE SET data = excluded.data 
    `, [date, data]);
  }

  update(date, data) {
    return this.run(`
      UPDATE todos SET data = ? WHERE date = ?
    `, [data, date]);
  }

  delete(date) {
    return this.run(`
      DELETE FROM todos WHERE date = ?
    `, [date]);
  }

  getByDate(date) {
    return this.get(`
      SELECT * FROM todos WHERE date = ?
    `, [date]);
  }

  getAll() {
    return this.all(`
      SELECT * FROM todos
    `);
  }


}


async function InsertOrUpdate(date, data) {
  // const db = await new dbManager('./test.sqlite3');
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  console.log(tomorrow.toLocaleDateString())
  db.createTable()
  .then(() => db.create(date, JSON.stringify(data))
  .then(() => db.getAll())
  .then((result) => (console.log(result))));
}

async function getData(date) {
  return new Promise((resolve, reject) => {
    try {
      db.getByDate(date)
        .then((result) => {resolve(result)});
    }
    catch (e) {
      reject(e);
    }
  })
}

var db;
async function init() {
  return new Promise((resolve, reject) => {
    try {
      db = new dbManager('./test.sqlite3');
      db.createTable().then(() => {
        resolve('Success!');
      })
    }
    catch (e) {
      reject(e);
    }
  })
}

async function main() {
  init()
    .then(() => {
      InsertOrUpdate(new Date().toLocaleDateString(), {A: 'B', B: 'E'})
        .then(() => {
          getData(new Date().toLocaleDateString()).then((result) => console.log(result));
        })
    })
  
}

module.exports = {
  init,
  InsertOrUpdate,
  getData
};