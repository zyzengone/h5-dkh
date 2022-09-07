$(document).ready(function () {
    var key = getUrlParam("key");
    if (key == "1") {
       $("#h-un-jiesuan").removeClass("active");
        $("#h-jiesuan").addClass("active"); 
    }
    else {
        key = 0;
        $("#h-jiesuan").removeClass("active");
        $("#h-un-jiesuan").addClass("active");
    }
    getData(key);
    //$("#activitylist").removeClass("no_activitylist");
    //$(this).addClass("active");
    //$("#activitylist").removeClass("no_activitylist");
    //$("#activitylist").empty();
    //if (this.innerText == "未结算") //未结算：0， 已结算： 1
    //    getData(0)
    //else
    //    getData(1)

    //$("header span").click(function () {
    //});
});

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}

//未结算
function getactivitydata(data) {
    var container = jQuery("#activitylist");
    //$("#activitylist").removeClass("no_activitylist");
    if (data.code == 200) {
        if (JSON.stringify(data.result.result) == '[]')
        {
            //$("#activitylist").empty();
            $("#no_activitylist").show();
        }
        data.result.result.forEach(function (value, index, arr) {
            var temp = jQuery("#temp1").html();
            temp = temp.replace(/activity_id/g, value.activity_id);
            temp = temp.replace("$assignmentName$", value.assignmentName);
            temp = temp.replace("$startTime$", value.startTime);
            temp = temp.replace("deadTime", value.deadTime);
            var reg2 = new RegExp("-", "g");//g,表示全部替换。
            var deadTime = value.deadTime.replace(reg2, "/").replace(" ", ",");
            temp = temp.replace("deadTimedata", deadTime);
            var date1 = new Date(value.deadTime);
            var date2 = new Date();
           //debugger
            //if (date1.getTime() < date2.getTime())
            //    temp = temp.replace("$warning$", "*该活动即将结算，请尽快选购。");
            //else
            //    temp = temp.replace("$warning$", "");
            var curDate =new Date(Date()).getTime();
            var deadTime = new Date(value.deadTime.replace(/\-/g, '/')).getTime();

            if (curDate >= deadTime) 
                    temp = temp.replace("$warning$", "*该活动即将结算，请尽快选购。");
            else
                    temp = temp.replace("$warning$", "");
            if (value.rest_money == "")
                temp = temp.replace("$money$", value.credit.toFixed(2));
            else
                temp = temp.replace("$money$", value.rest_money.toFixed(2));
            container.append(temp);
        });
        datedown();
    }
    else
        jQuery.tip(data.msg);
}
//已结算
function getactivitydata2(data) {
    if (data.code == 200) {
        var container = jQuery("#activitylist");
        data.result.result.forEach(function (value, index, arr) {
            console.log(value)
            var temp = jQuery("#temp2").html();
            temp = temp.replace(/activity_id/g, value.activity_id);
            temp = temp.replace("$assignmentName$", value.assignmentName);
            temp = temp.replace("$startTime$", value.startTime);
            temp = temp.replace("deadTime", value.deadTime);
            var reg2 = new RegExp("-", "g");//g,表示全部替换。
            var deadTime = value.deadTime.replace(reg2, "/").replace("  ", ",");
            temp = temp.replace("deadTimedata", deadTime);

            if (value.rest_money == "") {
                temp = temp.replace("$money$", value.credit.toFixed(2));
                temp = temp.replace("$totalmoney$", value.credit_orign.toFixed(2));
            }
            else {
                temp = temp.replace("$money$", value.rest_money.toFixed(2));
                temp = temp.replace("$totalmoney$", value.rest_money_orign.toFixed(2));
            }
            container.append(temp);
        });
        datedown();
    }
    else 
        jQuery.tip(data.msg);
   
}

//接口请求数据 页面渲染
function getData(key) {
    var d = { "name": jQuery.cookie("username"), "key": key, "pageNo": 1, "pageSize": 9 };
    if (key == 0)
        getAPI(1012, d, getactivitydata)
    else
        getAPI(1012, d, getactivitydata2)
}

//查看购物车
function gotocart(id) {
    //要获取店铺id
}

//扫码
function scan(id) {

}

//去购书
function gotosearch(id) {

}

//倒计时
function datedown() {
    var endtime, nowtime, lefttime, d, h, m, s;
    var sh;
    $.fn.countDown = function (_boolean, _this) {
        var sh = [];
        // var _this = $(this);
        _this.each(function (index, el) {

            var thisObj = $(this);
            sh[index] = setInterval(function () {
                var times = thisObj.data("times");//获得timeBox的data值，即结束时间
                endtime = new Date(times);//把data值转换成时间
                nowtime = new Date();//获得当前时间
                lefttime = parseInt((endtime.getTime() - nowtime.getTime()) / 1000); //结束时间-当前时间得到毫秒数，再除以1000得到两个时间相差的秒数
            
                if (_boolean) {
                    d = parseInt(lefttime / 3600 / 24);
                    h = parseInt((lefttime / 3600) % 24);
                } else {
                    d = parseInt(lefttime / 3600 / 24) * 24;
                    h = parseInt((lefttime / 3600) % 24) + d;
                }

                m = parseInt((lefttime / 60) % 60);
                s = parseInt(lefttime % 60);
                if (endtime.getTime() <= nowtime.getTime()) {
                    d = h = m = s = "0";
                    clearInterval(sh[index]);
                }
                // 三目运算符
                d = d < 10 ? "0" + d : d;
                h = h < 10 ? "0" + h : h;
                m = m < 10 ? "0" + m : m;
                s = s < 10 ? "0" + s : s;

                if (_boolean) {
                    thisObj.find(".date").text(d);
                }
                if (s == 'NaN')
                    return;
                thisObj.find(".hour").text(h);
                thisObj.find(".minutes").text(m);
                thisObj.find(".seconds").text(s);

                if (lefttime <= 0) {
                    //d = h = m = s = "00";
                    //thisObj.find('span').hide();
                    //thisObj.html("<span>00&nbsp;天&nbsp;00&nbsp;时&nbsp;00&nbsp;分&nbsp;00&nbsp;秒</span>");
                    clearInterval(sh[index]);
                }
            }, 1000);
        });
    }

    // 调用
    $(".timeBox").countDown(true, $(".timeBox"));
    $(".timeBox").show();
}