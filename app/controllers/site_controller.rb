class SiteController < ApplicationController

  attr_accessor :results

	def index
		@results
	end

	def search

    wiki_service = WikipediaService.new
    @results = wiki_service.search(params)
		render layout:false

	end

end
