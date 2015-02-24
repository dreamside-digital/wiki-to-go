class ArticlesController < ApplicationController
	belongs_to :book

	def create
    @book = Book.find params[:id]
    @article = @book.articles.create article_params
	end

	def destroy
  end

  private

  def article_params
    params.require(:article).permit(:title, :pageid, :url, :latitude, :longitude)
  end

end
