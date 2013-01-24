	function onDeviceLoad()
	{
		document.addEventListener("deviceready", this.onDeviceReady(), false);
	}
	
	function onDeviceReady()
	{
		alert("TestonDeviceReady");
		document.addEventListener("resume", this.onResume, false);
		document.addEventListener("pause", this.onPause, false);
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
	
	window.onload = onDeviceLoad();