var sqlite3 = require('sqlite3').verbose();
 //var db = new sqlite3.Database(':memory:');

exports.relationTable = function (callback, UserID, JobID) {
    var db = new sqlite3.Database('DBFile/JobHunting.db');
    const uuidv1 = require('uuid/v1');
    db.all('select * from T_INFO where UserID = ? and JobID = ?', [UserID, JobID], function (err, rows) {
        if (!rows || rows.length == 0) {
            db.run('insert into T_INFO (ID, UserID, JobID) values (?, ? ,?)' , [uuidv1(), UserID, JobID], function(err, res){
                if (!err) {
                    callback(JSON.stringify({ Result: "Ok" }));
                }
                else
                    console.log(err);
            })
        }
        else {
            callback(JSON.stringify({ Result: "Already Hunted" }));
        }
    });
    db.close();
}