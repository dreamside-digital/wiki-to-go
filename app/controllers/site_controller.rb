class SiteController < ApplicationController
	include HTTParty

	attr_accessor :results_array

	def index
		@results_array
	end

	def search

		if params.include? :query
			response = search_query
		elsif params.include? :location
			response = search_coords
		else
			"hmmmm what?"
		end
		process_response(response)
		render layout:false

	end

	def search_query
		query = params[:query]
		response = HTTParty.get('http://en.wikipedia.org/w/api.php?action=query&format=json&generator=geosearch&ggslimit=50&ggsradius=10000&ggspage=' + query + '&prop=info&inprop=url')
	end

	def search_coords
		location = params[:location]
		response = HTTParty.get('http://en.wikipedia.org/w/api.php?action=query&format=json&generator=geosearch&ggslimit=50&ggsradius=10000&ggscoord=' + location + '&prop=info&inprop=url')
	end

	def process_response(response)

		results = JSON.parse(response.body)

		if response.code != 200
			render 'no_results'
		elsif results["error"].present?
			render 'no_results'
			flash[:search_error] = results["error"]["info"]
		else
			@results_array = results["query"]["pages"]
		end
	end
 

end
