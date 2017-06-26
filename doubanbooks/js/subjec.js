window.onload = function () {
	var searchText = document.getElementById('inp_text');
	var searchBtn = document.getElementById('inp_btn');
	var box = document.getElementById('wrap');
	var count = document.getElementById('count');
	var cont = document.getElementById('cont');
	var pages = document.getElementById('page');
	var search = window.location.search.split('&');
	var hash = window.location.hash.split('=')[1];
	
	//content
	var title = document.getElementsByTagName('h1')[0];
	var lpic = document.getElementById('lpic');
	var info = document.getElementById('info');
	var rating_self = document.getElementById('rating_self');
	var contintro = document.getElementById('contintro');
	var authorintro = document.getElementById('authorintro');
	var h2 = document.getElementsByTagName('h2');
	if (search.length==2) {
		content(search[0].split('=')[1],search[1].split('=')[1])
	}
//	if (search) {
//		searchText.value = search;
//		ajax(search,hash)
//	}
	if (pages) {
		var ul = pages.getElementsByTagName('ul')[0];
	}
	if(hash){
		hash = hash.split('=')[1];
	}else{
		window.location.hash = 'page=1';
		hash = 1;
	}
	searchBtn.onclick = function () {
//		window.location.search = 'search_text=' + val;
		window.location.hash = 'page=1';
		hash = window.location.hash.split('=')[1];
		ajax(searchText.value,hash)
	}
	window.onhashchange = function () {
		hash = window.location.hash.split('=')[1];
		ajax(searchText.value,hash)
	}
	function ajax(value,hs) {
		jsonp({
			url: 'https://api.douban.com/v2/book/search',
			item: {
				q: value,
				count: 15,
				start: (hs-1)*15
			},
			callback:'callback',
			success:function(data){
				console.log(data);
				createBooks(data,hs,value);
				page(data.total,hs);
			}
		})
	}
	function createBooks(data,hash,val) {
		cont.innerHTML = '';
		ul.innerHTML = '';
		if (data.total=='0') {
			return;
		}
		count.innerHTML = '搜索结果'+(data.start+1)+'-'+(data.start+15)+'&nbsp;共'+data.total;
		var books = data.books;
		for (var i=0;i<books.length;i++) {
			arr = [books[i].author[0],books[i].translator[0],books[i].publisher,books[i].pubdate,books[i].price];
			cont.innerHTML += '<li>'+
								'<div class="pic">'+
									'<a href="" ><img src="'+books[i].image+'" width="90" /></a>'+
								'</div>'+
								'<dl class="info">'+
									'<dt>'+
										'<h2><a href="content.html?search='+i+'&value='+val+'#page='+hash+'" target="_blank">'+books[i].title+'</a></h2>'+
									'</dt>'+
									'<dd class="pub">'+pub(arr)+'</dd>'+
									'<dd class="star">'+
										'<span class="allstar"></span>'+
										'<span class="rating">'+books[i].rating.average+'</span>'+
										'<span class="rating_nums">('+books[i].rating.numRaters+'人评价)</span>'+
									'</dd>'+
								'</dl>'+
							 '</li>';
		}
	}
	function page(total,page) {
		allpage = Math.ceil(total/15);
		pageLeng = parseInt(page);
		if(pageLeng >= cont.count){
			window.location.hash='page='+allpage;
		}
		if (pageLeng<6) {
			pageLeng = 6;
		}
		if (pageLeng>allpage-4) {
			pageLeng = allpage-4;
		}
		for (var i=(pageLeng-5);i<=(pageLeng+4);i++) {
			if(i<=0||i>allpage){
				continue;
			}
			ul.innerHTML += '<li><a href="javascript:;">'+i+'</a></li>';
		}
		var As = ul.getElementsByTagName('a');
		for (var i=0;i<As.length;i++) {
			if (As[i].innerText==hash) {
				As[i].className = 'active';
			}
			As[i].onclick = function () {
				window.location.hash = 'page=' + this.innerText;
			}
		}
	}
	function pub(arr) {
		var str = [];
		for (var i=0;i<arr.length;i++) {
			if (arr[i]) {
				str.push(arr[i]);
			}
		}
		return str.join('/');
	}
	function jsonp(obj){
		obj.callback = obj.callback||'cb';
		obj.fnName = obj.fnName || "jQuery"+(''+Math.random()).replace(/0\./,'');
		var opation = obj.item;
		opation[obj.callback] = obj.fnName;
		var arr = [];
		for(var attr in opation){
			arr.push(attr+'='+opation[attr])
		}
		var oS = document.createElement('script');
		oS.src = obj.url+'?'+arr.join('&');
		document.body.appendChild(oS);
		
		window[obj.fnName]=function(data){
			obj.success(data);
			oS.remove();
		}
	}
	function content(index,value) {
		jsonp({
			url: 'https://api.douban.com/v2/book/search',
			item: {
				q: value,
				count: 15,
				start: (hash-1)*15
			},
			callback:'callback',
			success:function(data){
				console.log(data)
				var books = data.books[index];
				title.innerHTML = books.title;
				lpic.innerHTML = '<a href="'+books.images.large+'"><img src="'+books.images.large+'" width="107"/></a>';
				info.innerHTML = '<dl>'+
									'<dd>'+
										'<span>作者:&nbsp;</span>'+
										'<a href="">[日]'+books.author[0]+'</a>'+
									'</dd>'+
									'<dd><span>出版社:</span>'+books.publisher+'</dd>'+
									'<dd><span>出版年:</span>'+books.pubdate+'</dd>'+
									'<dd><span>定价:</span>'+books.price+'</dd>'+
									'<dd><span>装帧:</span>'+books.binding+'</dd>'+
									'<dd><span>ISBN:</span>'+books.isbn13+'</dd>'+
								 '</dl>';
				rating_self.innerHTML = '<strong>'+books.rating.average+'</strong>'+
										'<div class="rating_right ">'+
											'<span id="bigstar"></span>'+
											'<span id="rating_people"><a href="">'+books.rating.numRaters+'人评价</a></span>'+
										'</div>';
				if (books.summary) {
					contintro.innerHTML = books.summary;
				}else{
					h2[0].innerHTML = '';
				}
				if (books.author_intro) {
					authorintro	.innerHTML = books.author_intro;
				}else{
					h2[1].innerHTML = '';
				}
			}
		})
	}
}