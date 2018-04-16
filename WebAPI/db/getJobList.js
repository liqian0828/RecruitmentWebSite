var sqlite3 = require('sqlite3').verbose();

exports.getJobData = function (callback) {
    var db = new sqlite3.Database('DBFile/JobHunting.db');
    db.all('select * from T_Job', function (err, rows) {
        callback(rows)
    });
    db.close();
}

exports.getJobDataByID = function (callback, ID) {
    var db = new sqlite3.Database('DBFile/JobHunting.db');
    db.all("select * from T_Job where ID = ?", [ID], function (err, rows) {
        callback(rows)
    });
    db.close();
}

exports.getJobDataByName = function (callback, Name) {
    var db = new sqlite3.Database('DBFile/JobHunting.db');
    db.all("select * from T_Job where Name like ?", ['%' + Name + '%'], function (err, rows) {
        callback(rows)
    });
    db.close();
}