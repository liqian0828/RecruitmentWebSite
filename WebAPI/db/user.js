var sqlite3 = require('sqlite3').verbose();

exports.getUserData = function (callback, ID, PW) {
    var db = new sqlite3.Database('DBFile/JobHunting.db');
    db.all('select * from T_User where UserName = ? and Password = ?', [ID, PW], function (err, rows) {
        callback(JSON.stringify(rows));
    });
    db.close();
}

exports.getUserResume = function (callback, UserName) {
    var db = new sqlite3.Database('DBFile/JobHunting.db');
    db.all('select R.* from T_Resume as R join T_User as U on R.UserID = U.ID where U.UserName = ?', [UserName], function (err, rows) {
        callback(JSON.stringify(rows));
    });
    db.close();
}

exports.regData = function (callback, body) {
    var db = new sqlite3.Database('DBFile/JobHunting.db');
    const uuidv1 = require('uuid/v1');
    db.all('select * from T_User where UserName = ?', [body.UserName], function (err, rows) {
        if (!rows || rows.length == 0) {
            db.run('Insert into T_User (ID, UserName, Password, Role) values (?, ?, ?, ?)', [uuidv1(), body.UserName, body.Password, body.Role], function (err, res) {
                if (!err)
                    callback(JSON.stringify({ Result: "Ok" }));
                else
                    console.log(err);
            })
        }
        else {
            callback(JSON.stringify({ Result: "Already Registered" }));
        }
    });
    db.close();
}