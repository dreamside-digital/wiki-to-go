class SiteController < ApplicationController

	def search
		query = params[:query]

		response = HTTParty.get('http://en.wikipedia.org/w/api.php?action=query&list=geosearch&gslimit=500&gsradius=10000&gspage=' + query)
		@results = JSON.parse(response.body)
		p @results
		render layout:false
	end

end
