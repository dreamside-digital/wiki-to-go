class ArticlesController < ApplicationController
	belongs_to :book

  def new
    @user = User.find(current_user.id)
    @book = @user.books.find params[:book_id]
    @article = @book.articles.new
  end

	def create
	end

	def destroy
  end

  private

  def article_params
    params.require(:article).permit(:title, :pageid, :url, :latitude, :longitude, :intro)
  end

end
