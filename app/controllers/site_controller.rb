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

  def show_wiki_article
    wiki_service = WikipediaService.new
    preview = wiki_service.get_wikipedia_article_preview(params[:articleID])
    image = wiki_service.get_image_thumbnail(params[:articleID])
    respond_to do |format|
     format.html
     format.js {} 
     format.json { 
        render json: { :preview => preview, :image => image }
     } 
    end
  end

end
 