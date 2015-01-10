/**
 * **
 * created by Ivan @2015-01-01
 * @param  {[type]} document [description]
 * @return {[type]}          [description]
 */
(function(document) {
	$.validator.addMethod("email_check", function(value, element) {
		// var email = /^([\w-+=_]+(?:\.[\w-+=_]+)*)@(?163.com$|sina.com$|qq.com$|163.com$|162.com$|sina.cn$|gmail.com$|hotmail.com$)((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
		var email = /^([\w-+=_]+(?:\.[\w-+=_]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
		value = value.replace(/^\s+|\s+$/g, "").toLowerCase()
		if (email.test(value)) {
			return true;
		} else {
			return false;
		};
	});
	$("#formRegist").validate({
		rules: {
			firstname: {
				required: true,
			},
			lastname: {
				required: true,
			},
			email: {
				required: true,
				email_check: true
			},
			password: {
				required: true,
				minlength: 6,
			},
			password_c: {
				required: true,
				minlength: 6,
				equalTo: ".regist #password"
			},
		},
		messages: {
			firstname: {
				required: "请输入姓",
			},
			lastname: {
				required: "请输入名",
			},
			email: {
				required: "请输入邮箱",
				email_check: "请输入常用邮箱"
			},
			password: {
				required: "请输入密码",
				minlength: "密码最少6位长",
			},
			password_c: {
				required: "请输入确认密码",
				minlength: "密码最少6位长",
				equalTo: "两次输入的密码不一致，请重新输入"
			},
		}
	});
	$("body").on('click', '#search', function(event) {
			event.preventDefault();
			if ($(".search").val()) {
				alertModal("你搜索的代码这世界上不存在！！！Are U Kidding Me?", null, null)

			} else {
				alertModal("请输入搜索代码!!!", null, null)

			}

		}).on('click', '#add_chapter', function(event) {
			event.preventDefault();
			var obj = {
				post_title: "每天读点好书"
			}
			$.post('/post_add', obj, function(data) {
				console.log(data);
			})
		}).on('mouseover', '.index_li', function(event) {
			event.preventDefault();
			var $this = $(this);
			$this.css("border", "solid 3px red");

			$(this).popover("show")

		}).on('mouseleave', '.index_li', function(event) {
			event.preventDefault();
			var $this = $(this);
			$this.css("border", 'initial');
			$(this).popover("hide")

		}).on('click', '.use_group', function(event) {
			event.preventDefault();
			var type = $(this).data("type");
			if (type == "sign_up") {
				$(".regist").show();
				$(".login").show();
			} else if (type == "log_in") {
				$(".login").show();
				$(".regist").hide();
			}
		}).on('click', '.close', function(event) {
			event.preventDefault();
			$(".login").hide();
			$(".regist").hide();
		}).on('click', '#btn_login', function(event) {
			event.preventDefault();
			var obj = {
				username: $("#login_name").val(),
				password: $(".login #login_password").val()
			}
			$.post('/admin/login', obj, function(data) {
				if (data.code == "OK") {
					$("#login_ok_msg").show();
					$("#login_err_msg").hide();

				} else {
					$("#login_ok_msg").show();
					$("#login_err_msg").hide();

				}
				setTimeout(function() {
					window.location.reload();
				}, 3000);

			})
		}).on('click', '#btn_regist', function(event) {
			event.preventDefault();

			var obj = {
				firstname: $("#firstname").val(),
				lastname: $("#lastname").val(),
				username: $("#firstname").val() + $("#lastname").val(),
				password: $(".regist #password").val(),
				email: $(".regist #email").val()

			}
			if ($("#formRegist").valid()) {
				$.post('/admin/regist', obj, function(data) {
					if (data.code == "OK") {
						$("#regist_ok_msg").show();
						$("#regist_err_msg").hide();

					} else {
						$("#regist_ok_msg").hide();
						$("#regist_err_msg").show();

					}
					setTimeout(function() {
						window.location.reload();
					}, 3000);
				})
			}

		})
		// .on('click', '.pagination a', function(event) { //分页处理（任务）
  //           event.preventDefault();
  //           var $this = $(this);
  //           var page = parseInt($this.data('page'));
  //           // cts_lv.cur_page = page;
  //           // cts_lv.render();
  //       })
		//-弹出消息框
	$("[data-toggle='popover']").each(function(i) {
		var cfg = {
			trigger: 'hover',
			html: true
		}
		if (i % 6 == 5) {
			cfg["placement"] = "top";
		} else {
			cfg["placement"] = "top";
		}
		$(this).popover(cfg);
	});
	//angular operator
	angular.module("app", []).controller('PhoneListCtrl', function($scope) {
		$scope.phones = [{
			"name": "一线架构师实践指南",
			"img": "/assets/imgs/book.jpg",
			"href": "/admin/books/一线架构师实践指南.pdf",
			"snippet": "一线架构师实践指南."
		}, {
			"name": "基于MVC的JavaScript Web富应用开发",
			"img": "/assets/imgs/book1.jpg",
			"href": "/admin/books/基于MVC的JavaScript Web富应用开发.pdf",

			"snippet": "基于MVC的JavaScript Web富应用开发."
		}, {
			"name": "架构之美",
			"img": "/assets/imgs/book2.jpg",
			"href": "/admin/books/架构之美.pdf",

			"snippet": "架构之美."
		}, {
			"name": "架构实战——软件架构设计的过程",
			"img": "/assets/imgs/book3.jpg",
			"href": "/admin/books/架构实战——软件架构设计的过程.pdf",

			"snippet": "架构实战——软件架构设计的过程."
		}, {
			"name": "精通CSS",
			"img": "/assets/imgs/book4.jpg",
			"href": "/admin/books/精通CSS.pdf",

			"snippet": "精通CSS."
		}, {
			"name": "软件架构设计程序员向架构师转型必备",
			"img": "/assets/imgs/book.jpg",
			"href": "/admin/books/软件架构设计程序员向架构师转型必备.pdf",

			"snippet": "软件架构设计程序员向架构师转型必备."
		}];
		$scope.next_page = function(){
			console.log($scope.page);
			// console.log($(this).page);
			// console.log($(this).data("page"));
			// return 
		}
		// //计算分页
		// $scope.pages = _.range($scope.phones.length / 4);
		// // $scope.page_size = self.page_size;
		// // $scope.page_sizes = [25, 50, 100, 200];
		// $scope.first_page = ($scope.cur_page == 0);
		// $scope.last_page = ($scope.cur_page == $scope.pages.length - 1);
		// $scope.cur_page = $scope.cur_page;
		// $scope.prev_page = $scope.cur_page - 1;
		// $scope.next_page = $scope.cur_page + 1;
		// //截取数据
		// $scope.phones = $scope.phones.slice($scope.cur_page * $scope.page_size, ($scope.cur_page + 1) * 4)

	});
	//下拉加载刷新
	var range = 50; //距下边界长度/单位px  
	var elemt = 500; //插入元素高度/单位px  
	var maxnum = 20; //设置加载最多次数  
	var num = 1;
	var totalheight = 0;
	var main = $("#content"); //主体元素  
	$(window).scroll(function() {
		var srollPos = $(window).scrollTop(); //滚动条距顶部距离(页面超出窗口的高度)  

		//console.log("滚动条到顶部的垂直高度: "+$(document).scrollTop());  
		//console.log("页面的文档高度 ："+$(document).height());  
		//console.log('浏览器的高度：'+$(window).height());  

		totalheight = parseFloat($(window).height()) + parseFloat(srollPos);
		if (($(document).height() - range) <= totalheight && num != maxnum) {
			main.append("<div style='border:1px solid tomato;margin-top:20px;color:#ac" + (num % 20) + (num % 20) + ";height:" + elemt + "' >hello world" + srollPos + "---" + num + "</div>");
			num++;
		}
	});
	//-确认框
	window.confirmModal = function(msg, cb_cancel, cb_ok) {
			$('#confirmModal').modal('show');
			$("#confirmModal").children().eq(1).css("top", "200px");
			$("#confirmModal").find(".modal_message").html(msg);
			$("#confirmModal").off('click');
			$("#confirmModal")
				.on('click', '#btn_ok', function(event) {
					event.preventDefault();
					console.log('message: ok');
					$('#confirmModal').modal('hide')
					if (cb_ok && typeof cb_ok == 'function') {
						cb_ok();
					};
				})
				.on('click', '#btn_cancel', function(event) {
					event.preventDefault();
					console.log('message: cancel');
					$('#confirmModal').modal('hide')
					if (cb_cancel && typeof cb_cancel == 'function') {
						cb_cancel();
					};
				});
		}
		//－弹出框
	window.alertModal = function(msg, cb_cancel, cb_ok) {
		$('#alertModal').modal('show');
		$("#alertModal").children().eq(1).css("top", "200px");
		$("#alertModal").find(".modal_message").html(msg);
		$("#alertModal").off('click');
		$("#alertModal")
			.on('click', '#btn_ok', function(event) {
				event.preventDefault();
				console.log('message: ok');
				$('#alertModal').modal('hide')
				if (cb_ok && typeof cb_ok == 'function') {
					cb_ok();
				};
			})
			.on('click', '#btn_cancel', function(event) {
				event.preventDefault();
				console.log('message: cancel');
				$('#alertModal').modal('hide')
				if (cb_cancel && typeof cb_cancel == 'function') {
					cb_cancel();
				};
			});
	}

}(document))