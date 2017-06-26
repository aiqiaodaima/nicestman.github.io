var Tween = {
	linear: function(t, b, c, d) {
		return c * t / d + b;
	},
	easeIn: function(t, b, c, d) {
		return c * (t /= d) * t + b;
	},
	easeOut: function(t, b, c, d) {
		return -c * (t /= d) * (t - 2) + b;
	},
	easeBoth: function(t, b, c, d) {
		if((t /= d / 2) < 1) {
			return c / 2 * t * t + b;
		}
		return -c / 2 * ((--t) * (t - 2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d) {
		return c * (t /= d) * t * t * t + b;
	},
	easeOutStrong: function(t, b, c, d) {
		return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d) {
		if((t /= d / 2) < 1) {
			return c / 2 * t * t * t * t + b;
		}
		return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p) {
		if(t === 0) {
			return b;
		}
		if((t /= d) == 1) {
			return b + c;
		}
		if(!p) {
			p = d * 0.3;
		}
		if(!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	},
	elasticOut: function(t, b, c, d, a, p) {
		if(t === 0) {
			return b;
		}
		if((t /= d) == 1) {
			return b + c;
		}
		if(!p) {
			p = d * 0.3;
		}
		if(!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	},
	elasticBoth: function(t, b, c, d, a, p) {
		if(t === 0) {
			return b;
		}
		if((t /= d / 2) == 2) {
			return b + c;
		}
		if(!p) {
			p = d * (0.3 * 1.5);
		}
		if(!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		if(t < 1) {
			return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) *
				Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		}
		return a * Math.pow(2, -10 * (t -= 1)) *
			Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
	},
	backIn: function(t, b, c, d, s) {
		if(typeof s == 'undefined') {
			s = 1.70158;
		}
		return c * (t /= d) * t * ((s + 1) * t - s) + b;
	},
	backOut: function(t, b, c, d, s) {
		if(typeof s == 'undefined') {
			s = 1.70158; //回缩的距离
		}
		return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	},
	backBoth: function(t, b, c, d, s) {
		if(typeof s == 'undefined') {
			s = 1.70158;
		}
		if((t /= d / 2) < 1) {
			return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
		}
		return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d) {
		return c - Tween['bounceOut'](d - t, 0, c, d) + b;
	},
	bounceOut: function(t, b, c, d) {
		if((t /= d) < (1 / 2.75)) {
			return c * (7.5625 * t * t) + b;
		} else if(t < (2 / 2.75)) {
			return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
		} else if(t < (2.5 / 2.75)) {
			return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
		}
		return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
	},
	bounceBoth: function(t, b, c, d) {
		if(t < d / 2) {
			return Tween['bounceIn'](t * 2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
	}
};

function TMove(opation) {
	//obj,attr,target,time,type,callback,fn
	var json = {
		element: opation.element,
		time: opation.time,
		type: opation.type || 'linear',
		callback: opation.callback || function() {},
		fn: opation.fn || function() {},
		attrs: opation.attrs
	}
	var t = 0;
	var d = json.time / 20;
	json.timer = 0;
	var b = {};
	var c = {};
	for(var attr in json.attrs) {
		b[attr] = getCSS(json.element, attr);
		c[attr] = json.attrs[attr] - b[attr];
	}
	json.timer = setInterval(function() {
		t++;
		for(var x in b) {
			var num = Tween[json.type](t, b[x], c[x], d);
			if(x == 'opacity') {
				json.element.style[x] = num / 100;
				json.element.style.filter = 'alpha(opacity=' + num + ')';
			} else {
				json.element.style[x] = num + 'px';
			}
		}
		if(t >= d) {
			clearInterval(json.timer);
			json.callback;
		}
	}, 20)
}

function move(obj, attr, target, time, type, callback, fn) { //元素    样式    目标    达到\
	//目标的时间   运动形式
	//move(box,height,400,2000,linear)
	var t = 0; // 达到次数后关闭定时器

	var timer = 0;

	var b = getCSS(obj, attr); // 元素的初始状态值

	var c = target - b; // 目标值与初始值得差

	var d = time / 20; // 定时器运动的次数

	timer = setInterval(function() {
		t++;
		var num = Tween[type](t, b, c, d);
		if(attr == 'opacity') {
			obj.style[attr] = num / 100;
			obj.style.filter = 'alpha(opacity=' + num + ')';
		} else {
			obj.style[attr] = num + 'px';
		}

		fn && fn();
		if(t >= d) {
			clearInterval(timer)
			//				if(typeof callback == 'function'){
			//					callback();
			//				}
			(typeof callback) == 'function' && callback();
		}
	}, 20)
}

function getCSS(obj, attr) {
	var value = null;
	if(obj.currentStyle) {
		value = obj.currentStyle[attr];
	} else {
		value = getComputedStyle(obj)[attr];
	}
	if(value.indexOf('px') !== -1) {
		return parseFloat(value);
	} else {
		return parseFloat(value * 100);
	}
}