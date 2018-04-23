function callWS(wsUrl) {
    return $.ajax({
        url: wsUrl, async: false, type: 'GET', contentType: "application/x-www-form-urlencoded; charset=utf-8", datatype: "json"
    }).responseText;
}

function postData(wsUrl, myData) {
    $.ajaxSetup({
        contentType: "application/x-www-form-urlencoded; charset=utf-8"
    });

    return $.ajax({ url: encodeURI(wsUrl), async: false, type: 'POST', data: myData }).responseText;
}

function searchJobList() {
    var jobList = callWS("http://localhost:4545/jobList/Name?Name=" + $("#searchBox").val());
    if (jobList) {
        var myJobInfo = JSON.parse(jobList);
        console.log(myJobInfo);
        var innerElements = "";
        for (var i = 0; i < myJobInfo.length; i++) {
            innerElements += "<li><a href='detail.html?ID=" + myJobInfo[i].ID + "'>" + myJobInfo[i].Name + "</a></li>";
        }
        $("#ulhotjob").append(innerElements);
    }
}

function searchJobFromHome() {
    window.location.href = "jobs.html?searchText=" + $("#searchBox").val();
}

function getJobList() {
    var jobList = callWS("http://localhost:4545/jobList");
    if (jobList) {
        var myJobInfo = JSON.parse(jobList);
        console.log(myJobInfo);
        var innerElements = "";
        for (var i = 0; i < myJobInfo.length; i++) {
            innerElements += "<li><a href='detail.html?ID=" + myJobInfo[i].ID + "'>" + myJobInfo[i].Name + "</a></li>";
        }
        $("#ulhotjob").append(innerElements);
    }
}

function LoginUser() {
    var userInfo = callWS("http://localhost:4545/ID?ID=" + $("#UserName").val() + "&PW=" + $("#Password").val());
    if (userInfo) {
        var myUserInfo = JSON.parse(userInfo);
        window.location.href = "index.html?UserName=" + myUserInfo[0].UserName;
    } else {
        alert("登录失败！");
    }
}

function regUser() {
    var myData = {
        UserName: $("#UserName").val(),
        Password: $("#Password").val(),
        Role: "admin",
        RID: "0"
    };
    var userInfo = postData("http://localhost:4545/reg", myData);
    if (userInfo) {
        var myUserInfo = JSON.parse(userInfo);
        if (myUserInfo.Result == "Ok")
            window.location.href = "index.html?UserName=" + $("#UserName").val();
        else
            alert("用户已存在！");
    } else {
        alert("注册失败！");
    }
}