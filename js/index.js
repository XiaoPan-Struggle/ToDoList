$(function() {
  $("#title").on("keydown", function(e) {
    if (e.keyCode == 13) {
      if ($(this).val() == "") {
        alert("内容为空，请重新输入");
      } else {
        // 按下回车，存入数据
        // 按下回车，读取数据
        var local = GetData();
        // 把local数组进行更新数据 把最新的数据追加给local数组
        local.push({ title: $(this).val(), done: false });
        // 将追加的数组转换为字符串形式保存在本地
        savaData(local);
        // 调用数据
        load();
      }
    }
  });
  //  先自动渲染页面，防止关闭浏览器再打开页面不显示了
  load();
  // todolist 正在进行中和已完成选项切换
  $("ol,ul").on("click", "input", function() {
    //   获取本地数据
    var data = GetData();
    // 修改数据
    var index = $(this)
      .siblings("a")
      .attr("data-index");
    data[index].done = $(this).prop("checked");
    // 保存数据
    savaData(data);
    // 渲染页面
    load();
    $("#donecount").text($("ul").children().length);
  });

  // 给a添加删除事件
  $("ol,ul").on("click", "a", function() {
    // 获取数据
    var data = GetData();
    // 获取对应索引号
    var index = $(this).attr("data-index");
    // 修改数据
    data.splice(index, 1);
    // 保存新数据
    savaData(data);
    // 渲染页面
    load();
  });

  // 读取本地数据 判断是否有该数据
  function GetData() {
    var data = localStorage.getItem("todolist");
    if (data != null) {
      return JSON.parse(data);
    } else {
      return [];
    }
  }

  // 数据追加在本地
  function savaData(data) {
    localStorage.setItem("todolist", JSON.stringify(data));
  }

  // 调用数据渲染页面
  function load() {
    // 获取本地数据
    var data = GetData();
    // 清除一遍li
    $("ol,ul").empty();
    // 遍历这个数据
    $.each(data, function(i, ele) {
      if (ele.done) {
        $("ul").prepend('<li><input type="checkbox" checked="checked" name="">' + ele.title + '<a href="javascript:;" data-index=' + i +"></a></li>");
      } else {
        $("ol").prepend('<li><input type="checkbox" name="">' + ele.title +'<a href="javascript:;" data-index=' + i +"></a></li>");
      }
    });
    num();
  }

  // 正在完成和已经完成个数
  function num() {
    $("#donecount").text($("ul").children().length);
    $("#todocount").text($("ol").children().length);
  }
});
