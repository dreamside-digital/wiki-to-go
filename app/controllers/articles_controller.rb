class ArticlesController < ApplicationController
  before_action :require_login

	def destroy
    @user = current_user
    @book = @user.books.find(params[:book_id])
    @article = Article.find(params[:id])
    @article.destroy
    redirect_to user_book_path(@user, @book)
  end

end
