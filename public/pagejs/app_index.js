/**
 * **
 * created by Ivan @2015-01-01
 * @param  {[type]} document [description]
 * @return {[type]}          [description]
 */
(function(document) {
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
	})

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