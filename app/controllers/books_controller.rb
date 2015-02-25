class BooksController < ApplicationController

	def index
		@user = User.find(current_user.id)
		@books = @user.books.order(title: :asc)
	end

	def show
		@book = Book.find(params[:id])
		@articles = @book.articles.order(title: :asc)
	end

	def new
		@user = User.find params[:user_id]
		@book = @user.books.new
	end

	def create
		@user = User.find params[:user_id]
		@book = @user.books.new(book_params)

		if @book.save
			flash[:saved] = "Your personal wiki has been saved"
			redirect_to root_path
		else
			redirect_to root_path
		end
	end

	def delete
	end

	def edit
	end

	def update
	end

	private

	def book_params
		params.require(:book).permit(:title, :articles)
	end
end
