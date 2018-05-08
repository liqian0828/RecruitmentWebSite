var sqlite3 = require('sqlite3').verbose();
var getData = require('../db/relation');
var getUser = require('../db/user');

exports.huntingJob = function (callback, body) {
    var db = new sqlite3.Database('DBFile/JobHunting.db');
    const uuidv1 = require('uuid/v1');
    db.all('select R.* from T_Resume as R join T_User as U on R.UserID = U.ID where U.UserName = ?', [body.UserName], function (err, rows) {
        if (!rows || rows.length == 0) {
            db.all('select * from T_User where UserName = ?', [body.UserName], function (err, userrows) {
                db.run('Insert into T_Resume (ID, Name, Sex, Birthday, Mail, Tele, WEY, Salary, OBDate, UserID) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [uuidv1(), body.Name, body.Sex, body.Birthday, body.Mail, body.Tele, body.WEY, body.Salary, body.OBDate, userrows[0].ID], function (err, res) {
                        if (!err) {
                            getData.relationTable(callback, userrows[0].ID, body.JobID);
                        }
                        else
                            console.log(err);
                    });
            });
        }
        else {
            db.all('select * from T_User where UserName = ?', [body.UserName], function (err, userrows) {
                getData.relationTable(callback, userrows[0].ID, body.JobID);
            });
        }

    });

    db.close();
}