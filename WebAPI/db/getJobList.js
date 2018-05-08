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
    if (!Name)
        Name = "";
    db.all("select * from T_Job where Name like ?", ['%' + Name + '%'], function (err, rows) {
        callback(rows)
    });
    db.close();
}

exports.getmyPubJob = function (callback, Name) {
    var db = new sqlite3.Database('DBFile/JobHunting.db');
    if (!Name)
        Name = "";
    db.all("select J.* from T_Job as J join T_User as U on J.UserID = U.ID where U.UserName = ?", [Name], function (err, rows) {
        callback(rows)
    });
    db.close();
}

exports.getmyhuntingJob = function (callback, Name) {
    var db = new sqlite3.Database('DBFile/JobHunting.db');
    if (!Name)
        Name = "";
    db.all('select * from T_User where UserName = ?', [Name], function (err, userrows) {
        db.all("select J.* from T_Job as J join T_INFO as I on J.ID = I.JobID where I.UserID = ?", [userrows[0].ID], function (err, rows) {
            callback(rows)
        });
    });
    db.close();
}

exports.getmyhuntingName = function (callback, ID) {
    var db = new sqlite3.Database('DBFile/JobHunting.db');
    db.all("select R.Name, R.Tele from T_Resume as R join T_INFO as I on R.UserID = I.UserID where I.JobID = ?", [ID], function (err, rows) {
        callback(rows)
    });
    db.close();
}