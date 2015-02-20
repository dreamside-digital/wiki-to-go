class SiteController < ApplicationController
	include HTTParty

	def index

	end

	def search

		query = params[:query]

		response = HTTParty.get('http://en.wikipedia.org/w/api.php?action=query&format=json&list=geosearch&gslimit=500&gsradius=10000&gspage=' + query)
		results = JSON.parse(response.body)
		@results_array = results["query"]["geosearch"]
		render layout:false

	end

	def coords

		location = params[:location]

		response = HTTParty.get('http://en.wikipedia.org/w/api.php?action=query&format=json&list=geosearch&gslimit=500&gsradius=10000&gscoord=' + location)
		results = JSON.parse(response.body)
		@results_array = results["query"]["geosearch"]
		render layout:false
	end

	def results
	end

end
