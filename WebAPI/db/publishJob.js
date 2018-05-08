var sqlite3 = require('sqlite3').verbose();

exports.pubJob = function (callback, body) {
    var db = new sqlite3.Database('DBFile/JobHunting.db');
    const uuidv1 = require('uuid/v1');
    JobDesc = body.JobDesc.split('\n').join('<br\>');
    JobRes = body.JobRes.split('\n').join('<br\>');
    db.all('select * from T_User where UserName = ?', [body.UserName], function (err, userrows) {
        db.run('Insert into T_Job (ID, Name, Type, Deadline, JobDesc, JobRes, UserID) values (?, ?, ?, ?, ?, ?, ?)', [uuidv1(), body.Name, body.Type, body.Deadline, JobDesc, JobRes, userrows[0].ID], function (err, res) {
            if (!err)
                callback(JSON.stringify({ Result: "Ok" }));
            else
                console.log(err);
        });
    });
    db.close();
}