
$(document).ready(function () {

    getData();

});

function getmydata(data)
{

    if (data.code == 200) {
        //jQuery.loading();
        ////jQuery.tip(data.msg);
        var d=data.result[0];
        $("#username").html(d.name)
        $("#activity-num").html(d.actnum)
        if (d.dfk != 0)
        {
            $("#dfk").addClass("num");
            $("#dfk").html(d.dfk);
        }
        if (d.dfh != 0) {
            $("#dfh").addClass("num");
            $("#dfh").html(d.dfh);
        }
        if (d.dsh != 0) {
            $("#dsh").addClass("num");
            $("#dsh").html(d.dsh);
        }
        if (d.tk != 0) {
            $("#tk").addClass("num");
            $("#tk").html(d.tk);
        }
        $("#phonenum").attr("href", "tel:" + d.tel);
    }
    else {
        jQuery.tip(data.msg);
    }
}

function getData(key) {
    var d = { "name": jQuery.cookie("username") };
    getAPI(2025, d, getmydata)
}