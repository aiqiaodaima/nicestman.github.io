window.onload = function() {
	var content = document.getElementsByClassName("content")[0];
	var czk = document.getElementsByClassName("czk")[0];
	var imgs = czk.getElementsByTagName("img")[0];
	var ipt = czk.getElementsByTagName("input")[0];
	var btn = czk.getElementsByTagName("input")[1];
	var yh_tab = czk.getElementsByTagName("p")[0].getElementsByTagName("span")[0];
	var srcs = ["img/yh_1.png","img/yh_2.png"]
	var i=0;
	imgs.onclick = function () {
		if (i==0) {
			imgs.src = srcs[1];
			yh_tab.innerText = "2"
			i++;
		} else{
			imgs.src = srcs[0];
			yh_tab.innerText = "1"
			i=0;
		}
	}
	function flt(a,b,c) {
		content.innerHTML += "<div class='kj'><img src='img/yh_"+b+".png' style='float: "+a+";' /><span style='float: "+a+";text-align:"+a+"'>"+c+"</span><p style='float: "+a+";'>"+ipt.value+"</p></div>";
			ipt.value = "";
	}
	function scroll(scrollT) {
		var scrollTop = 0;
		var num = 0;
		var scrollH = content.scrollHeight;
		if (content.scrollTop==scrollT) {
			content.scrollTop = scrollH;
		} else{
			var timer = setInterval(function () {
				num = scrollH/10;
				content.scrollTop = content.scrollTop+num;
				if(content.scrollTop==scrollTop){
					clearInterval(timer);
					return;
				}
				scrollTop = content.scrollTop;
			},30);
		}
		
		
	}
	btn.onclick = function () {
		if (ipt.value.trim()) {
			scrollT = content.scrollTop;
			if (i==0) {
				flt("right","1","陈贤康");
			} else {
				flt("left","2","小欢欢");
			}
			scroll(scrollT);
		}
	}
}