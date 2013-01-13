enyo.kind({
kind: "Calendar",
name: "createEvent",
components: [

/**
Potential:
Add a reset prizes button that sets everything prize-wise back to square 1

**/


{name: "createEventPanel", components: [
			{kind: "enyo.FittableRows", components: [
			{kind: "enyo.Scroller", style: "height: 350px;", components: [
				{kind: "enyo.FittableColumns", style: "padding: 10px 0px 0px 5px;", components: [
					{content: "Event Name:", style: "padding: 5px 5px 0px 0px;"},
					{kind: "onyx.InputDecorator", style: "background-color: white;", components:
						[{kind: "onyx.Input", defaultFocus:true, classes: "textArea",  name:"eventName", type: "text"}]},
				]},
				{kind: "enyo.FittableColumns", style: "padding: 10px 0px 0px 5px;", components: [
					{content: "Games at Event: ", style: "padding: 5px 5px 0px 0px;"},
					{kind: "onyx.InputDecorator", style: "background-color: white;", components:
							[{kind: "onyx.Input", classes: "textArea", onchange: "renderGamesList",  name:"gamesPlayed", type: "text"}]},
				]},
				{kind: "enyo.FittableColumns", style: "padding: 10px 0px 0px 5px;", components: [
					{content: "Event Location: ", style: "padding: 15px 5px 0px 0px;"},
					{kind: "onyx.InputDecorator", style: "background-color: white;", components:
							[{kind: "onyx.TextArea", classes: "textArea", name:"eventLocation", type: "text"}]},
				]},
				{kind: "enyo.FittableColumns", style: "padding: 10px 0px 0px 5px;", components: [
					{content: "Start Date: ", style: "padding: 5px 5px 0px 0px;"},
					{kind: "onyx.MenuDecorator", components: [
						{name: "firstMonthContent", content: "Month"},
						{name: "firstMonth", kind: "onyx.Menu", maxHeight: 5, onSelect: "getFirstMonth", components: [
							//{kind: "enyo.Scroller", style: "height: 150px;", scrolling: false, components: [
								{value: "0", content: "Jan", classes: "menuItem"},
								{value: "1", content: "Feb", classes: "menuItem"},
								{value: "2", content: "Mar", classes: "menuItem"},
								{value: "3", content: "Apr", classes: "menuItem"},
								{value: "4", content: "May", classes: "menuItem"},
								{value: "5", content: "Jun", classes: "menuItem"},
								{value: "6", content: "Jul", classes: "menuItem"},
								{value: "7", content: "Aug", classes: "menuItem"},
								{value: "8", content: "Sep", classes: "menuItem"},
								{value: "9", content: "Oct", classes: "menuItem"},
								{value: "10", content: "Nov", classes: "menuItem"},
								{value: "11", content: "Dec", classes: "menuItem"},
							//]},
						]}
					]},
					{kind: "onyx.MenuDecorator", components: [
						{name: "firstDayContent", content: "Day"},
						{name: "firstDay", kind: "onyx.Menu", maxHeight: 8, scrolling: false, onSelect: "getFirstDay", components: [
							//{kind: "enyo.Scroller", style: "height: 180px;", components: [
								{value: "1", content: "1", classes: "menuItem"},
								{value: "2", content: "2", classes: "menuItem"},
								{value: "3", content: "3", classes: "menuItem"},
								{value: "4", content: "4", classes: "menuItem"},
								{value: "5", content: "5", classes: "menuItem"},
								{value: "6", content: "6", classes: "menuItem"},
								{value: "7", content: "7", classes: "menuItem"},
								{value: "8", content: "8", classes: "menuItem"},
								{value: "9", content: "9", classes: "menuItem"},
								{value: "10", content: "10", classes: "menuItem"},
								{value: "11", content: "11", classes: "menuItem"},
								{value: "12", content: "12", classes: "menuItem"},
								{value: "13", content: "13", classes: "menuItem"},
								{value: "13", content: "14", classes: "menuItem"},
								{value: "15", content: "15", classes: "menuItem"},
								{value: "16", content: "16", classes: "menuItem"},
								{value: "17", content: "17", classes: "menuItem"},
								{value: "18", content: "18", classes: "menuItem"},
								{value: "19", content: "19", classes: "menuItem"},
								{value: "20", content: "20", classes: "menuItem"},
								{value: "21", content: "21", classes: "menuItem"},
								{value: "22", content: "22", classes: "menuItem"},
								{value: "23", content: "23", classes: "menuItem"},
								{value: "24", content: "24", classes: "menuItem"},
								{value: "25", content: "25", classes: "menuItem"},
								{value: "26", content: "26", classes: "menuItem"},
								{value: "27", content: "27", classes: "menuItem"},
								{value: "28", content: "28", classes: "menuItem"},
								{value: "29", content: "29", classes: "menuItem"},
								{value: "30", content: "30", classes: "menuItem"},
								{value: "31", content: "31", classes: "menuItem"},
							]}
						//]}
					]},
					{kind: "onyx.MenuDecorator", components: [
						{name: "firstYearContent", content: "Year"},
						{name: "firstYear", kind: "onyx.Menu", onSelect: "getFirstYear", components: [
							{value: "2012", content: "2012", classes: "menuItem"},
							{value: "2013", content: "2013", classes: "menuItem"},
							{value: "2014", content: "2014", classes: "menuItem"},
							{value: "2015", content: "2015", classes: "menuItem"},
							{value: "2016", content: "2016", classes: "menuItem"},
						]}
					]}
				]},
				{kind: "enyo.FittableColumns", style: "padding: 10px 0px 0px 5px;", components: [
					{content: "End Date: ", style: "padding: 5px 5px 0px 0px;"},
					{kind: "onyx.MenuDecorator", components: [
						{name: "lastMonthContent", content: "Month"},
						{name: "lastMonth", kind: "onyx.Menu", maxHeight: 5, onSelect: "getLastMonth", components: [
							//{kind: "enyo.Scroller", style: "height: 150px;", scrolling: false, components: [
								{value: "0", content: "Jan", classes: "menuItem"},
								{value: "1", content: "Feb", classes: "menuItem"},
								{value: "2", content: "Mar", classes: "menuItem"},
								{value: "3", content: "Apr", classes: "menuItem"},
								{value: "4", content: "May", classes: "menuItem"},
								{value: "5", content: "Jun", classes: "menuItem"},
								{value: "6", content: "Jul", classes: "menuItem"},
								{value: "7", content: "Aug", classes: "menuItem"},
								{value: "8", content: "Sep", classes: "menuItem"},
								{value: "9", content: "Oct", classes: "menuItem"},
								{value: "10", content: "Nov", classes: "menuItem"},
								{value: "11", content: "Dec", classes: "menuItem"},
							//]},
						]}
					]},
					{kind: "onyx.MenuDecorator", components: [
						{name: "lastDayContent", content: "Day"},
						{name: "lastDay", kind: "onyx.Menu", maxHeight: 8, scrolling: false, onSelect: "getLastDay", components: [
							//{kind: "enyo.Scroller", style: "height: 180px;", components: [
								{value: "1", content: "1", classes: "menuItem"},
								{value: "2", content: "2", classes: "menuItem"},
								{value: "3", content: "3", classes: "menuItem"},
								{value: "4", content: "4", classes: "menuItem"},
								{value: "5", content: "5", classes: "menuItem"},
								{value: "6", content: "6", classes: "menuItem"},
								{value: "7", content: "7", classes: "menuItem"},
								{value: "8", content: "8", classes: "menuItem"},
								{value: "9", content: "9", classes: "menuItem"},
								{value: "10", content: "10", classes: "menuItem"},
								{value: "11", content: "11", classes: "menuItem"},
								{value: "12", content: "12", classes: "menuItem"},
								{value: "13", content: "13", classes: "menuItem"},
								{value: "13", content: "14", classes: "menuItem"},
								{value: "15", content: "15", classes: "menuItem"},
								{value: "16", content: "16", classes: "menuItem"},
								{value: "17", content: "17", classes: "menuItem"},
								{value: "18", content: "18", classes: "menuItem"},
								{value: "19", content: "19", classes: "menuItem"},
								{value: "20", content: "20", classes: "menuItem"},
								{value: "21", content: "21", classes: "menuItem"},
								{value: "22", content: "22", classes: "menuItem"},
								{value: "23", content: "23", classes: "menuItem"},
								{value: "24", content: "24", classes: "menuItem"},
								{value: "25", content: "25", classes: "menuItem"},
								{value: "26", content: "26", classes: "menuItem"},
								{value: "27", content: "27", classes: "menuItem"},
								{value: "28", content: "28", classes: "menuItem"},
								{value: "29", content: "29", classes: "menuItem"},
								{value: "30", content: "30", classes: "menuItem"},
								{value: "31", content: "31", classes: "menuItem"},
							]}
						//]}
					]},
					{kind: "onyx.MenuDecorator", components: [
						{name: "lastYearContent", content: "Year"},
						{name: "lastYear", kind: "onyx.Menu", onSelect: "getLastYear", components: [
							{value: "2012", content: "2012", classes: "menuItem"},
							{value: "2013", content: "2013", classes: "menuItem"},
							{value: "2014", content: "2014", classes: "menuItem"},
							{value: "2015", content: "2015", classes: "menuItem"},
							{value: "2016", content: "2016", classes: "menuItem"},
						]}
					]}
				]},
				{content: "Prizes: ", style: "padding: 5px 5px 0px 0px;"},
				{kind: "enyo.FittableColumns", components: [
					{name: "ListOfGames", kind: "enyo.Repeater", count: 0, style: "width: 30%;", onSetupItem: "setupGamesList", components: [
					]},
					{name: "prizeRepeater", kind: "enyo.Repeater", count: 0, style: "width: 70%; border-left: 2px inset #999;", onSetupItem: "setupPrizes", components: [
						{kind: "enyo.FittableColumns", style: "padding: 5px 0px 0px 5px;", components: [
						{name: "Place", content: "Prizes: ", style: "padding: 5px 5px 0px 0px;"},
							{kind: "onyx.InputDecorator", style: "background-color: white; height: 38px; width: 120px;", components:
									[{kind: "onyx.Input", classes: "textArea",  onchange: "resetPrizes", name:"Prizes", type: "text"}]},
						]},
				]},
				]},
				{content: "Add something to the games list to set prizes. Separate each game by a comma.", name: "prizePrompt"},
				{kind: "enyo.FittableColumns", style: "padding-right: 50px;", components: [
					{name: "addPrizeButton", content: "+", style: "margin-left: 25%; opacity: 0;", ontap: "addPrize"},
					{name: "removePrizeButton", content: "-", style: "margin-left: 25%; opacity: 0;", ontap: "removePrize"}
				]},
				{kind: "enyo.FittableColumns", style: "padding: 10px 0px 0px 5px;", components: [
					{content: "Scope: ", style: "padding: 5px 5px 0px 0px;"},
					{kind: "onyx.MenuDecorator", components: [
						{name: "scopeContent", content: "Scope"},
						{name: "Scope", kind: "onyx.Menu", onSelect: "getScope", components: [
							{value: "Local", content: "Local"},
							{value: "Regional", content: "Regional"},
							{value: "National", content: "National"},
						]}
					]},
				]},
				{kind: "enyo.FittableColumns", style: "padding: 10px 0px 0px 5px;", components: [
					{content: "Will this be streamed online?", style: "padding: 5px 5px 0px 0px;"},
					{kind: "onyx.MenuDecorator", components: [
						{name: "streamedContent", content: "?"},
						{name: "Streamed", kind: "onyx.Menu", onSelect: "getStreamed", components: [
							{value: "Yes", content: "Yes"},
							{value: "No", content: "No"},
						]}
					]},
				]},
				{kind: "enyo.FittableColumns", style: "padding: 10px 0px 0px 5px;", components: [
				{content: "Other notes: ", style: "padding: 15px 5px 0px 0px;"},
				{kind: "onyx.InputDecorator", style: "background-color: white;", components:
					[{kind: "onyx.TextArea", classes: "textArea", name:"otherNotes", type: "text"}]},
				]},
			{kind: "onyx.Button", content: "Create Event", ontap:"createEvent", style: "margin-left: 30%; margin-top: 10px;"}					
			]},
			]},
			
		]},


],

	setupGamesList: function(inSender, inEvent)
	{
		item = inEvent.item;
		index = inEvent.index;
		itemName = "game" + index;
		var gamesList = new Array();
		gamesList = this.createGamesList();
		
		item.createComponent({content: gamesList[index], ontap: "showGamePrizes", style: "opacity: .5;", name: itemName}, {owner: this});
		this.$.addPrizeButton.addStyles("opacity: 1.0;");
		this.$.removePrizeButton.addStyles("opacity: 1.0;");
		
		if (this.$.prizePrompt != undefined)
		{
			this.$.prizePrompt.destroy();
		}
	},
	
	createGamesList: function(inSender, inEvent)
	{
		var gamesList = new Array();
		gamesList = this.$.gamesPlayed.getValue().split(",");
		
		for (i=0; i < gamesList.length; i++)
		{
			if (gamesList[i].length > 13)
			{
			    shortened = gamesList[i].substring(0,13);
				gamesList[i] = shortened + "...";
			}
		}
		
		return gamesList;
	},
	
	renderGamesList: function(inSender, inEvent)
	{
		var gamesList = new Array();
		gamesList = this.createGamesList();

		this.$.ListOfGames.setCount(gamesList.length);	
	},
	
	showGamePrizes: function(inSender, inEvent)
	{
		prizeIndex = inEvent.index;

		for (i=0; i < this.$.ListOfGames.getCount(); i++)
		{
			this.$["game"+i].addStyles("opacity: .5;");
		}
		
		inSender.addStyles("opacity: 1.0;");
		
		if (prizeCountArray[prizeIndex] == undefined)
		{
			prizeCountArray[prizeIndex] = 3;
		}
		
		this.$.prizeRepeater.setCount(prizeCountArray[prizeIndex]);
		
		for (i=0; i < this.$.prizeRepeater.getCount(); i++)
		{
			this.$.prizeRepeater.renderRow(i);
		}

	},

	setupPrizes: function(inSender, inEvent)
	{
		item = inEvent.item;
		prizeRowCount++;
		quantifier = "";
		var tempPrizes = new Array();
		
		if ((prizeRowCount%10 == 1) && (prizeRowCount != 11))
		{
			quantifier = '\xA0' + prizeRowCount+"st";
		}
		else if ((prizeRowCount%10 == 2) && (prizeRowCount != 12))
		{
			quantifier = prizeRowCount+"nd";
		}
		else if ((prizeRowCount%10 == 3) && (prizeRowCount != 13))
		{
			quantifier = prizeRowCount+"rd";
		}
		else
		{
			quantifier = '\xA0' +  prizeRowCount+"th";
		}

		item.$.Place.setContent(quantifier + " place: ");
		
		//prizes[prizeRowCount-1] = item.$.Prizes.getValue();
		if (listOfGamesPrizes[prizeIndex] == undefined)
		{
			if (item.$.Prizes.getValue() != "Prizes") {
			tempPrizes[prizeRowCount-1] = item.$.Prizes.getValue();
			}
			
			item.$.Prizes.setValue(tempPrizes[prizeRowCount-1]);
			
			tempPrizes[prizeRowCount-1] = item.$.Prizes.getValue();
			
			if ((item.$.Prizes.getValue() == "undefined") || (item.$.Prizes.getValue() == undefined)) {
			item.$.Prizes.setValue("");
			}
			
			
			if (prizeRowCount == this.$.prizeRepeater.getCount())
			{
				prizeCountArray[inEvent.index] = prizeRowCount;
				prizeRowCount = 0;
			}
	
			listOfGamesPrizes[prizeIndex] = tempPrizes;
			//prizeCountArray[inEvent.index] = prizeRowCount;
		}
		else
		{
		/* Need to load the previous prizes */
			item.$.Prizes.setValue(listOfGamesPrizes[prizeIndex][prizeRowCount-1]);
			
			if ((item.$.Prizes.getValue() == "undefined") || (item.$.Prizes.getValue() == undefined)) {
				item.$.Prizes.setValue("");
			}
			
			if (prizeRowCount == this.$.prizeRepeater.getCount())
			{
				prizeCountArray[prizeIndex] = prizeRowCount;
				prizeRowCount = 0;
			}
		}
			
			console.log(prizeIndex + " " + prizeCountArray[prizeIndex]); //+ " " + listOfGamesPrizes[prizeIndex]);
	},
	
	addPrize: function(inSender, inEvent)
	{
		prizeRowCount=0;
		
		var tempArray = new Array();
	
		//Sets up the Item array, then passes info to temparray
		for (i=0; i < this.$.prizeRepeater.getCount(); i++)
		{
		this.$.prizeRepeater.renderRow(i);
		tempArray[i] = listOfGamesPrizes[prizeIndex][i];
		}
		//Sets the count, destroys items array
		this.$.prizeRepeater.setCount(prizeCountArray[prizeIndex] + 1);
		prizeCountArray[prizeIndex]++;
		//Resets the items array using temp array
		for (i=0; i < this.$.prizeRepeater.getCount(); i++){
		listOfGamesPrizes[prizeIndex][i] = tempArray[i];
		
		//Recalls setupRow after items array is reset
		this.$.prizeRepeater.renderRow(i);
		}
		
	},
	
	resetPrizes: function(inSender, inEvent)
	{
		listOfGamesPrizes[prizeIndex][inEvent.index] = inSender.getValue(); 
	},
	
	removePrize: function(inSender, inEvent)
	{
		prizeRowCount=0;
		
		var tempArray = new Array();
	
		//Sets up the Item array, then passes info to temparray
		for (i=0; i < this.$.prizeRepeater.getCount(); i++)
		{
		this.$.prizeRepeater.renderRow(i);
		tempArray[i] = listOfGamesPrizes[prizeIndex][i];
		}
		//Sets the count, destroys items array		
		this.$.prizeRepeater.setCount(prizeCountArray[prizeIndex] - 1);
		prizeCountArray[prizeIndex]--;
		
		//Resets the items array using temp array
		for (i=0; i < this.$.prizeRepeater.getCount(); i++){
		listOfGamesPrizes[prizeIndex][i] = tempArray[i];
		
		//Recalls setupRow after items array is reset
		this.$.prizeRepeater.renderRow(i);
		}
		
		listOfGamesPrizes[prizeIndex].length = listOfGamesPrizes[prizeIndex].length-1;
	},
	
	getScope: function(inSender, inEvent) {
		if (inEvent.originator.value) {
			this.scope = inEvent.originator.value;
		}
		
		this.$.scopeContent.setContent(this.scope);
	},

	getStreamed: function(inSender, inEvent) {
		if (inEvent.originator.value) {
			this.streamedOnline = inEvent.originator.value;
		}
		
		this.$.streamedContent.setContent(this.streamedOnline);
	},
	
	getFirstYear: function(inSender, inEvent) {
		if (inEvent.originator.value) {
			firstDate[2] = inEvent.originator.value;
			lastDate[2] = inEvent.originator.value;
		}
		
		this.$.firstYearContent.setContent(firstDate[2]);
		this.$.lastYearContent.setContent(firstDate[2]);
	},
	
	getFirstDay: function(inSender, inEvent) {
		if (inEvent.originator.value) {
			firstDate[1] = inEvent.originator.value;
			lastDate[1] = inEvent.originator.value;
		}
		
		this.$.firstDayContent.setContent(firstDate[1]);
		this.$.lastDayContent.setContent(firstDate[1]);
	},
	
	getFirstMonth: function(inSender, inEvent) {
		if (inEvent.originator.value) {
			firstDate[0] = inEvent.originator.value;
			lastDate[0] = inEvent.originator.value;
			month = inEvent.originator.content;
		}
		
		this.$.firstMonthContent.setContent(month);
		this.$.lastMonthContent.setContent(month);
	},
	
	getLastYear: function(inSender, inEvent) {
		if (inEvent.originator.value) {
			lastDate[2] = inEvent.originator.value;
		}
		this.$.lastYearContent.setContent(lastDate[2]);
	},
	
	getLastMonth: function(inSender, inEvent) {
		if (inEvent.originator.value) {
			lastDate[0] = inEvent.originator.value;
			month = inEvent.originator.content;
		}
		this.$.lastMonthContent.setContent(month);
	},
	
	getLastDay: function(inSender, inEvent) {
		if (inEvent.originator.value) {
			lastDate[1] = inEvent.originator.value;
		}
		
		this.$.lastDayContent.setContent(lastDate[1]);
	},
	
	clearText: function(inSender, inEvent) 
	{
		//Only if its default text? or perhaps if its the descriptor word beside it
		inSender.setValue("");
		inSender.setContent("");
	},
	
	createEvent: function(inSender, inEvent)
	{
	/** Set up Create Event and then you're good to go **/
	
		var eventName = this.$.eventName.getValue();
		var gamesPlayed = this.$.gamesPlayed.getValue();
		var eventLocation = this.$.eventLocation.getValue();
		var otherNotes = this.$.otherNotes.getValue();
		
		var eventsRef = firebaseRef.child('events');
		var eventNameRef = eventsRef.child(eventName);
		
		console.log(eventName + " " + gamesPlayed + " " + eventLocation + " " + firstDate[1] + " " + firstDate[0] + " " + prizes + " " + otherNotes + " " +
		firstDate[2] + " " + lastDate[1] + " " + lastDate[0] + " " + this.scope + " " + streamedOnline + " " + localStorage.userName + " " + lastDate[2]);
		

		eventNameRef.set({EventName: eventName, Games: gamesPlayed, Location: eventLocation, EventFirstDay: firstDate[1], EventFirstMonth: firstDate[0],
		Prizes: listOfGamesPrizes, OtherNotes: otherNotes, EventFirstYear: firstDate[2], EventLastDay: lastDate[1], 
		EventLastMonth: lastDate[0], EventLastYear: lastDate[2], Scope: this.scope, StreamedOnline: this.streamedOnline,
		CreatedBy: localStorage.userName});

		
		this.$.loadEventList();
		this.$.toHome();
	},
});