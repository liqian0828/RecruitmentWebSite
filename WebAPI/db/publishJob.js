var sqlite3 = require('sqlite3').verbose();

exports.pubJob = function (callback, body) {
    var db = new sqlite3.Database('DBFile/JobHunting.db');
    const uuidv1 = require('uuid/v1');
    db.run('Insert into T_Job (ID, Name, Type, Deadline, JobDesc, JobRes) values (?, ?, ?, ?, ?, ?)', [uuidv1(), body.Name, body.Type, body.Deadline, body.JobDesc, body.JobRes], function (err, res) {
        if (!err)
            callback(JSON.stringify({ Result: "Ok" }));
        else
            console.log(err);
    });
    db.close();
}