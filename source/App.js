
/**
Fighting Game Tournament Planner

The point of this app is to make finding and planning for fighting game tournaments much easier.

Finding -
There will be a built in calendar that holds information for all fighting games. The calendar will be color coded by game. Major tournaments will have something
special to show them, like a large VS or something. Anyone will be able to add a tournament, although specials TO's will be marked. Make a login system where
people have to login to view tournaments they have marked. You have to login to add a tournament. TO's names will be in purple, normal people will be in black.

Planner - 
There will also be a planner page. This encourages people to budget out money and plan for the trip. This screen will have a countdown of days until the tournament
and check to see if this is a sequel tournament (like Apex 2012 -> Apex 2013. This will be noted by the TO). If this is a sequel tournament, it will 
display the results if they are in the database. Only the TO can change the results.

**/


enyo.kind({
	name: "App",
	fit: true,
	style: "width: 420px; height: 500px; border: 3px ridge #000;",
	components:[
		{kind: "Calendar"}
	],
});

