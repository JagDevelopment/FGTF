var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var numDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var currentDate = new Date();
var currMonth = currentDate.getMonth();
var currYear = currentDate.getFullYear();
var currDate = currentDate.getDate();
var currDay = currentDate.getDay();
var isEvent = new Array();
var isMultiEvent = new Array();
var eventDatesStart = new Array();
var eventDatesFinal = new Array();
var row=0;
var allEvents = new Array();
var scope;
var multiEventList = new Array();
var streamedOnline;
var sortBy = "Show All";
var firstDate = new Array();
var lastDate = new Array();
var lastDayOnMonth;
var firebaseRef = new Firebase('https://jaredbeaudrot.firebaseio.com/');
var name="";
var password="";
var prizeIndex=-1;
var listOfGamesPrizes = new Array();
var prizes = new Array();
var prizeRowCount=0;
var prizeAtCount = new Array();
var prizeCountArray = new Array();
var bankLocation = [-1,-1];
var currentEvent="";
var eventPrizeRowCount=0;
var userEvents = new Array();
var userEventsCompleted = new Array();
var userEventsCreated = new Array();

enyo.kind({
	name: "Calendar",
	fit: true,
	allowHtml: true,
	components:[
	{name: "constantTitle", kind: "enyo.FittableColumns", components: [
	{name: "credits", content: "Credits", style: "float: left; width: 9.1%;", ontap: "toCredits"},
	{name: "title", classes: "title", ontap: "toHome", components: [ {kind:"enyo.Image", onload: "loadEventList", src: "assets/images/FGTFTitle2.png"} ] },
	{name: "login", content: "Login", style: "float: right; ", ontap: "toLogin"},
	]},
	{tag: "hr", classes: "divider"},
	{name: "basePanel", kind: "enyo.Panels", style: "height: 400px;", fit: true, draggable: false, components: [
		{name: "firstPanel", components: [
			{kind: "enyo.FittableColumns", classes: "monthFinder", components: [
			{name: "previous", content: "<-", style: "padding-left: 20%;", ontap: "toPrevious"},
			{name: "currDate", content: months[currMonth] + " " + currYear, style: "width: 50%"},
			{name: "next", content: "->", style: "padding-right: 20%;", ontap: "toNext"}, 
			]},
			{tag: "hr", name: "ruler", classes: "divider"},
			{name: "days", content: "sun mon tue wed thu fri sat", style: "font-variant: small-caps; word-spacing: 34px; margin-left: 5.5%;"},
			{name: "calendarRows", kind: "enyo.Repeater", count: 6, style: "margin-left: 2.4%;", onSetupItem: "setupCalendar", components: [
			{name: "calColumns", kind: "enyo.FittableColumns", style: "height: 50px;", components: [
				{name: "Sunday", content: "Sunday", classes: "calendarDay", ontap: "toEvent"},
				{name: "Monday", content: "Monday", classes: "calendarDay", ontap: "toEvent"},
				{name: "Tuesday", content: "Tuesday", classes: "calendarDay", ontap: "toEvent"},
				{name: "Wednesday", content: "Wednesday", classes: "calendarDay", ontap: "toEvent"},
				{name: "Thursday", content: "Thursday", classes: "calendarDay", ontap: "toEvent"},
				{name: "Friday", content: "Friday", classes: "calendarDay", ontap: "toEvent"},
				{name: "Saturday", content: "Saturday", classes: "calendarDay", ontap: "toEvent"},
				]}
			]},
			{kind: "enyo.FittableColumns", style: "padding-top: 5px; padding-left: 20%;", components: [
				{name: "sort", content: "Only show: ", style: "padding: 5px 3px 0px 0px;"},
				{kind: "onyx.MenuDecorator", components: [
						{name: "sortingContent", content: "Show All"},
						{name: "Sorting", kind: "onyx.Menu", floating: true, onSelect: "getSort", components: [
							{value: "Dead or Alive 5", content: "Dead or Alive 5", classes: "menuItem"},
							{value: "King of Fighters XIII", content: "King of Fighters XIII", classes: "menuItem"},
							{value: "Mortal Kombat 9", content: "Mortal Kombat 9", classes: "menuItem"},
							{value: "Persona 4 Arena", content: "Persona 4 Arena", classes: "menuItem"},
							{value: "Soul Calibur V", content: "Soul Calibur V", classes: "menuItem"},
							{value: "Street Fighter", content: "Street Fighter", classes: "menuItem"},
							{value: "Street Fighter X Tekken", content: "Street Fighter X Tekken", classes: "menuItem", style: "font-size: 84%;"},
							{value: "Super Smash Bros Brawl", content: "Super Smash Bros Brawl", classes: "menuItem", style: "font-size: 84%;"},
							{value: "Super Smash Bros Melee", content: "Super Smash Bros Melee", classes: "menuItem", style: "font-size: 84%;"},
							{value: "Tekken Tag Tournament 2", content: "Tekken Tag Tournament 2", classes: "menuItem", style: "font-size: 78%;"},
							{value: "Marvel vs Capcom 3", content: "Marvel vs Capcom 3", classes: "menuItem"},
							{value: "Show All", content: "Show All", classes: "menuItem"},
						]}
					]}
				]},
		]},
		{name: "creditsPanel", components: [
			{kind: "enyo.FittableRows", components: [
				{kind: "enyo.FittableColumns", components: [
				{content: "Fighting Game Tournament Finder was created by Jared Beaudrot. For any questions or comments, feel free to " +
				"reach me at entertainmentbyjag@gmail.com.", style: "font-size: 80%;"},
				]},
				{tag: "hr", style: "opacity: .5; width: 50%;"},
				{kind: "enyo.FittableColumns", components: [
				{content: "Fighting Game Tournament Finder has no affliation with any of the fighting games used in any tournament events.", style: "font-size: 80%"},
				]},
			]},
		]},
		{name: "loginPanel", components: [
			{kind: "enyo.FittableRows", name: "loginRows", components: [
				{content: "Enter your login information.", style: "text-align: center; padding-bottom: 5px;"},
				{kind: "enyo.FittableColumns", components: [
				{content: "Email:", style: "width: 51%;"},
				{content: "Password:"},
				]},
				{kind: "onyx.InputDecorator", style: "background-color: white; margin-right: 20px;", components:
					[{kind: "onyx.Input", defaultFocus:true, placeholder:"Email", name:"loginEmail", type: "text", ontap: "clearText"}]},
				{kind: "onyx.InputDecorator", style: "background-color: white;", components:
					[{kind: "onyx.Input", defaultFocus:true, value:"", name:"loginPassword", type: "password", ontap: "clearText"}]},
					{kind: "onyx.Button", content: "Log In", style: "margin-left: 38%; margin-top: 10px;", ontap: "loggingIn"},
				{kind: "enyo.FittableColumns", style: "padding-top: 10px;", components: [	
					{content: "Not registered yet?", style: "padding: 8px 20px 0px 0px;"},
					{kind: "onyx.Button", content: "Click here to sign up", ontap: "toRegister"},
					{kind: "onyx.Popup", name: "loginErrorPopup", floating: true, centered: true, autoDismiss: true,
					scrim: true, style: "padding: 10px;", components: [
						{content: "Your account information doesn't match up with our records. Please try again or register if you have not already done so."},
					]},
				]},
			]},
		]},
		{name: "registerPanel", components: [
			{kind: "enyo.FittableRows", components: [
				{content: "Enter your registration information.", style: "text-align: center; padding-bottom: 5px;"},
				{kind: "enyo.FittableColumns", components: [
					{content: "Name:", style: "width: 51%;"},
					{content: "Password:"},
				]},
				{kind: "onyx.InputDecorator", style: "background-color: white; margin-right: 20px;", components:
					[{kind: "onyx.Input", defaultFocus:true, placeholder:"Name", onchange: "watchLength", name:"registerName", type: "text", ontap: "clearText"}]},
				{kind: "onyx.InputDecorator", style: "background-color: white;", components:
					[{kind: "onyx.Input", defaultFocus:true, value:"", name:"registerPassword", type: "password", ontap: "clearText"}]},
					{content: "Email address: ", style: "margin-top: 20px;"},
				{kind: "onyx.InputDecorator", style: "background-color: white; margin-right: 20px; width: 97.5%", components:
					[{kind: "onyx.Input", defaultFocus:true, style: "width: 100%;", placeholder:"Email", name: "registerEmail", type: "text", ontap: "clearText"}]},
				{kind: "onyx.Button", content: "Register", ontap:"registerUser", style: "width: 50%; margin-left: 25%; margin-top: 25px;"},
				{content: "By registering, you can keep up with what tournaments you've gone or are going to, among other things!"}
			]},
			{kind: "onyx.Popup", name: "registered", floating: true, centered: true, autoDismiss: true,
				scrim: true, style: "padding: 10px;", components: [
					{content: "You're registered! Now go ahead and log in."},
				]},
				{kind: "onyx.Popup", name: "registerErrorPopup", floating: true, centered: true, autoDismiss: true,
				scrim: true, style: "padding: 10px;", components: [
					{name: "registerErrorPopupContent", content: "This name is already taken. Please try again."},
				]},
		]},
		{name: "loggedInPanel", components: [
			{name: "usersName", content: localStorage.userName, style: "text-align: center;"},
			{kind: "enyo.FittableColumns", components: [
				{content: "Log out", style: "text-align: left; width: 75%; padding-top: 10px;", ontap: "loggingOut"},	
				{content: "Create Event", style: "text-align: right; padding-top: 10px;", ontap: "toCreateEvent"},
			]},
			{kind: "enyo.Scroller", style: "height: 350px;", components: [
				{tag: "hr", classes: "divider2"},
				{content: "signed up for", classes: "promptText"},
				{name: "signedUpForRepeater", kind: "enyo.Repeater", onSetupItem: "setupSignedUpFor", count: 1,components: [
						{name: "signedUpFor", content: "", ontap: "toUserEvent", style: "width: 50%;"},
						//{name: "usersNumSignedUpFor", content: "", style: "width: 40%;"},
				]},
				{tag: "hr", classes: "divider2"},
				{content: "gone to", classes: "promptText"},
				{name: "tournamentsCompletedRepeater", kind: "enyo.Repeater", onSetupItem: "setupTournamentsCompleted", count: 1, components: [
						{name: "tournamentsCompleted", ontap: "toUserEvent", style: "width: 50%"},
					//	{name: "usersNumTournamentsCompleted", style: "width: 40%"},
				]},
				{tag: "hr", classes: "divider2"},
				{content: "you created", classes: "promptText"},
				{name: "tournamentsCreatedRepeater", kind: "enyo.Repeater", onSetupItem: "setupTournamentsCreated", count: 1,  components: [
					{kind: "enyo.FittableColumns", components: [				
						{name: "tournamentsCreated", content: "", ontap: "toUserEvent", style: "width: 50%"},
					//	{name: "usersNumCreated", content: ""},
					]},
				]},
			]},
		]},
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
					{kind: "onyx.MenuDecorator", maxHeight: "5px", components: [
						{name: "firstMonthContent", content: "Month"},
						{name: "firstMonth", kind: "onyx.Menu", onSelect: "getFirstMonth", components: [
							{name: "menuScroller2", kind: "enyo.Scroller", defaultKind: "onyx.MenuItem", vertical: "auto", classes: "enyo-unselectable", maxHeight: "200px", components: [
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
							]}
						]}
					]},
					{kind: "onyx.MenuDecorator", components: [
						{name: "firstDayContent", content: "Day"},
						{name: "firstDay", kind: "onyx.Menu", onSelect: "getFirstDay", components: [
							{name: "menuScroller3", kind: "enyo.Scroller", defaultKind: "onyx.MenuItem", vertical: "auto", classes: "enyo-unselectable", maxHeight: "200px", components: [
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
							]},
					]},
					{kind: "onyx.MenuDecorator", components: [
						{name: "firstYearContent", content: "Year"},
						{name: "firstYear", kind: "onyx.Menu", maxHeight: 200, onSelect: "getFirstYear", components: [
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
						{name: "lastMonth", kind: "onyx.Menu", onSelect: "getLastMonth", components: [
							{name: "menuScroller4", kind: "enyo.Scroller", defaultKind: "onyx.MenuItem", vertical: "auto", classes: "enyo-unselectable", maxHeight: "200px", components: [
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
							]}
						]}
					]},
					{kind: "onyx.MenuDecorator", components: [
						{name: "lastDayContent", content: "Day"},
						{name: "lastDay", kind: "onyx.Menu", onSelect: "getLastDay", components: [
							{name: "menuScroller5", kind: "enyo.Scroller", defaultKind: "onyx.MenuItem", vertical: "auto", classes: "enyo-unselectable", maxHeight: "200px", components: [
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
						]}
					]},
					{kind: "onyx.MenuDecorator", components: [
						{name: "lastYearContent", content: "Year"},
						{name: "lastYear", kind: "onyx.Menu", maxHeight: 200, onSelect: "getLastYear", components: [
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
						{name: "Place", content: "Prizes: ", style: "padding: 5px 5px 0px 0px; width: 35%;"},
							{kind: "onyx.InputDecorator", style: "background-color: white; height: 38px; width: 120px;", components:
									[{kind: "onyx.Input", classes: "textArea",  onchange: "resetPrizes", name:"Prizes", type: "text"}]},
						]},
				]},
				]},
				{content: "Add something to the games list to set prizes. Separate each game by a comma.", name: "prizePrompt"},
				{kind: "enyo.FittableColumns", style: "padding-right: 50px;", components: [
					{name: "addPrizeButton", content: "+", style: "margin-left: 25%; opacity: 0;", ontap: "addPrize"},
					{name: "removePrizeButton", content: "-", style: "margin-left: 25%; opacity: 0;", ontap: "removePrize"},
					{name: "prizeNotSpecified", content: "Not Specified", style: "margin-left: 25%; opacity: 0;", ontap: "notSpecified"},
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
			{kind: "onyx.Button", content: "Create Event", ontap:"createEvent", style: "margin-left: 30%; margin-top: 10px;"},
			{kind: "onyx.Popup", name: "createEventPopup", floating: true, centered: true, autoDismiss: true,
			scrim: true, style: "margin-left: 50px; padding: 10px;", components: [
				{name: "createEventPopupContent", content: "You need a name for your event."},
			]},
			]},
			]},
		]},
		
		{name: "eventPagePanel", components: [
			{kind: "enyo.Panels", name: "eventPanels",  style: "min-height: 100%; width: 100%;", draggable: false, components: [
				{name: "theEventPanel", components: [
					{kind: "enyo.Scroller", style: "height: 320px;", horizontal: "hidden", components: [
						{name: "thisEventName", content: "Event Name", style: "text-align: center;"},
						{name: "thisCreatedBy", style: "text-align: center;"},
							{tag: "hr", classes: "divider2"},
						{content: "Games: "},
						{name: "thisGamesPlayed", content: "Games Played"},
							{tag: "hr", classes: "divider2"},
						{content: "Location: "},
						{name: "thisEventLocation", content: "Event Location", allowHtml: true},
							{tag: "hr", classes: "divider2"},
						{name: "thisEventDate", content: "Event Date"},
							{tag: "hr", classes: "divider2"},
						{content: "Prizes: "},
						{kind: "enyo.FittableColumns", components: [
							{name: "eventPrizeRow", kind: "enyo.Repeater", style: "width: 30%;", count:0, onSetupItem: "setupEventGamesList", components: []},
							{name: "thisPrizes", kind: "enyo.Repeater", count: 0, style: "width: 70%; border-left: 2px inset #999;", onSetupItem: "setupEventPrizes", components: [
								{name: "prizeRow"},
							]},
						]},
							{tag: "hr", classes: "divider2"},
						{content: "Is this event streamed?"},
						{name: "thisStreamed", content: "Streamed"},
							{tag: "hr", classes: "divider2"},
						{name: "thisOtherNotes", content: "Other Notes", allowHtml: true},
							{tag: "hr", classes: "divider2"},
						{kind: "enyo.FittableColumns", components: [
						{name: "numSignedUpPrompt", style: "padding-right: 5px;", content: "Number of people signed up: "},
						{name: "numSignedUp"},
						]},
							{tag: "hr", classes: "divider2"},
						{kind: "enyo.FittableColumns", components: [
							{content: "Are you going to this event?",  style: "padding-right: 5px;",},
							{kind: "onyx.Button", content: "Yes!", ontap: "goingToEvent"},
							{kind: "onyx.Popup", name: "numSignedUpPopup", floating: true, centered: true, autoDismiss: true,
							scrim: true, style: "margin-left: 50px; padding: 10px;", components: [
								{content: "You already signed up for this event."},
							]},
							{kind: "onyx.Popup", name: "guestSignUpPopup", floating: true, centered: true, autoDismiss: true,
							scrim: true, style: "margin-left: 50px; padding: 10px;", components: [
								{content: "You need to be logged in to sign up for this event."},
							]},							
						]},
					]},
				]},
				{name: "multiEventPanel", components: [
					{kind: "enyo.Scroller", style: "height: 320px;", horizontal: "hidden", components: [
						{kind: "enyo.Repeater", name: "multiEventRepeater", count: 0, onSetupItem: "setupMultiEventRepeater", components: [
							{kind: "enyo.FittableColumns", components: [
								{name: "singleEventName", content: "Event", style: "width: 35%", ontap: "toMultiEvent"},
								{name: "singleEventSignedUpFor", style: "width: 30%", content: "num signed up", ontap: "toMultiEvent"},
								{name: "singleEventGames",  style: "width: 35%", content: "games", ontap: "toMultiEvent"},
							]},
							{tag: "hr", classes: "divider2"},
						]},
					]},
				]},
			]},
		]},
		{name: "extraPanel", components: [
			{kind: "enyo.FittableRows", name: "extraRow"},
		]},
	],
	},
	{name: "AdSpace", kind: "enyo.Control", id: "AdSpace3", tag: "div", style: "height: 36px; width: 400px;", fit: true},
	],
	
	setupCalendar: function(inSender, inEvent)
	{
		var item = inEvent.item;
		this.clearAll(item);
		var startDate = new Date(currYear, currMonth, 1);
		var startDay = startDate.getDay();
		
		if (currYear%4 == 0)
		{
			numDays[1] = 29;
		} else
		{
			numDays[1] = 28;
		}
		
		for (ndx=0; ndx <= 6; ndx++)
		{
			if (startDay == 0)
			{
				item.$[days[ndx]].setContent(1 + (7*row) + ndx);
			}
			else if (startDay == 1)
			{
				item.$[days[ndx]].setContent((7*row) + ndx);
			}
			else if (startDay == 2)
			{
				item.$[days[ndx]].setContent((7*row) + ndx - 1);
			}
			else if (startDay == 3)
			{
				item.$[days[ndx]].setContent((7*row) + ndx - 2);
			}
			else if (startDay == 4)
			{		
				item.$[days[ndx]].setContent((7*row) + ndx - 3);
			}
			else if (startDay == 5)
			{
				item.$[days[ndx]].setContent((7*row) + ndx - 4);
			}
			else if (startDay == 6)
			{
				item.$[days[ndx]].setContent((7*row) + ndx - 5);
			}
		}
		
		
		var rowContents = [item.$.Sunday.getContent(), item.$.Monday.getContent(), item.$.Tuesday.getContent(), item.$.Wednesday.getContent(),
		item.$.Thursday.getContent(), item.$.Friday.getContent(), item.$.Saturday.getContent()];
		
		for (ndx=0; ndx <= 6; ndx++)
		{
			if (rowContents[ndx] > numDays[currMonth])
			{
			
				item.$[days[ndx]].setContent(rowContents[ndx]-numDays[currMonth]);
				item.$[days[ndx]].addStyles("opacity: .4;");
			
			}
			
			if (rowContents[ndx] < 1)
			{
			
			newMonth = currMonth-1;
			if (newMonth < 0)
				newMonth = 11;
			
			item.$[days[ndx]].setContent(rowContents[ndx]+numDays[newMonth]);
			item.$[days[ndx]].addStyles("opacity: .4;");
			}
		}
			for (ndx=0; ndx <= 6; ndx++)
			{
				isEvent[rowContents[ndx]] = false;
				isMultiEvent[rowContents[ndx]] = false;
				isDayOfEvent = 0;
					
				for (counter=0; counter<eventDatesStart.length; counter++)
				{	
					currDay = rowContents[ndx];
					var currentEventDate = new Date(eventDatesStart[counter].year, eventDatesStart[counter].month, eventDatesStart[counter].day);
					isDayOfEvent = this.checkEventDates(currentEventDate, counter);
					
					if (isDayOfEvent == 1)
					{
						var gamesList = allEvents[counter].Games.split(",");
						for (trimNdx=0; trimNdx<gamesList.length; trimNdx++)
						{
							gamesList[trimNdx].trim();
						}
						var sortBln = false;
						var sortBln1 = false;
						var sortBln2 = false;
						
						if ((this.sortBy != "Show All") || (this.sortBy != undefined))
						{
							for (gamesNdx=0; gamesNdx < gamesList.length; gamesNdx++)
							{
								for (bankNdx=0; bankNdx < allBanks.length; bankNdx++)
								{
									for (indNdx=0; indNdx < allBanks[bankNdx].length; indNdx++)
									{
										if (this.sortBy == allBanks[bankNdx][indNdx])
										{
											sortBln1 = true;
											
											for (indNdx=0; indNdx < allBanks[bankNdx].length; indNdx++)
											{
												if (gamesList[gamesNdx].trim().toLowerCase() == allBanks[bankNdx][indNdx].toLowerCase())
												{
													sortBln2 = true;
													bankLocation[0] = bankNdx;
													bankLocation[1] = indNdx;
												}
											}
										}
									}
									if ((sortBln1 == true) && (sortBln2 == true))
									{
									sortBln = true;
									}
								}	
							}
						}
						
						if ((this.sortBy == "Show All") || (sortBln == true) || (this.sortBy == undefined))
						{
							if (currMonth == eventDatesStart[counter].month)
							{
								isEvent[eventDatesStart[counter].day] = true;
							}
							
							for (gamesNdx=0; gamesNdx < gamesList.length; gamesNdx++)
							{
								for (bankNdx=0; bankNdx < allBanks.length; bankNdx++)
								{
									for (indNdx=0; indNdx < allBanks[bankNdx].length; indNdx++)
									{
										if (gamesList[gamesNdx].trim() == allBanks[bankNdx][indNdx])
										{
											bankLocation[0] = bankNdx;
											bankLocation[1] = indNdx;
										}
									}
								}
							}
							
							if (gamesList.length == 1)
							{
								if (bankLocation[0] == 0)
								{
									item.$[days[ndx]].addStyles("background-image: url('assets/images/multiTournamentFinalsmall.png');");
								} 
								else if (bankLocation[0] == 2)
								{
									item.$[days[ndx]].addStyles("background-image: url('assets/images/multiTournamentFinalsmall.png');");
								}
								else if (bankLocation[0] == 4)
								{
									item.$[days[ndx]].addStyles("background-image: url('assets/images/multiTournamentFinalsmall.png');");
								}
								else if (bankLocation[0] == 6)
								{
									item.$[days[ndx]].addStyles("background-image: url('assets/images/multiTournamentFinalsmall.png');");
								}
								else
								{
									item.$[days[ndx]].addStyles("background-image: url('assets/images/multiTournamentFinalsmall.png');");
								}
							}
							else if (gamesList.length > 1)
							{
								item.$[days[ndx]].addStyles("background-image: url('assets/images/multiTournamentFinalsmall.png');");
							}
						}	
						
					}
					if ((eventDatesStart[counter].month == currMonth) && (eventDatesStart[counter].year == currYear))
					{
						for (z=0; z<eventDatesStart.length; z++)
						{
							if ((eventDatesStart[counter].day == eventDatesStart[z].day) && (eventDatesStart[counter].month == eventDatesStart[z].month) &&
							(eventDatesStart[counter].year == eventDatesStart[z].year) && (eventDatesStart[counter].name != eventDatesStart[z].name))
							{
								isMultiEvent[eventDatesStart[counter].day] = true;
							}
						}
					
					}
				}
		}
		row++;
	},
	
	checkEventDates: function (eventDate, aCounter)
	{
		if ((currDay == eventDatesStart[aCounter].day) && (currMonth == eventDatesStart[aCounter].month) && (currYear == eventDatesStart[aCounter].year))
		{
			return 1;
		}
		else
		{
			return 0;
		}
	},
	
	loggingOut: function(inSender, inEvent)
	{
		localStorage.userName = "";
		localStorage.isLoggedIn = false;
		
		if (this.$.loggedInName != undefined)
		{	
			this.$.loggedInName.destroy();
			
			var x = this.$.constantTitle.createComponent({name: "login", content: "Login", style: "float: right;", ontap: "toLogin"}, {owner: this});
			x.render();
		}
		
		userEvents.length = 0;
		userEventsCompleted.length = 0;
		userEventsCreated.length = 0;
		this.loadEventList();
		this.toHome();
	},
	
	loggingIn: function(inSender, inEvent)
	{
		var email = this.$.loginEmail.getValue();
		var password = this.$.loginPassword.getValue();
		var usersRef = firebaseRef.child('users');
		var usersList = new Array();
		var savedThis = this;
	
		var authClient = new FirebaseAuthClient(firebaseRef);
		
		authClient.login('password', email, password, function(error, token, user) {
		if (!error)
		{
			localStorage.isLoggedIn = true;
			
			usersRef.on('value', function(snapshot) {
				
				snapshot.forEach(function(childSnapshot) {
					if (user.id == childSnapshot.val().userid)
					{
						localStorage.userName = childSnapshot.val().name;
					}
				});
				
				savedThis.toHome();
			});
		  }
		  else
		  {
			savedThis.$.loginErrorPopup.show();
		  }
		});
	},
	
	alertTest: function(inSender, inEvent)
	{
		("test");
	},
	
	calendarResize: function(inSender, inEvent)
	{
		var startDay = new Date(currYear, currMonth, 1);
		row = 0;
		
		if ((startDay.getDay() < 5) && (numDays[currMonth] == 31))
		{
			this.$.calendarRows.setCount(5);
		}
		else if ((startDay.getDay() < 6) && (numDays[currMonth] == 30))
		{
			this.$.calendarRows.setCount(5);
		}
		else if ((startDay.getDay() == 0) && (numDays[currMonth] == 28))
		{
			this.$.calendarRows.setCount(4);
		}
		else if ((startDay.getDay() > 0) && (numDays[currMonth] == 28))
		{
			this.$.calendarRows.setCount(5);
		}
		else if ((numDays[currMonth] == 29))
		{
			this.$.calendarRows.setCount(5);
		}
		else
		{
		this.$.calendarRows.setCount(6);
		}
	},
	
	clearAll: function(item)
	{
		item.$.Sunday.addStyles("opacity: 1.0;");
		item.$.Sunday.addStyles("background-image: none");
		item.$.Monday.addStyles("opacity: 1.0;");
		item.$.Monday.addStyles("background-image: none");
		item.$.Tuesday.addStyles("opacity: 1.0;");
		item.$.Tuesday.addStyles("background-image: none");
		item.$.Wednesday.addStyles("opacity: 1.0;");
		item.$.Wednesday.addStyles("background-image: none");
		item.$.Thursday.addStyles("opacity: 1.0;");
		item.$.Thursday.addStyles("background-image: none");
		item.$.Friday.addStyles("opacity: 1.0;");
		item.$.Friday.addStyles("background-image: none");
		item.$.Saturday.addStyles("opacity: 1.0;");
		item.$.Saturday.addStyles("background-image: none");
	},
	
	clearText: function(inSender, inEvent) 
	{
		inSender.setValue("");
		inSender.setContent("");
	},
	
	watchLength: function(inSender, inEvent)
	{
		if (inSender.getValue().length > 14)
		{
			this.$.registerErrorPopupContent.setContent("Your username can only be a maximum of 14 characters.\n Updating your user name to reflect that.");
			this.$.registerErrorPopup.show();
			inSender.setValue(inSender.getValue().substring(0, 14));
		}
	},
	
	clearCreateEvent: function(inSender, inEvent)
	{
		this.$.eventName.setValue("");
		this.$.gamesPlayed.setValue("");
		this.$.eventLocation.setValue("");
		this.$.otherNotes.setValue("");
		this.$.prizeRepeater.setCount(0);
		this.$.prizeRepeater.createComponent({content: "Add something to the games list to set prizes. Separate each game by a comma.", name: "prizePrompt"});
		this.$.scopeContent.setContent("Scope");
		this.$.streamedContent.setContent("?");
		this.$.firstYearContent.setContent("Year");
		this.$.firstMonthContent.setContent("Month");
		this.$.firstDayContent.setContent("Day");
		this.$.lastDayContent.setContent("Day");
		this.$.lastMonthContent.setContent("Month");
		this.$.lastYearContent.setContent("Year");
		
	},
	
	clearLogin: function(inSender, inEvent)
	{
		this.$.loginEmail.setValue("");
		this.$.loginPassword.setValue("");
	},
	
	clearRegister: function(inSender, inEvent)
	{
		this.$.registerName.setValue("");
		this.$.registerPassword.setValue("");
		this.$.registerEmail.setValue("");
	},
	
	setupSignedUpFor: function(inSender, inEvent)
	{
	/** Make a reference to this user. Look through the tournaments he's signed up for. Add each one to this list if it hasn't happened yet.	**/
		var item = inEvent.item;
		var index = inEvent.index;

		if (((localStorage.isLoggedIn == true) || (localStorage.isLoggedIn == "true")) && (localStorage.userName != ""))
		{
			var usersRef = firebaseRef.child('users');
			var thisUserRef = usersRef.child(localStorage.userName);
			var thisUserEventsRef = thisUserRef.child("EventsAttending");
			
			if (userEvents.length == 0)
			{
				thisUserEventsRef.once('value', function(snapshot) {
					if (snapshot.val() != null)
					{
						userEvents = snapshot.val().toString().split(",");
					}
				});
			}

				/** Need to get events list to check the dates **/
				for (i=0; i < allEvents.length; i++)
				{
					if (allEvents[i].EventName == userEvents[index])
					{
							var EventDay = parseInt(allEvents[i].EventLastDay);
							var EventMonth = parseInt(allEvents[i].EventLastMonth);
							var EventYear = parseInt(allEvents[i].EventLastYear);
							var DateFinal = new Date(EventYear, EventMonth, EventDay);
							var currDate = new Date();
							
						if ((DateFinal - currDate) > 0)
						{
							item.$.signedUpFor.setContent(userEvents[index]);
						}
					}
				}
		}
	},
	
	setupTournamentsCompleted: function(inSender, inEvent)
	{
	/** Make a reference to this user. Look through the tournaments he's signed up for. Add each one to this list if it has already happened.	**/
		var item = inEvent.item;
		var index = inEvent.index;

		if (((localStorage.isLoggedIn == true) || (localStorage.isLoggedIn == "true")) && (localStorage.userName != ""))
		{
			var usersRef = firebaseRef.child('users');
			var thisUserRef = usersRef.child(localStorage.userName);
			var thisUserEventsRef = thisUserRef.child("EventsAttending");
			
			if (userEventsCompleted.length == 0)
			{
				thisUserEventsRef.once('value', function(snapshot) {
				if (snapshot.val() != null)
				{
					userEventsCompleted = snapshot.val().toString().split(",");
				}
				});
			}

				/** Need to get events list to check the dates **/
				for (i=0; i < allEvents.length; i++)
				{
					if (allEvents[i].EventName == userEventsCompleted[index])
					{
							var EventDay = parseInt(allEvents[i].EventLastDay);
							var EventMonth = parseInt(allEvents[i].EventLastMonth);
							var EventYear = parseInt(allEvents[i].EventLastYear);
							var DateFinal = new Date(EventYear, EventMonth, EventDay);
							var currDate = new Date();
							
						if ((DateFinal - currDate) <= 0)
						{
							item.$.tournamentsCompleted.setContent(userEventsCompleted[index]);
						}
					}
				}
		}
	},
	
	setupTournamentsCreated: function(inSender, inEvent)
	{
	/** Make a list of all of the events. Check the "created by" tag. If it matches localStorage.userName, add it **/
	var item = inEvent.item;
	var index = inEvent.index;
	
	if ((localStorage.isLoggedIn == "false") || (localStorage.isLoggedIn == undefined))
	{
		return;
	}
	
	var user = localStorage.userName;
	var usersRef = firebaseRef.child('users');
	var thisUserRef = usersRef.child(localStorage.userName);
	var thisUserEventsRef = thisUserRef.child("EventsCreated");

	
	if (userEventsCompleted.length == 0)
	{
		thisUserEventsRef.once('value', function(snapshot) {
			userEventsCreated = snapshot.val().toString().split(",");
		});
	}

	item.$.tournamentsCreated.setContent(userEventsCreated[index]);
	
	},
	
	getSort: function(inSender, inEvent) {
	if (inEvent.originator.value) {
			this.sortBy = inEvent.originator.value;
		}
		this.$.sortingContent.setContent(this.sortBy);
		
		this.loadEventList();
		this.toHome();
	},
	
	goingToEvent: function(inSender, inEvent) {
		/**
			set firebase references to the event and to the current user
			in the user's firebase reference, add this event to Events Attending (create this JSON object)
			in the event's firebase reference, add one to People Attending and add this user's name to the list of those attending (might want to make this
			whole thing a transaction)
			
			On user's login page, add this event to Events Attending if it hasn't happened yet
			If it has happened, move it to Events Attended
		**/
		
		if (localStorage.isLoggedIn == "false")
		{
			this.$.guestSignUpPopup.show();
			return;
		}
		
		var eventsRef = firebaseRef.child('events');
		var eventName = this.$.thisEventName.getContent();
		var thisEventRef = eventsRef.child(eventName);
		var usersRef = firebaseRef.child('users');
		var nameRef = usersRef.child(localStorage.userName);
		var index = 1;
		var alreadyExists = 0;
		var json = { };
		var eventSnapshot;
		var eventsArray = new Array();
		var savedThis = this;
		
		/**
		This handles all of the data on the user's end.
		**/
		
		nameRef.once('value', function(dataSnapshot) {
			eventSnapshot = dataSnapshot;
			
			if (eventSnapshot.hasChild('EventsAttending') == false)
			{
				var attendingRef = nameRef.child('EventsAttending');
				json[index] = currentEvent.EventName;
				attendingRef.update(json);
			}
			else if (eventSnapshot.hasChild('EventsAttending') == true)
			{
				var attendingRef = nameRef.child('EventsAttending');
				attendingRef.once('value', function(eventDataSnapshot) {
					eventsArray = eventDataSnapshot.val().toString().split(",");
					for (i in eventDataSnapshot.val())
					{
						if (i == index)
						{
							index = parseInt(i) + 1;
						}
					}
				
					json[index] = currentEvent.EventName;
					
					for (i=0; i<eventsArray.length; i++)
					{
						if (currentEvent.EventName == eventsArray[i])
						{
							alreadyExists = 1;
						}
					}
					
					if (alreadyExists == 0)
					{
						attendingRef.update(json);
						var newEventName = currentEvent.EventName;
						userEvents[userEvents.length+1] = newEventName;
						savedThis.$.signedUpForRepeater.setCount(savedThis.$.signedUpForRepeater.getCount()+1);
					}
				});
			}
		});
		
		/**
		This handles all of the data on the event's end.
		**/
		thisEventRef.once('value', function(eventSnapshot) {
			var countRef = thisEventRef.child('AttendingCount');
			var attendingUsersRef = thisEventRef.child('AttendingUsers');
			var newUser = true;
			var usersArray = new Array();
			
			attendingUsersRef.transaction(function(currentData) {
				if (currentData === null)
				{
					return {Users: localStorage.userName};
				}
				else
				{
					usersArray = currentData.Users.toString().split(",");
						
					for (i=0; i<usersArray.length; i++)
					{
						usersArray[i] = usersArray[i].trim();

						if (localStorage.userName == usersArray[i])
						{
							newUser = false;
						}
					}
					
					if (newUser == false)
					{
						savedThis.$.numSignedUpPopup.show();
						return;
					}
					else if (newUser == true)
					{	
						var returnUsers = usersArray + ", " + localStorage.userName;

						return {Users: returnUsers};
					}
				}
			});
			
			countRef.transaction(function(currentData) {
				if (currentData === null) {
					savedThis.$.numSignedUp.setContent(1);
					return {Count: 1};
				} else {
					if (newUser == true)
					{
						savedThis.$.numSignedUp.setContent(currentData.Count+1);
						return {Count: (currentData.Count+1)};
					}
					else
					{
						return ;
					}
				}
			});			
		});
		
	},
	
	toNext: function(inSender, inEvent)
	{
		var newMonth = currMonth+1;
		var newYear = currYear;
		row = 0;
		
		if (newMonth >= 12)
		{
			newMonth = 0;
			newYear++;
		}
	
		currentDate.setMonth(newMonth);
		currentDate.setFullYear(newYear);
		this.$.currDate.setContent(months[newMonth] + " " + newYear);
		
		currMonth = newMonth;
		currYear = newYear;
		

		for (i=0; i < this.$.calendarRows.getCount(); i++)
		{
			this.$.calendarRows.renderRow(i);
		}
		
		this.calendarResize();
		
	},
	
	toPrevious: function(inSender, inEvent)
	{
		var newMonth = currMonth-1;
		var newYear = currYear;
		row = 0;
		
		if (newMonth < 0)
		{
			newMonth = 11;
			newYear--;
		}
	
		currentDate.setMonth(newMonth);
		currentDate.setFullYear(newYear);
		this.$.currDate.setContent(months[newMonth] + " " + newYear);
		
		currMonth = newMonth;
		currYear = newYear;
				
		for (i=0; i < this.$.calendarRows.getCount(); i++)
		{
			this.$.calendarRows.renderRow(i);
		}
		
		this.calendarResize();
	},
	
	setupAds: function(inSender, inEvent)
	{
		var zoneId = 31848; //Test ID
		//var zoneId = 161498;  //Add your zone ID here
		//NEED TO RAISE THE AD UP SOME
		//CAN YOU CONTROL WHAT AD SHOWS ON WHAT DEVICE?
		var bannerObj = new blackberry.advertising.Banner(zoneId, "AdSpace3");
	},
	
	toHome: function(inSender, inEvent)
	{
		this.$.basePanel.setIndex(0);
		var originalMonth = new Date();
		row = 0;
		
		currentDate.setMonth(originalMonth.getMonth());
		this.$.currDate.setContent(months[originalMonth.getMonth()] + " " + originalMonth.getFullYear());
		currMonth = originalMonth.getMonth();		
		currYear = originalMonth.getFullYear();
		
		for (i=0; i < this.$.calendarRows.getCount(); i++)
		{
			this.$.calendarRows.renderRow(i);
		}
		
		if (this.$.eventPanels.getIndex() != 0)
		{
			this.$.eventPanels.setIndex(0);
		}
		
		this.alreadyLoggedIn();
		this.calendarResize();
		this.clearErrors();
		this.clearLogin();
		this.clearRegister();
		this.clearCreateEvent();
	},
	
	clearErrors: function(inSender, inEvent)
	{
		if (this.$.loginError != undefined)
		{
			this.$.loginError.destroy();
		}
	},
	
	toCredits: function(inSender, inEvent)
	{
		this.$.basePanel.setIndex(1);
	},
	
	toLogin: function(inSender, inEvent)
	{
		this.$.basePanel.setIndex(2);
	},
	
	toRegister: function(inSender, inEvent)
	{
		this.$.basePanel.setIndex(3);
	},
	
	registerUser: function(inSender, inEvent)
	{
		var savedThis = this;
		var usersRef = firebaseRef.child('users');
		
		tempName = this.$.registerName.getValue();
		password = this.$.registerPassword.getValue();
		var email = this.$.registerEmail.getValue();
		
		var nameRef = usersRef.child(tempName);
		var presenceRef = nameRef.child("online");
		var authClient = new FirebaseAuthClient(firebaseRef);
		
		authClient.createUser(email, password, function(error, user) {
		  if (!error) {
			localStorage.userName = tempName;
			localStorage.isLoggedin = true;
			nameRef.set({name: tempName, password: password, email: email, userid: user.id});
			presenceRef.setOnDisconnect(false);
			presenceRef.set(true);
			savedThis.$.registered.show();
			savedThis.toHome();
		  }
		  else
		  {
			savedThis.$.registeredErrorPopupContent.setContent("This name is already taken. Please try again.");
			savedThis.$.registerErrorPopup.show();
		  }
		});
	},
	
	toUserPage: function(inSender, inEvent)
	{
		this.$.basePanel.setIndex(4);
		this.$.usersName.setContent(localStorage.userName);
		this.$.signedUpForRepeater.setCount(userEvents.length);
		this.$.tournamentsCompletedRepeater.setCount(userEventsCompleted.length);
		this.$.tournamentsCreatedRepeater.setCount(userEventsCreated.length);
		
		if (this.$.signedUpForRepeater.getCount() == 0)
		{
			this.$.signedUpForRepeater.setCount(1);
		}
		
		if (this.$.tournamentsCompletedRepeater.getCount() == 0)
		{
			this.$.tournamentsCompletedRepeater.setCount(1);
		}
		
		if (this.$.tournamentsCreatedRepeater.getCount() == 0)
		{
		
			this.$.tournamentsCreatedRepeater.setCount(1);
		}
	},
	
	toCreateEvent: function(inSender, inEvent)
	{
		this.$.basePanel.setIndex(5);
	},
	
	toEvent: function(inSender, inEvent)
	{
		if (isEvent[inSender.getContent()] == true)
		{
			this.$.basePanel.setIndex(6);
		}
		
		if (isMultiEvent[inSender.getContent()] == false)
		{
			var ndx=0;
			this.$.thisPrizes.setCount(0);
		
			thisEventDay = allEvents[ndx].EventFirstDay;
			thisEventMonth = parseInt(allEvents[ndx].EventFirstMonth);
			
			for (ndx; ndx<allEvents.length; ndx++)
			{
				thisEventDay = allEvents[ndx].EventFirstDay;
				thisEventMonth = allEvents[ndx].EventFirstMonth;
				
				EventDate = (months[thisEventMonth]) + " " + thisEventDay + " " + allEvents[ndx].EventFirstYear + " to " + (months[parseInt(allEvents[ndx].EventLastMonth)]) + " " + 
			allEvents[ndx].EventLastDay + " " + allEvents[ndx].EventLastYear;
			
				if ((currMonth == thisEventMonth) && (inSender.getContent() == thisEventDay))
				{
					currentEvent = allEvents[ndx];
					this.$.thisEventName.setContent(allEvents[ndx].EventName);
					this.$.thisGamesPlayed.setContent(allEvents[ndx].Games);
					this.$.thisStreamed.setContent(allEvents[ndx].StreamedOnline);
					this.$.thisCreatedBy.setContent("Event posted by " + allEvents[ndx].CreatedBy);
					this.$.thisEventLocation.setContent(allEvents[ndx].Location);
					this.$.thisEventDate.setContent(EventDate);
					this.$.thisOtherNotes.setContent(allEvents[ndx].OtherNotes);
					
					if (allEvents[ndx].AttendingCount != undefined)
					{
						this.$.numSignedUp.setContent(allEvents[ndx].AttendingCount.Count);
					}
					else
					{
						this.$.numSignedUp.setContent("0");
					}
					
					this.$.thisCreatedBy.addStyles("color: #000000");
					if (this.$.thisCreatedBy.getContent() == "Event posted by admin")
					{
						//Make text red if created by admin
						this.$.thisCreatedBy.addStyles("color: #FF0000");
					}
					
					var gamesList = this.createGamesList(this.$.thisGamesPlayed.getContent());
					this.$.eventPrizeRow.setCount(gamesList.length);
					
					if (this.$.thisOtherNotes.getContent().search("www.") != -1)
					{				
						var tempNotes = this.$.thisOtherNotes.getContent();
						var link = tempNotes.search("www.");
						var tempSubstring1 = tempNotes.substring(0, link);
						var firstSpace = tempSubstring1.lastIndexOf(" ");
						var tempSubstring2 = tempNotes.substring(link);
						var secondSpace = tempSubstring2.indexOf(" ");

						if (secondSpace != -1)
						{
							var linkContent = tempNotes.substring(firstSpace, link + secondSpace);
							var theFinalLink = linkContent.link(linkContent);
							
							tempNotes = tempNotes.replace(linkContent, " " + theFinalLink);
							this.$.thisOtherNotes.setContent(tempNotes);
						}
						else if ((tempNotes.length == (tempSubstring2.length + link)) && (secondSpace == -1))
						{
							var linkContent = tempNotes.substring(firstSpace, tempNotes.length);
							var theFinalLink = linkContent.link(linkContent);
							
							tempNotes = tempNotes.replace(linkContent, " " + theFinalLink);
							this.$.thisOtherNotes.setContent(tempNotes);
						}
					} else if (this.$.thisOtherNotes.getContent().search("http") != -1)
					{				
						var tempNotes = this.$.thisOtherNotes.getContent();
						var link = tempNotes.search("http");
						var tempSubstring1 = tempNotes.substring(0, link);
						var firstSpace = tempSubstring1.lastIndexOf(" ");
						var tempSubstring2 = tempNotes.substring(link);
						var secondSpace = tempSubstring2.indexOf(" ");

						if (secondSpace != -1)
						{
							var linkContent = tempNotes.substring(firstSpace, link + secondSpace);
							var theFinalLink = linkContent.link(linkContent);
							
							tempNotes = tempNotes.replace(linkContent, " " + theFinalLink);
							this.$.thisOtherNotes.setContent(tempNotes);
						}
						else if ((tempNotes.length == (tempSubstring2.length + link)) && (secondSpace == -1))
						{
							var linkContent = tempNotes.substring(firstSpace, tempNotes.length);
							var theFinalLink = linkContent.link(linkContent);
							
							tempNotes = tempNotes.replace(linkContent, " " + theFinalLink);
							this.$.thisOtherNotes.setContent(tempNotes);
						}
					}
				}
			}
		} 
		else
		{
			this.$.eventPanels.setIndex(1);

			var multiEventCount=0;
			
			for (j=0; j < allEvents.length; j++)
			{
				if ((allEvents[j].EventFirstDay == inSender.getContent()) && (currMonth == allEvents[j].EventFirstMonth) && (allEvents[j].EventFirstYear == currYear))
				{
					multiEventList[multiEventCount] = allEvents[j];
					multiEventCount++;
				}
			}
			
			this.$.multiEventRepeater.setCount(multiEventCount);
		}
	},
	
	toUserEvent: function(inSender, inEvent)
	{
		this.$.basePanel.setIndex(6);
		
		for (ndx=0; ndx<allEvents.length; ndx++)
		{
			if (inSender.getContent() == allEvents[ndx].EventName)
			{
				thisEventDay = allEvents[ndx].EventFirstDay;
				thisEventMonth = allEvents[ndx].EventFirstMonth;
				
				EventDate = (months[thisEventMonth]) + " " + thisEventDay + " " + allEvents[ndx].EventFirstYear + " to " + (months[parseInt(allEvents[ndx].EventLastMonth)]) + " " + 
				allEvents[ndx].EventLastDay + " " + allEvents[ndx].EventLastYear;
				currentEvent = allEvents[ndx];
				this.$.thisEventName.setContent(allEvents[ndx].EventName);
				this.$.thisGamesPlayed.setContent(allEvents[ndx].Games);
				this.$.thisStreamed.setContent(allEvents[ndx].StreamedOnline);
				this.$.thisCreatedBy.setContent("Event posted by " + allEvents[ndx].CreatedBy);
				this.$.thisEventLocation.setContent(allEvents[ndx].Location);
				this.$.thisEventDate.setContent(EventDate);
				this.$.thisOtherNotes.setContent(allEvents[ndx].OtherNotes);
				
				if (allEvents[ndx].AttendingCount != undefined)
				{
					this.$.numSignedUp.setContent(allEvents[ndx].AttendingCount.Count);
				}
				else
				{
					this.$.numSignedUp.setContent("0");
				}
				
				this.$.thisCreatedBy.addStyles("color: #000000");
				if (this.$.thisCreatedBy.getContent() == "Event posted by admin")
				{
					//Make text red if created by admin
					this.$.thisCreatedBy.addStyles("color: #FF0000");
				}
				
				var gamesList = this.createGamesList(this.$.thisGamesPlayed.getContent());
				this.$.eventPrizeRow.setCount(gamesList.length);

				if (this.$.thisOtherNotes.getContent().search("www.") != -1)
				{				
					var tempNotes = this.$.thisOtherNotes.getContent();
					var link = tempNotes.search("www.");
					var tempSubstring1 = tempNotes.substring(0, link);
					var firstSpace = tempSubstring1.lastIndexOf(" ");
					var tempSubstring2 = tempNotes.substring(link);
					var secondSpace = tempSubstring2.indexOf(" ");

					if (secondSpace != -1)
					{
						var linkContent = tempNotes.substring(firstSpace, link + secondSpace);
						var theFinalLink = linkContent.link(linkContent);
						
						tempNotes = tempNotes.replace(linkContent, " " + theFinalLink);
						this.$.thisOtherNotes.setContent(tempNotes);
					}
					else if ((tempNotes.length == (tempSubstring2.length + link)) && (secondSpace == -1))
					{
						var linkContent = tempNotes.substring(firstSpace, tempNotes.length);
						var theFinalLink = linkContent.link(linkContent);
						
						tempNotes = tempNotes.replace(linkContent, " " + theFinalLink);
						this.$.thisOtherNotes.setContent(tempNotes);
					}
				}
			}
		}
	},
	
	setupMultiEventRepeater: function(inSender, inEvent)
	{
		item = inEvent.item;
		index = inEvent.index;
		
		if (multiEventList[index].AttendingCount != undefined)
		{
			item.$.singleEventName.setContent(multiEventList[index].EventName);
			item.$.singleEventSignedUpFor.setContent("# signed up: " + multiEventList[index].AttendingCount.Count);
			item.$.singleEventGames.setContent("Games: " + multiEventList[index].Games);
		}
		else
		{
			item.$.singleEventName.setContent(multiEventList[index].EventName);
			item.$.singleEventSignedUpFor.setContent("# signed up: 0");
			item.$.singleEventGames.setContent("Games: " + multiEventList[index].Games);
		}
		
		
	},
	
	toMultiEvent: function(inSender, inEvent)
	{
		index = inEvent.index;
		this.$.eventPanels.setIndex(0);
		this.$.thisPrizes.setCount(0);
		
		thisEventDay = multiEventList[index].EventFirstDay;
		thisEventMonth = parseInt(multiEventList[index].EventFirstMonth);

		thisEventDay = multiEventList[index].EventFirstDay;
		thisEventMonth = multiEventList[index].EventFirstMonth;
		
		EventDate = (months[thisEventMonth]) + " " + thisEventDay + " " + multiEventList[index].EventFirstYear + " to " + (months[parseInt(multiEventList[index].EventLastMonth)]) + " " + 
		multiEventList[index].EventLastDay + " " + multiEventList[index].EventLastYear;

			currentEvent = multiEventList[index];
			this.$.thisEventName.setContent(multiEventList[index].EventName);
			this.$.thisGamesPlayed.setContent(multiEventList[index].Games);
			this.$.thisStreamed.setContent(multiEventList[index].StreamedOnline);
			this.$.thisCreatedBy.setContent("Event posted by " + multiEventList[index].CreatedBy);
			this.$.thisEventLocation.setContent(multiEventList[index].Location);
			this.$.thisEventDate.setContent(EventDate);
			this.$.thisOtherNotes.setContent(multiEventList[index].OtherNotes);
			
			if (multiEventList[index].AttendingCount != undefined)
			{
				this.$.numSignedUp.setContent(multiEventList[index].AttendingCount.Count);
			}
			else
			{
				this.$.numSignedUp.setContent("0");
			}
			
			this.$.thisCreatedBy.addStyles("color: #000000");
			
			if (this.$.thisCreatedBy.getContent() == "Event posted by admin")
			{
				//Make text red if created by admin
				this.$.thisCreatedBy.addStyles("color: #FF0000");
			}
			
			var gamesList = this.createGamesList(this.$.thisGamesPlayed.getContent());
			this.$.eventPrizeRow.setCount(gamesList.length);
			
			if (this.$.thisOtherNotes.getContent().search("www.") != -1)
			{				
				var tempNotes = this.$.thisOtherNotes.getContent();
				var link = tempNotes.search("www.");
				var tempSubstring1 = tempNotes.substring(0, link);
				var firstSpace = tempSubstring1.lastIndexOf(" ");
				var tempSubstring2 = tempNotes.substring(link);
				var secondSpace = tempSubstring2.indexOf(" ");

				if (secondSpace != -1)
				{
					var linkContent = tempNotes.substring(firstSpace, link + secondSpace);
					var theFinalLink = linkContent.link(linkContent);
					
					tempNotes = tempNotes.replace(linkContent, " " + theFinalLink);
					this.$.thisOtherNotes.setContent(tempNotes);
				}
				else if ((tempNotes.length == (tempSubstring2.length + link)) && (secondSpace == -1))
				{
					var linkContent = tempNotes.substring(firstSpace, tempNotes.length);
					var theFinalLink = linkContent.link(linkContent);
					
					tempNotes = tempNotes.replace(linkContent, " " + theFinalLink);
					this.$.thisOtherNotes.setContent(tempNotes);
				}
			}
	},
	
	setupEventGamesList: function(inSender, inEvent)
	{
		item = inEvent.item;
		index = inEvent.index;
		var gamesList = this.createGamesList(this.$.thisGamesPlayed.getContent());
		item.createComponent({content: gamesList[index], ontap: "showEventPrizes", style: "opacity: .5;", name: "eventGame" + index}, 
		{owner: this});
	},
	
	alreadyLoggedIn: function(inSender, inEvent)
	{
		if (localStorage.isLoggedIn == "true")
		{
		name = localStorage.userName;
		
		if (name != "")
		{
			if (this.$.login != undefined)
			{	
				this.$.login.destroy();
				
				var x = this.$.constantTitle.createComponent({name: "loggedInName", content: name, style: "float: right;", ontap: "toUserPage"}, {owner: this});
				x.render();
			}
			
				var usersRef = firebaseRef.child('users');
				var nameRef = usersRef.child(name);
				var presenceRef = nameRef.child("online");
				presenceRef.setOnDisconnect(false);
				presenceRef.set(true);
			}
		}
	},
	
	loadEventList: function(inSender, inEvent)
	{
		var savedThis = this;
		var eventsRef = firebaseRef.child('events');
		this.calendarResize();
		this.alreadyLoggedIn();
		
		this.setupAds();
		
		eventsRef.on('value', function(snapshot) {
			var EventName = snapshot.val();
			var counter=0;
			allEvents.length = 0;
	
			/* Could potentially be a large data sink... If you can think of a more efficient way, do it.
			   Otherwise, use this until it becomes a problem. 
			*/
			snapshot.forEach(function(childSnapshot) {
			row = 0;
				allEvents[counter] = childSnapshot.val();
				//This only works for single digit months and double digit days... need to fix up event creation screen to make month, day, and year separate
				thisEventDay = parseInt(allEvents[counter].EventFirstDay);
				thisEventMonth = parseInt(allEvents[counter].EventFirstMonth);
				thisEventYear = parseInt(allEvents[counter].EventFirstYear);
				finalEventDay = parseInt(allEvents[counter].EventLastDay);
				finalEventMonth = parseInt(allEvents[counter].EventLastMonth);
				finalEventYear = parseInt(allEvents[counter].EventLastYear);
				var eventDateStart = new Date(thisEventYear, thisEventMonth, thisEventDay);
				var eventDateFinal = new Date(finalEventYear, finalEventMonth, finalEventDay);
				var thisEventsName = allEvents[counter].EventName;
				eventDatesStart[counter] = {day: thisEventDay, month: thisEventMonth, year: thisEventYear,
				length: parseInt((eventDateFinal - eventDateStart)) / 86400000, name: thisEventsName};
				counter++;
			});
			localStorage.EventListArray = allEvents;
			savedThis.$.calendarRows.setCount(savedThis.$.calendarRows.getCount());
		});
		
	},
	
	setupGamesList: function(inSender, inEvent)
	{
		item = inEvent.item;
		index = inEvent.index;
		itemName = "game" + index;
		var gamesList = new Array();
		gamesList = this.createGamesList(this.$.gamesPlayed.getValue());
		
		item.createComponent({content: gamesList[index], ontap: "showGamePrizes", style: "opacity: .5;", name: itemName}, {owner: this});
		this.$.addPrizeButton.addStyles("opacity: 1.0;");
		this.$.removePrizeButton.addStyles("opacity: 1.0;");
		this.$.prizeNotSpecified.addStyles("opacity: 1.0;");
		
		if (this.$.prizePrompt != undefined)
		{
			this.$.prizePrompt.destroy();
		}
	},
	
	createGamesList: function(entireList)
	{
		var gamesList = new Array();
		gamesList = entireList.split(",");
		
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
		gamesList = this.createGamesList(this.$.gamesPlayed.getValue());

		this.$.ListOfGames.setCount(gamesList.length);	
	},
	
	showEventPrizes: function(inSender, inEvent)
	{
		var gamesList = this.createGamesList(this.$.thisGamesPlayed.getContent());

		for (i=0; i < gamesList.length; i++)
		{
			this.$["eventGame"+i].addStyles("opacity: .5;");
		}
		
		inSender.addStyles("opacity: 1.0;");
		var j=0;
		while (gamesList[j] != inSender.getContent())
		{
			j++;
		}
		
		prizeAtCount = currentEvent.Prizes[j];
		this.$.thisPrizes.setCount(currentEvent.Prizes[j].length);
	},
	
	setupEventPrizes: function(inSender, inEvent)
	{	
		var item = inEvent.item;
		var index = inEvent.index;
		var prizeString = "";
		var quantifier = "";
		var eventPrizeRowCount = inEvent.index + 1;
		if ((eventPrizeRowCount%10 == 1) && (eventPrizeRowCount != 11))
		{
			quantifier = '\xA0' + eventPrizeRowCount+"st";
		}
		else if ((eventPrizeRowCount%10 == 2) && (eventPrizeRowCount != 12))
		{
			quantifier = '\xA0' + eventPrizeRowCount+"nd";
		}
		else if ((eventPrizeRowCount%10 == 3) && (eventPrizeRowCount != 13))
		{
			quantifier ='\xA0' + eventPrizeRowCount+"rd";
		}
		else
		{
			quantifier = '\xA0' +  eventPrizeRowCount+"th";
		}

		prizeString = quantifier + " place: " + prizeAtCount[index];
		item.$.prizeRow.setContent(prizeString);
		
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
			quantifier = prizeRowCount+"th";
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
	
	notSpecified: function(inSender, inEvent)
	{
		var currPrizeRows = this.$.prizeRepeater.getCount();

		for (i=0; i<currPrizeRows; i++)
		{
			listOfGamesPrizes[prizeIndex][i] = "Not Specified";
			this.$.prizeRepeater.renderRow(i);
		}

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
	/** if eventName is on the list already and the createdBy isn't admin or the user's localstorage name**/
	
		var eventName = this.$.eventName.getValue();
		var gamesPlayed = this.$.gamesPlayed.getValue();
		var eventLocation = this.$.eventLocation.getValue();
		var otherNotes = this.$.otherNotes.getValue();
		var savedThis = this;
		var index = 0;
		var updateJSON = { };
		/** Need to also do this for eventLocation. And, you're only replacing one. Need to replace all. Can use the match thing prob. **/
		
		//otherNotesReplaceTotal = otherNotes.match(
		while (otherNotes.search("\n") != -1)
		{
			otherNotes = otherNotes.replace("\n", "<br />");
		}
		
		while (eventLocation.search("\n") != -1)
		{
			eventLocation = eventLocation.replace("\n", "<br />");
		}
		
		
		var eventsRef = firebaseRef.child('events');
		
		if (eventName == "")
		{
			this.$.createEventPopupContent.setContent("You need a name for your event.");
			this.$.createEventPopup.show();
			return;
		}
		else
		{
			var eventNameRef = eventsRef.child(eventName);
		}
		
		var usersRef = firebaseRef.child('users');
		var nameRef = usersRef.child(localStorage.userName);

		if ((firstDate[0] == undefined) || (firstDate[1] == undefined) || (firstDate[2] == undefined) || (lastDate[1] == undefined) 
		|| (lastDate[0] == undefined) || (lastDate[2] == undefined))
		{
			this.$.createEventPopupContent.setContent("You need to set the first and last date of your event.");
			this.$.createEventPopup.show();
			return;
		}
		
		if (this.scope == undefined)
		{
			this.$.createEventPopupContent.setContent("Make sure to set the scope of your tournament.");
			this.$.createEventPopup.show();
			return;
		}
		
		if (this.streamedOnline == undefined)
		{
			this.$.createEventPopupContent.setContent("Make sure to specify whether your tournament is streamed or not.");
			this.$.createEventPopup.show();
			return;
		}
		
		var endSet = 0;
		
		eventsRef.on('value', function(snapshot) {
			
			snapshot.forEach(function(childSnapshot)
			{
				if ((childSnapshot.val().EventName == eventName) && ((childSnapshot.val().CreatedBy != "admin") 
				|| (childSnapshot.val().CreatedBy != localStorage.userName)))
				{
					savedThis.$.createEventPopupContent.setContent("This tournament has already been created.");
					savedThis.$.createEventPopup.show();
					endSet = 1;
				}
			});
			
			if (endSet == 0)
			{
				eventNameRef.set({EventName: eventName, Games: gamesPlayed, Location: eventLocation, EventFirstDay: firstDate[1], EventFirstMonth: firstDate[0],
				Prizes: listOfGamesPrizes, OtherNotes: otherNotes, EventFirstYear: firstDate[2], EventLastDay: lastDate[1], 
				EventLastMonth: lastDate[0], EventLastYear: lastDate[2], Scope: savedThis.scope, StreamedOnline: savedThis.streamedOnline,
				CreatedBy: localStorage.userName}, function(success) {
					if (success)
					{
						savedThis.$.createEventPopupContent.setContent("Alright! Your tournament has been added.");
						savedThis.$.createEventPopup.show();
					}
					else
					{
						savedThis.$.createEventPopupContent.setContent("There was an error creating your event. Either fill in missing information, or try creating it again.");
						savedThis.$.createEventPopup.show();
						return;
					}
			});
			}
		});
		
		nameRef.once('value', function(dataSnapshot) {
		
			if (dataSnapshot.hasChild('EventsCreated') == false)
			{
				var createdRef = nameRef.child('EventsCreated');
				
				updateJSON[index] = eventName;
				createdRef.update(updateJSON);
			}
			else if (dataSnapshot.hasChild('EventsAttending') == true)
			{
				var createdRef = nameRef.child('EventsCreated');
				
				createdRef.once('value', function(eventSnapshot) {
					for (i in eventSnapshot.val())
					{
						if (i == index)
						{
							index = parseInt(i) + 1;
						}
					}
					
					updateJSON[index] = eventName;
					createdRef.update(updateJSON);
			});
			}
		});
		
		this.loadEventList();
		this.toHome();
	},
});


