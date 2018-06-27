$(function() {
  resize();

  // $(window).on('resize', resize).trigger('resize');

  // 初始化 tooltilp 插件
  $('[data-toggle="tooltip"]').tooltip();
  ulWidth();

  // 新闻质询
  $("#news > .container > .row > .col-sm-1 > .nav-stacked li a").each(function(
    index,
    item
  ) {
    $(item).on("click", function() {
      $("#news > .container > .row > .col-sm-2 > .news-title").text(
        $(this).data("title")
      );
    });
  });
});
$(window).on("resize", function() {
  resize();
  ulWidth();
});
function ulWidth() {
  // 控制 标签页的宽度
  var $ulContent = $("#prodcuts > .container > .ul-wapper > .nav-tabs");
  var width = 0;
  $ulContent.children().each(function(index, item) {
    // console.log(item.clientWidth);
    // console.log($(item).width());
    width += item.clientWidth;
  });
  if (width > $(window).width()) {
    $ulContent
      .css("width", width + "px")
      .parent()
      .css("overflowX", "scroll");
  } else {
    $ulContent
      .css("width", "100%")
      .parent()
      .css("overflowX", "auto");
  }
}
function resize() {
  var windowWidth = $(window).width();
  // 判断屏幕是大还是下
  // 根据大小 给轮播图设置大小背景图
  $("#main_ad > .carousel-inner > .item").each(function(index, item) {
    $(item).css(
      "backgroundImage",
      "url(" + $(item).data(windowWidth < 768 ? "img-gt" : "img-lg") + ")"
    );
    if (windowWidth < 768) {
      $(item).html('<img src="' + $(item).data("img-gt") + '" alt="">');
    } else {
      $(item).empty();
    }
  });
}

// 1. 获取手指在轮播图元素上的一个滑动方向 （左右）
var startX, endX;
// 手指触摸开始时，记录 X 坐标，手指离开的时候再次记录 X 坐标
$(".carousel")
  .on("touchstart", function(e) {
    startX = e.originalEvent.touches[0].clientX;
    // console.log(startX);

    // touchmove 要鼠标移动才有效果
  })
  .on("touchmove", function(e) {
    endX = e.originalEvent.touches[0].clientX;

    // 获取的鼠标移动的时候的坐标
    // console.log(e.originalEvent.touches[0].clientX);

    // 在触摸结束的时候比较大小
  })
  .on("touchend", function(e) {
    // console.log(Math.abs(startX - endX));

    // touches[0]  is undefined
    // 触摸都结束了，不能获取到 x 的值了
    //  on("touchend", function (e) {
    //   console.log(e.originalEvent.touches[0].clientX);
    //  });

    // 2. 根据或得到的 方向 来触发上一张或者下一张
    //     1. $('a').click();
    //     2. 原生的 carousel方法 实现

    $(this).carousel(
      endX === undefined || Math.abs(startX - endX) < 30
        ? null // 这个是 没有移动
        : startX > endX
          ? "next" // 左边
          : "prev"
    ); // 右边)

    endX = undefined;
  });
