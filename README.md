# hopindex-api

Base
https://dry-depths-20265.herokuapp.com

Endpoints
POST /
GET /
DELETE /:id

Beer object
{
	"id": UUID,
	"beerName": string,
	"style": string,
	"abv": string,
	"brewery": string,
	"rating": string,
	"cityState": string,
	"notes": string,
	"dateAdded": DATE
}

id: this is the id as assigned by UUID
beerName: this is the name of the beer, string
style: this is the style of the beer, string
abv: this is the abv of the beer, string
brewery: this is the name of the brewery, string
rating: this is the rating, string
cityState: this is the location as a city and state, string
notes: these are the notes the user wants to enter, string
dateAdded: this is the date the beer was entered as assigned by Date.Now, Date

GET response
{
	beers: [
		0{
		  "id": "5c93a0ddd4f69ad3b3dd2ba2",
		  "beerName": "Softly Spoken Magic Spells",
		  "style": "IIPA",
		  "abv": "8.5",
		  "brewery": "Singlecut Beersmiths",
		  "rating": "5",
		  "cityState": "Astoria, NY",
		  "notes": "double dry hopped version",
		  "dateAdded": "2016-08-01T02:02:56.611Z"
		}
		1{
		  "id": "5c93a0ddd4f69ad3b3dd2ba3",
		  "beerName": "Sumner",
		  "style": "Pale Ale",
		  "abv": "4.5",
		  "brewery": "Hill Farmstead",
		  "rating": "5",
		  "cityState": "Greensboro Bend, VT",
		  "notes": "a favorite pale ale",
		  "dateAdded": "2016-08-01T02:02:56.612Z"
		}	
	]
}...

POST 
{
	beers: [
		7{
		  "id": "5cb785556ae9600017760dbb",
		  "beerName": "Ten Fidy",
		  "style": "Stout",
		  "abv": "11",
		  "brewery": "Oscar Blues Brewery",
		  "rating": "4",
		  "cityState": "Asheville, NC",
		  "notes": "closest barrel aged stout to Bourbon County",
		  "dateAdded": "2019-04-17T19:58:13.838Z"
		}	
	]
}

DELETE
{
	id: "5c9915a29a377b362dc702bb"
}
