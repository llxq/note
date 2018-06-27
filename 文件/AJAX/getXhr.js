function getXhr(){
	var xhr=null;
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}else{
		xhr=activeX('Microsoft.XMLHttp');
	}
	return xhr;
}