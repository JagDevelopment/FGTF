	function onDeviceLoad()
	{
		document.addEventListener("deviceready", this.onDeviceReady(), false);
	}
	
	function onDeviceReady()
	{
		//alert("TestonDeviceReady");
		//alert("Chrome: " + enyo.platform.chrome + "webOS: " + enyo.platform.webos + "iOS: " + enyo.platform.ios + " IE: " + enyo.platform.ie);
		document.addEventListener("resume", this.onResume, false);
		document.addEventListener("pause", this.onPause, false);
		
		if (enyo.platform.webos == undefined)
		{
			this.dynamicScripts();
			setupAds();
		}
		
		//navigator.splashscreen.hide();
	}
	
	function onResume()
	{   setTimeout(function() {
          alert("TestResume");
        }, 0);
	}
	
	function onPause()
	{
		alert("TestPause");
	}
	
	function dynamicScripts() {
    var element;
    var cdn = new Array;

    cdn[0] = 'http://www.blackberry.com/app_includes/asdk/adBanner.js';

    for (var i in cdn) {
        element = document.createElement('script');
        element.setAttribute('type', 'text/javascript');
        element.setAttribute('src', cdn[i]);
        document.body.appendChild(element);
    }

}
	
	window.onload = onDeviceLoad();