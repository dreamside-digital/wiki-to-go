class SiteController < ApplicationController

  attr_accessor :results
  before_action :disable_footer, only: [:index]

	def index
		@results
    if current_user
      @user = current_user
      @user_wikis = @user.books.order(updated_at: :desc).limit(5)
    end
	end

	def search
    wiki_service = WikipediaService.new
    @results = wiki_service.search(params)
		render layout:false
	end
end
 