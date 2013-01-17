	function onDeviceLoad()
	{
		document.addEventListener("deviceready", onDeviceReady, false);
	}
	
	function onDeviceReady()
	{
		document.addEventListener("resume", onResume, false);
		document.addEventListener("pause", onPause, false);
	}
	
	function onResume()
	{   setTimeout(function() {
          alert("TestResume");
        }, 0);
	}
	
	function onPause()
	{
		alert("Test2");
	}
	
	window.onload = onDeviceLoad();