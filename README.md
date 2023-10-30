# hopindex-api

## Base<br>
https://hopindex-api-bc2ac5fac72f.herokuapp.com<br>
<br>
## Endpoints<br>
POST /<br>
GET /<br>
DELETE /:id<br>
<br>
## Beer object<br>
{<br>
	"id": UUID,<br>
	"beerName": string,<br>
	"style": string,<br>
	"abv": string,<br>
	"brewery": string,<br>
	"rating": string,<br>
	"cityState": string,<br>
	"notes": string,<br>
	"dateAdded": DATE<br>
}<br>
<br>
id: this is the id as assigned by UUID<br>
beerName: this is the name of the beer, string<br>
style: this is the style of the beer, string<br>
abv: this is the abv of the beer, string<br>
brewery: this is the name of the brewery, string<br>
rating: this is the rating, string<br>
cityState: this is the location as a city and state, string<br>
notes: these are the notes the user wants to enter, string<br>
dateAdded: this is the date the beer was entered as assigned by Date.Now, Date<br>
<br>
## GET<br>
{<br>
	beers: [<br>
		0{<br>
		  "id": "5c93a0ddd4f69ad3b3dd2ba2",<br>
		  "beerName": "Softly Spoken Magic Spells",<br>
		  "style": "IIPA",<br>
		  "abv": "8.5",<br>
		  "brewery": "Singlecut Beersmiths",<br>
		  "rating": "5",<br>
		  "cityState": "Astoria, NY",<br>
		  "notes": "double dry hopped version",<br>
		  "dateAdded": "2016-08-01T02:02:56.611Z"<br>
		}<br>
		1{<br>
		  "id": "5c93a0ddd4f69ad3b3dd2ba3",<br>
		  "beerName": "Sumner",<br>
		  "style": "Pale Ale",<br>
		  "abv": "4.5",<br>
		  "brewery": "Hill Farmstead",<br>
		  "rating": "5",<br>
		  "cityState": "Greensboro Bend, VT",<br>
		  "notes": "a favorite pale ale",<br>
		  "dateAdded": "2016-08-01T02:02:56.612Z"<br>
		}<br>
	]<br>
}...<br>
<br>
## POST<br>
{<br>
	beers: [<br>
		7{<br>
		  "id": "5cb785556ae9600017760dbb",<br>
		  "beerName": "Ten Fidy",<br>
		  "style": "Stout",<br>
		  "abv": "11",<br>
		  "brewery": "Oscar Blues Brewery",<br>
		  "rating": "4",<br>
		  "cityState": "Asheville, NC",<br>
		  "notes": "closest barrel aged stout to Bourbon County",<br>
		  "dateAdded": "2019-04-17T19:58:13.838Z"<br>
		}<br>
	]<br>
}<br>
<br>
## DELETE<br>
{<br>
	id: "5c9915a29a377b362dc702bb"<br>
}
