$(function () {
    getData();
    //回到顶部
    var backtop = document.querySelector("#backtop-img");
    window.onscroll = function () {
        var top = window.pageYOffset;
        backtop.style.opacity = top > 600 ? 1 : 0;
    }
    backtop.addEventListener("touchend", function () {   //touchend click
        window.scrollTo(0, 0);
    })
    //选择类型
    //document.querySelector(".p-ly-series").addEventListener("click", function () {   
    //    $("#p-series-m").show();
    //})

})

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}

function getproductdata(data) {
    if (data.code == 200) {
        if (JSON.stringify(data.result.result) == '[]')
            return;
        data.result.proinfo.forEach(function (value, index, arr) {
            var img=value.COVERPAPER;
            var str1=img.indexOf ( '/') ;
            var str2=img.indexOf ('.');
            $("#top-img img").attr("src", getImgSrc(img.substring(str1 + 1, str2), 350));
            //头部
            //$("#top-img img").attr("src", "https://image.yuetaowang.cn/" + value.COVERPAPER);
            $("#r-price").html("￥" + value.SALEPRICE.toFixed(2));
            if (value.SALEPRICE != value.Price) {
                $("#price").html("￥" + value.Price.toFixed(2));
                $("#discount").html(((value.SALEPRICE / value.Price) * 10).toFixed(2) + "折");
            }
            if (value.BELONGTO == "9") {
                $("#p-type").html("多元");
                $("#p-memo").html(value.Memo);
                $(".p-info-ly").show();
                if (data.result.series.length != 0)
                {
                    $(".p-ly-series").show();
                    $("#p-series").html(value.ShortTitle);
                }
                else
                    $(".p-ly-series").hide();
           
                $("#ly-publisher").html(value.Publisher);
            }
            else { $(".p-info-zy").show(); }
            $("#p-title").html(value.Title);
            //商品信息
            $("#author").html(value.AUTHOR);
            $("#publisher").html(value.Publisher);
            $("#ISBN").html(value.ISBN);
            $("#fname").html(value.FNAME);
            $("#fcode").html(value.FCODE);
            $("#qty").html(value.QTY);
            //商品详情
            if (value.Content != null && String(value.Content) != '')
                pdetailhtml("内容简介", value.Content)
            else {
                if (value.Recommend != null && String(value.Recommend) != '')
                    pdetailhtml("编辑推荐语", value.Recommend)
                if (value.AuthorBriefIntroduction != null && String(value.AuthorBriefIntroduction) != '')
                    pdetailhtml("作者简介", value.AuthorBriefIntroduction)
                if (value.Summary != null && String(value.Summary) != '')
                    pdetailhtml("内容提要", value.Summary)
                if (value.Directory_Back != null && String(value.Directory_Back) != '')
                    pdetailhtml("目录", value.Directory_Back)
                if (value.WonderfulPage != null && String(value.WonderfulPage) != '')
                    pdetailhtml("精彩试读", value.WonderfulPage)
                if (value.WONDERFULPICTUREFILE != null && String(value.WONDERFULPICTUREFILE) != '')
                    pdetailhtml("精彩图片", value.WonderfulPage)
                if (value.COMMENT != null && String(value.COMMENT) != '')
                    pdetailhtml("评论", value.WonderfulPage)
            }
        });
        //账户
        data.result.account.forEach(function (value, index, arr) {
            $("#aid").html(value.activity_id);
            $("#money").html("￥" + value.balance.toFixed(2));
        });
    }
    else
        jQuery.tip(data.msg);
}
function pdetailhtml(name, data) {
    var temp = jQuery("#temp").html();
    temp = temp.replace("$name$", name);
    temp = temp.replace("$content$", data);
    $("#p-detail-list").append(temp);
}
//接口请求数据 页面渲染
function getData() {
    var d = { "activityId": getUrlParam("activityId"), "commodityId": getUrlParam("productId"), "name": jQuery.cookie("username"), "storeId": jQuery.cookie("storeid") };
    getAPI(1003, d, getproductdata)
}

//回到顶部
