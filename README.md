# WIKI TO GO

 ---- my final project for the Ironhack web development bootcamp ---- 

## Features

 Wiki To Go is an app that lets you search Wikipedia by location - it will either detect your current location or you can search for any place you're interested in. 

 The app displays a map of all the nearby points of interest based. If you click on a point of interest, you'll get a preview, a picture, and a link to the full Wikipedia article. 

 You can save the articles into a collection to read later and even export them as a PDF. 


## How I made it

- Browser geolocation API to detect a user's location
- Google geocoding API to get the coordinates for user search queries
- Wikipedia API geosearch extension that lets you search with geographical coordinates and returns nearby articles that are also geotagged
- Wikipedia API to get the image and article previews for each article
- Google Maps Javascript API to display the map and markers
- WickedPDF gem and wkhtmltopdf to generate PDFs
- Bootstrap and custom CSS to make it look pretty
- Built with Ruby on Rails
- Powered by soy lattes and chocolate
