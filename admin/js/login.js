//入口函数
$(function () {
    //一:登录
    //1.1 给登录按钮设置一个点击事件. 
    $('.input_sub').on('click', function (e) {
      //1.2 去掉form表单中submit按钮的默认的提交行为
      e.preventDefault();
      //1.3 获取用户输入的账号和密码
      var username = $('.input_txt').val().trim();
      var password = $('.input_pass').val().trim();
      //1.4 非空判断
      if (username == "" || password == "") {
        // alert('账号或者密码不能为空!');
        // 弹出一个提示框不用alert,而是使用bootstrap中的模态框
        $('#myModal .modal-body').text('账号或者密码不能为空!');
        $('#myModal').modal();
        return;
      }
      //1.5 发送ajax请求
      $.ajax({
        type: 'post',
        // url: 'http://localhost:8080/api/v1/admin/user/login',
        url:BigNew.user_login,
        data: {
          username: username,
          password: password
        },
        success: function (backData) {
          console.log(backData);
          
          //弹出框,用的是bootstrap中的模态框.
          $('#myModal .modal-body').text(backData.msg);
          $('#myModal').modal();

          if (backData.code == 200) {
            //把返回的token给保存起来. 
            localStorage.setItem('token',backData.token);

            //模态框关闭的时候触发跳转到首页. 
            $('#myModal').on('hidden.bs.modal', function (e) {
              //1.6 如果登录成功就跳转到首页(index.html)
              window.location.href = './index.html';
            })

          }
        }
      });
    });

  });