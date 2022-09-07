$(function () {
    getData();
})

var pagenum = 1; var pagecount = 1;
var class_aid = 0;
function getsydata(data) {
    //return
    var floor = jQuery(".floor");
    if (data.code == 200) {
        if (JSON.stringify(data.result.result) == '[]') {
            $("#no-floor").show();
        }
        data.result.forEach(function (value, index, arr) {
            pagecount = data.result[index].totalPage;
            var temp = jQuery("#temp1").html();
            //temp = temp.replace(/activity_id/g, value.activity_id);
            temp = temp.replace("$activityName$", value.activityName);
            temp = temp.replace("$restMoney$", value.restMoney.toFixed(2));
            var products = "";
            //畅销
            data.result[index].best.forEach(function (item, index2, arr) {
                var tempproduct = jQuery("#temp1-product").html();
                tempproduct = tempproduct.replace(/p-title/g, item.title);
                tempproduct = tempproduct.replace("$cover$", getImgSrc(item.cover, 150));
                tempproduct = tempproduct.replace("$productId$", item.productId);
                tempproduct = tempproduct.replace("$aid$", value.activityId);

                var i = index2 + 1;
                if (i < 4)
                    tempproduct = tempproduct.replace("$src$", "<img src=\"images/default/" + i + ".png\" />");
                else
                    tempproduct = tempproduct.replace("$src$", "");
                products += tempproduct;
            });
            temp = temp.replace("$products$", products);
            floor.append(temp);
            //热卖
            var temp2 = jQuery("#temp2").html();
            products = "";
            data.result[index].hot.forEach(function (item, index2, arr) {
                var temp2product = jQuery("#temp2-product").html();
                temp2product = temp2product.replace(/p-title/g, item.title);
                temp2product = temp2product.replace("$cover$", getImgSrc(item.cover, 150));
                temp2product = temp2product.replace("$productId$", item.productId);
                temp2product = temp2product.replace("$aid$", value.activityId);
                temp2product = temp2product.replace("$r-price$", item.realPrice);
                temp2product = temp2product.replace("$price$", item.price);
                products += temp2product;
            });
            temp2 = temp2.replace("$temp2-product$", products);
            floor.append(temp2);
            var temp3 = jQuery("#temp3").html();
            var classlist = "";
            data.result[index].category.forEach(function (item, index2, arr) {
                var temp3class = jQuery("#temp3-class").html();
                temp3class = temp3class.replace(/cid/g, item.categoryId);
                if (index2 == 0) {
                    temp3class = temp3class.replace("class-" + item.categoryId, "active");
                }
                temp3class = temp3class.replace("$ctype$", value.categoryType);
                temp3class = temp3class.replace("$aid$", value.activityId);
                temp3class = temp3class.replace("$classname$", item.categoryName);
                classlist += temp3class;
            });
            class_aid = value.activityId;
            temp3 = temp3.replace("$products$", temp3html(data.result[index].commodityList));
            temp3 = temp3.replace("$classlist$", classlist);
            temp3 = temp3.replace(/aid/g, value.activityId);

            floor.append(temp3);

        });
        pagenum = pagenum + 1;
        lock = 1;
    }
    else
        jQuery.tip(data.msg);
}


//接口请求数据 页面渲染
function getData() {
    if (lock == 1) {
        lock = 2;
        var d = { "userName": jQuery.cookie("username"), "storeId": jQuery.cookie("storeid"), "curPage": pagenum };
        getAPI(2026, d, getsydata);
    }
}

//获取类别产品

function getpdata(ctype, cid, aid) {
    class_aid = aid;
    var d = { "categoryType": ctype, "categoryId": cid, "activityId": aid };
    getAPI(2027, d, getpdatareturn);
    $("#class-list-" + aid + " span").removeClass('active');
    $(".class-" + cid).addClass('active');
}

function getpdatareturn(data) {
    $("#class-products-" + class_aid).html("");
    $("#class-products-" + class_aid).html(temp3html(data.result));
}

function temp3html(data) {
    products = "";
    data.forEach(function (item, index2, arr) {
        var temp3product = jQuery("#temp3-product").html();
        temp3product = temp3product.replace("$productId$", item.productId);
        temp3product = temp3product.replace("$aid$", class_aid);    //
        temp3product = temp3product.replace("$cover$", getImgSrc(item.cover, 350));
        temp3product = temp3product.replace(/p-title/g, item.title);
        temp3product = temp3product.replace("$r-price$", item.realPrice);
        products += temp3product;
    });
    return products;
}
var lock = 1;
//滑动
//获取新数据
$(document).scroll(function () {
    var pageH = $(document.body).height();
    var scrollT = $(document).scrollTop(); //滚动条top
    var winH = $(window).innerHeight() || $(document).documentElement.clientHeight() || $(document).body.clientHeight(); //页面可视区域高度
    var aa = (pageH - winH - scrollT) / winH;
    // console.log('滚动条事件')
    if (aa < 0.2) {//0.02是个参数  //之前设置的0.02太小了，uc浏览器 底部自带的键盘占高了，设置成0.2就可以了
        //console.log('滚动条到底')
        if (pagecount < pagenum)
            return;
        getData();
    }
});

