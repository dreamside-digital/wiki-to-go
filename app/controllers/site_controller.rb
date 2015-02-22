class SiteController < ApplicationController
	include HTTParty

	def index

	end

	def search

		query = params[:query]

		response = HTTParty.get('http://en.wikipedia.org/w/api.php?action=query&format=json&list=geosearch&gslimit=500&gsradius=10000&gspage=' + query)
		results = JSON.parse(response.body)

		if response.code != 200
			render 'no_results'
		elsif results["error"].present?
			render 'no_results'
			flash[:search_error] = results["error"]["info"]
		else
			@results_array = results["query"]["geosearch"]
			render layout:false
		end

	end


	def coords

		location = params[:location]

		response = HTTParty.get('http://en.wikipedia.org/w/api.php?action=query&format=json&list=geosearch&gslimit=500&gsradius=10000&gscoord=' + location)
		results = JSON.parse(response.body)

		# @results_array = results["query"]["geosearch"]
		# render layout:false

		if response.code != 200
			render 'no_results'
		elsif results["error"].present?
			render 'no_results'
			flash[:search_error] = results["error"]["info"]
		else
			@results_array = results["query"]["geosearch"]
			render layout:false
		end
	end

	def results
	end

end
