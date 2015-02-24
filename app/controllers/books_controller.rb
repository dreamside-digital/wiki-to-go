class BooksController < ApplicationController

	def new
		@user = User.find session[:user_id]
		@book = @user.books.create(book_params)
	end

	def show
		@book = Book.find(params[:id])
	end

	def create
		@user = User.find session[:user_id]
		@book = @user.books.create(book_params)

		if @book.save
			flash[:saved] = "Your personal wiki has been saved"
			redirect_to user_book_path(@book)
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
		params.require(:book).permit(:user_id, :articles)
	end
end
