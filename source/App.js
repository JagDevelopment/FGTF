
/**
Fighting Game Tournament Planner

The point of this app is to make finding and planning for fighting game tournaments much easier.

**/


enyo.kind({
	name: "App",
	fit: true,
	style: "min-height: 650px; border: 3px ridge #000; background-image: url('assets/images/BGpic.png'); background-repeat: repeat;",
	components:[
	//	{name: "splash", kind:"enyo.Image", style: "z-index: 100; position:absolute; width: " + appWidth + "px; height: " + appHeight + "px;",
	//	onload: "splashScreen", src: "splash.png"},
		{kind: "Calendar"},
	],
	
	splashScreen: function(inSender, inEvent)
	{
		savedThis = this;
		
		setTimeout(function() {
			savedThis.$.splash.addStyles("z-index:-100; position: absolute;");
		}, 5000);
	},
});

