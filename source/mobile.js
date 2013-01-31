	if (enyo.platform.webos == undefined)
	{
		this.dynamicScripts();
	}	
	
	function onDeviceLoad()
	{
		document.addEventListener("deviceready", this.onDeviceReady(), false);
	}
	
	function onDeviceReady()
	{
		//Load splash screen
		//navigator.splashscreen.show(); 
		document.addEventListener("resume", this.onResume, false);
		document.addEventListener("pause", this.onPause, false);
		
		if (enyo.platform.webos == undefined)
		{
			this.dynamicScripts();
		}
		
		/*setTimeout(function() {
		//navigator.splashscreen.hide();
		}, 5000);*/
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
    var cdn = 'http://www.blackberry.com/app_includes/asdk/adBanner.js';

        element = document.createElement('script');
        element.setAttribute('type', 'text/javascript');
        element.setAttribute('src', cdn);
		
		if (document.body != null)
		{
			//Can make this a switch case statement if you need further dynamic scripts (or figure out how to work variables in there)
			document.write("<script type=\"text/javascript\" src=\"http://www.blackberry.com/app_includes/asdk/adBanner.js\"><\/script>");
		}

}
	
	window.onload = onDeviceLoad();