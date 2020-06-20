 //入口函数
 $(function () {
    //1.个人信息编辑第一步. 
    //发送ajax请求获取到所有的个人信息显示在对应的标签上. 
    $.ajax({
        type: 'get',
        url: BigNew.user_detail,
        success: function (backData) {
            //console.log(backData);
            if (backData.code == 200) {
                // $('.username').val(backData.data.username);
                // $('.nickname').val(backData.data.nickname);
                // $('.email').val(backData.data.email);
                // $('.password').val(backData.data.password);
                for (var key in backData.data) {
                    $('.' + key).val(backData.data[key]);
                }
                $('.user_pic').attr('src', backData.data.userPic);
            }
        }
    });


    //2.个人中心编辑第二部
    //给修改按钮设置点击事件,获取用户修改后的信息,发送ajax请求,完成修改并显示. 
    $('.btn-edit').on('click', function (e) {
        e.preventDefault();
        //获取用户修改后的信息,使用FormData
        //保证form表单中需要获取值的标签有name属性,并且name属性的值和接口key一致. 
        var fd = new FormData($('form')[0]);
        //发送ajax请求
        $.ajax({
            type: 'post',
            url: BigNew.user_edit,
            data: fd,
            contentType: false,
            processData: false,
            success: function (backData) {
                if (backData.code == 200) {
                    alert('修改成功!');
                    //第一种做法: 刷新父页面. 
                    //parent.window.location.reload();

                    //第二种做法: 发送ajax请求,获取修改后的个人信息数据,重新的渲染. 
                    $.ajax({
                        type: 'get',
                        url: BigNew.user_info,
                        success: function (backData) {
                            //console.log(backData);
                            if (backData.code == 200) {
                                parent.$('.user_info>img').attr('src', backData.data.userPic);
                                parent.$('.user_info>span>i').text(backData.data.nickname);
                                parent.$('.user_center_link>img').attr('src',backData.data.userPic);
                            }
                        }
                    });
                }
            }
        });
    })


    //3.图片预览
    $('#exampleInputFile').on('change',function(){
        var file1 = this.files[0];
        var url1 = URL.createObjectURL(file1);
        $('.user_pic').attr('src',url1);
    })


});