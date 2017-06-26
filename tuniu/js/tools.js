
function addClass(ele,c){
	var ac = ele.className;
	ac += " "+ c;
	ele.className = ac;
}

function removeClass(ele,c){
	var ac = ele.className;
	if(ac){
		var all = ac.split(' ');
		for(var i=0;i<all.length;i++){
			if(all[i] == c){
				all.splice(i,1);
			}
		}
		all = all.join(' ');
		ele.className = all;
	}
}

function ele(name,parent){		
	parent = parent||document;
	var oF = name.substring(0,1);
	var aE = parent.getElementsByTagName('*');
	var arr = [];
	
	if(oF == '#'){
		var id = name.substring(1);
		return parent.getElementById(id);
	}else if(oF == '.'){
		var c = name.substring(1);
		for(var i=0;i<aE.length;i++){
			if(aE[i].className){
				var aC = aE[i].className.split(' ');
				for(var j=0;j<aC.length;j++){
					if(aC[j] == c){
						arr.push(aE[i]);
					}
				}							
			}
		}
		return arr;
	}else{
		return parent.getElementsByTagName(name);
	}
}

function getCSS(obj,attr){
	var value=null;
	if(obj.currentStyle){
		value = obj.currentStyle[attr];
	}else{
		value = getComputedStyle(obj)[attr];
	}
	
	if(attr == 'opacity'){
		return parseInt(value*100);
	}
	return parseFloat(value);

}

function toggleClass(ele,name){
	var c = ele.className;
	if(c){
		var all = c.split(' ');
		if(select(all,name) == -1){
			all.push(name);
		}else{
			all.splice(select(all,name),1);
		}
		ele.className = all.join(' ');	
	}else{
		ele.className = name;
	}
}

function select(arr,index){
	for(var i=0;i<arr.length;i++){
		if(arr[i] == index){
			return i;
		}
	}
	return -1;	
}

function bind(obj,event,fn){
	if(obj.attachEvent){//兼容IE
		obj.attachEvent('on'+event,function(){
			fn.call(obj);
		});
	}else{
		obj.addEventListener(event,fn);
	}
}

function view() {
	return {
		w:document.documentElement.clientWidth || document.body.clientWidth,
		h:document.documentElement.clientHeight || document.body.clientHeight
	};
}
