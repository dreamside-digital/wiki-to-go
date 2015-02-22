class SiteController < ApplicationController
	include HTTParty

	attr_accessor :full_results

	def index

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

	end

	def search_query
		query = params[:query]
		response = HTTParty.get('http://en.wikipedia.org/w/api.php?action=query&format=json&=geosearch&gslimit=50&gsradius=10000&gspage=' + query)
	end

	def search_coords
		location = params[:location]
		response = HTTParty.get('http://en.wikipedia.org/w/api.php?action=query&format=json&list=geosearch&gslimit=50&gsradius=10000&gscoord=' + location)
	end

	def process_response(response)

		results = JSON.parse(response.body)

		if response.code != 200
			render 'no_results'
		elsif results["error"].present?
			render 'no_results'
			flash[:search_error] = results["error"]["info"]
		else
			@results_array = results["query"]["geosearch"]
			@full_results = get_full_wiki_info
			render layout:false
		end
	end

	def get_full_wiki_info
		
		results_ids = []
		url = "http://en.wikipedia.org/w/api.php?action=query&format=json&prop=info&inprop=url&pageids="
		@results_array.each { |result| url << result["pageid"].to_s << "|"}
		response = HTTParty.get(url)
		parsed_response = JSON.parse(response.body)
		parsed_response["query"]["pages"]
	end
 

end
