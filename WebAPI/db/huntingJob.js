var sqlite3 = require('sqlite3').verbose();
var getData = require('../db/relation');

exports.huntingJob = function (callback, body, userID, JobID) {
    var db = new sqlite3.Database('DBFile/JobHunting.db');
    const uuidv1 = require('uuid/v1');
    db.all('select * from T_Resume where Name = ?', [body.Name], function (err, rows) {
        if (!rows || rows.length == 0) {
            db.run('Insert into T_Resume (ID, Name, Sex, Birthday, Mail, Tele, WEY, Salary, OBDate) values (?, ?, ?, ?, ?, ?, ?, ?, ?)', [uuidv1(), body.Name, body.Sex, body.Birthday, body.Mail, body.Tele, body.WEY, body.Salary, body.OBDate], function (err, res) {
                if (!err) {
                    getData.relationTable(callback, userID, JobID);
                }
                else
                    console.log(err);
            })
        }
        else {
            getData.relationTable(callback, userID, JobID);
        }
    });
    db.close();
}