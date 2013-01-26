
/**
Fighting Game Tournament Planner

The point of this app is to make finding and planning for fighting game tournaments much easier.

**/


enyo.kind({
	name: "App",
	fit: true,
	style: "height: 500px; border: 3px ridge #000; background-image: url('assets/images/BGPic.png'); background-repeat: repeat;",
	components:[
		{kind: "Calendar"},
	],
});

