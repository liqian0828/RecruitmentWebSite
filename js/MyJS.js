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

function GetParam(key) {
    return (document.location.search.match(new RegExp("(?:^\\?|&)" + key + "=(.*?)(?=&|$)")) || ['', null])[1];
}

function addParamother(url) {
    window.location.href = url + '?UserName=' + GetParam('UserName');
}

function addParam(url) {
    window.location.href = url + '&UserName=' + GetParam('UserName');
}

function huntingNav() {
    var url = "apply_info.html?JobName=" + $("#JobName").text();
    $("#apply").attr("href", url + '&UserName=' + GetParam('UserName'));
}

function HuntingJob() {
    var jobType = true;
    if ($("input[name=RecruitmentPortalPersonProfile_gender]:checked").val() == 0) {
        jobType = true;
    } else {
        jobType = false;
    }

    var myData = {
        Name: $("#name").val(),
        Sex: jobType ? "男" : "女",
        Birthday: $("#Birthday").val(),
        Mail: $("#mail").val(),
        Tele: $("#tele").val(),
        WEY: $("#YearsOfWork").val(),
        Salary: $("#CurrSalary").val(),
        OBDate: $("#EntrantDate").val()
    };

    var resultData = postData("http://localhost:4545/huntingJob", myData);
    var reData = JSON.parse(resultData);
    if (reData.Result) {
        alert("发送成功");
        addParamother("jobs.html");
    } else {
        alert("发送失败");
    }
}

function GetHuntingJob() {
    var myData = JSON.parse(callWS("http://localhost:4545/jobList/ID?ID=" + GetParam("ID")));
    $("#JobName").text(myData[0].Name);
    $("#JobType").text(myData[0].Type);
    $("#JobDeadline").text(myData[0].Deadline);
    $("#JobRep").html(myData[0].JobRes);
    $("#JobDesc").html(myData[0].JobDesc);
}

function publishJob() {
    var jobType = true;
    if ($("input[name=RecruitmentPortalPersonProfile_gender]:checked").val() == 0) {
        jobType = true;
    } else {
        jobType = false;
    }

    var myData = {
        Name: $("#JobName").val(),
        Type: jobType ? "全职" : "兼职",
        Deadline: $("#deadline").val(),
        JobDesc: $("#duty").val(),
        JobRes: $("#desc").val()
    };

    var resultData = postData("http://localhost:4545/jobPublish", myData);
    var reData = JSON.parse(resultData);
    if (reData.Result) {
        alert("发布成功");
        addParamother("jobs.html");
    } else {
        alert("发布失败");
    }
}

function searchJobList() {
    var seatext = $("#searchInput").val();
    if (seatext == "请输入关键字")
        seatext = "";

    var jobList = callWS("http://localhost:4545/jobList/Name?Name=" + seatext);
    if (jobList) {
        var myJobInfo = JSON.parse(jobList);
        var innerElements = "";
        $("#ulhotjob").text("");
        for (var i = 0; i < myJobInfo.length; i++) {
            innerElements += `<tr>
            <td class="tableleft joblsttitle">
                <a href="detail.html?ID=` + myJobInfo[i].ID + `&UserName=` + GetParam('UserName') + `"> ` + myJobInfo[i].Name + ` </a>
            </td>
            <td class="tableleft joblsttitle">` + myJobInfo[i].Type + `</td>
            <td class="tableleft joblsttitle"> ` + myJobInfo[i].Deadline + ` </td>
        </tr>`;
        }
        $("#ulhotjob").append(innerElements);
    }
}

function searchJobFromHome() {
    addParam("jobs.html?searchText=" + $("#searchBox").val());
}

function getJobList() {
    var jobList = callWS("http://localhost:4545/jobList");
    if (jobList) {
        var myJobInfo = JSON.parse(jobList);
        var innerElements = "";
        $("#ulhotjob").text("");
        for (var i = 0; i < myJobInfo.length; i++) {
            innerElements += "<li><a href='detail.html?ID=" + myJobInfo[i].ID + "&UserName=" + GetParam('UserName') + "'>" + myJobInfo[i].Name + "</a></li>";
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