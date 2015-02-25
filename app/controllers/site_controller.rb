class SiteController < ApplicationController

  attr_accessor :results

	def index
		@results
	end

	def search

    wiki_service = WikipediaService.new
    @results = wiki_service.search(params)
    session["all_results"] = @results
		render layout:false

	end

	def select_article
		@selected_articles = []
    article_id = params[:pageid]
    session["all_results"]
    binding.pry
    render layout:false
	end

end
