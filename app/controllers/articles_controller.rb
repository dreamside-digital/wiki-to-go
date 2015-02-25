class ArticlesController < ApplicationController
	belongs_to :book

  def new
    @user = User.find(current_user.id)
    @book = @user.books.find params[:book_id]
    @article = @book.articles.new
  end

	def create
    @user = User.find(current_user.id)
    @book = @user.books.find params[:book_id]
    @article = @book.articles.new article_params
    @article.save
    redirect_to user_book_path(@user.id, @book.id)  
	end

	def destroy
  end

  private

  def article_params
    params.require(:article).permit(:title, :pageid, :url, :latitude, :longitude)
  end

end
