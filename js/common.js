var url="ashx/cmd.ashx";

function getAPI(cmd, d, cb) {//cmd命令id  d 键值对json数据, cb 成功回调地址
    //var url_cmd = cmd_url + "?cmd=" + cmd + "&cmdname=" + cmdname + "&type=" + t;
    var url_cmd = url + "?cmd=" + cmd;
    jQuery.ajax({ url: url_cmd, dataType: "json", type: "post", data: d, success: function (res) { if(cb)cb(res); }, error: function (err) { }

    });
}

function dkf_login(ytcode, phone) {
    var url_cmd = url + "?cmd=2001";
    jQuery.ajax({ url: url_cmd, dataType: "json", type: "post", data: { r: Math.random(), ytcode: ytcode, phone: phone }, success: function (res) {
        if (res.code == 200) {
            jQuery.cookie("username", res.result.username); jQuery.cookie("token", res.result.token); jQuery.cookie("userid", res.result.id);
            jQuery.cookie("storeid", res.result.storeid); jQuery.cookie("ytcode", ytcode); jQuery.cookie("typeId", res.result.typeId);
            //getAPI(20, "customerOrder", d);
            //getAPI(20, "customerOrder", {  });
        } else {
            jQuery.cookie("username", ""); jQuery.cookie("token", ""); jQuery.cookie("userid", "");
        }

    }, error: function () { window.alert("系统错误"); }
    });
}

function getImgSrc(fm, pixel) {//
    var url = "https://image.yuetaowang.cn/images/Thumbnail/{0}-{1}.jpg";
    url = url.replace("{0}", fm); url = url.replace("{1}", pixel);
    return url;
}

jQuery.extend({
    loading: function () {
        layer.open({
            type: 2
        });
    },
    tip: function msg(m) {
        layer.open({
            content: m
            , skin: 'msg'
            , time: 2
        });
    },
    loading_close: function () {
        layer.closeAll();
    }
});