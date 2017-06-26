$(document).ready(function() {
	$('#fCont').click(function () {
		$.fn.fullpage.moveSectionDown()
	})
	$.fn.fullpage({
		navigation: true,
		loopBottom: true,
		afterRender: function() {
			section1();
		},
		onLeave: function(index, direction) {
			if(index == 1) {
				$('#fCont').css('opacity', 0);
			}
			if(index != 1) {
				$('#head').animate({
					opacity: 0
				}, 2000, 'swing');
			}
			if(index != 2) {
				$('#p1_head>img').removeAttr('style');
				$('#p1_cont').removeAttr('style');
			}
			if(index != 3) {
				$('#p2_warp').removeAttr('style');
				$('#p2pop>img').removeAttr('style');
				$('#p2_cont').removeAttr('style');
			}
			if(index != 4) {
				$('#p3hwarp').removeAttr('style');
				$('#p3_head img').removeAttr('style');
				$('#p3_cont').removeAttr('style');
				$('#p3nav').removeAttr('style');
			}
		},
		afterLoad: function(anchorLink, index) {
			if(index != 1) {
				$('#head').animate({
					opacity: 1
				}, 1000, 'swing');
				$('#p0_logo1,#download').stop(true).animate({
					opacity: 0
				}, 0);
				$('#slogan>img').removeAttr('style'); //不能使用css方法删除行内样式，直接删除style属性
				$('#bg').css('transform', 'rotate(-60deg) translateX(-354px) translateY(-20px)');
			}
			if(index == 1) {
				section1();
				$('#bg').removeAttr('style');
				setCss($('#fCont'));
			} else if(index == 2) {
				setCss($('#p1_head>img'), true);
				setCss($('#p1_cont'));
			} else if(index == 3) {
				setCss($('#p2_warp'), true);
				setCss($('#p2pop>img'), true);
				setCss($('#p2_cont'));
			} else if(index == 4) {
				setCss($('#p3hwarp'), true);
				setCss($('#p3_head>img'), true);
				setCss($('#p3_head>div>img'), true, 'ease-in', function(i) {
					var arr = ['2s 0s', '1.6s 0.4s', '1.2s 0.8s', '0.8s 1.2s', '0.4s 1.6s'];
					return arr[i];
				});
				setCss($('#p3_cont'));
				setCss($('#p3nav'));
			}
		}
	});

	function section1() {
		$('#p0_logo1,#download').delay(1000).animate({
			opacity: 1
		}, 1000, 'swing');
		setCss($('#slogan>img'), true, null, function(i) {
			var arr = ['2s 0s', '2s 0.5s', '2s 0.6s'];
			return arr[i];
		})
	}

	function setCss(obj, bl, type, arr) {
		obj.each(function(i, ele) {
			var dt = (typeof arr == 'function') && arr(i);
			var time = dt || '2s';
			var tf = bl ? 'matrix(1, 0, 0, 1, 0, 0)' : '';
			var type = type ? type : 'ease-in-out';
			$(ele).css({
				'opacity': 1,
				'transition': time + ' ' + type,
				'transform': tf
			})
		})
	}
});