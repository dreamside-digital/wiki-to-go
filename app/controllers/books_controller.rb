class BooksController < ApplicationController

	def show
		@book = Book.find(params[:id])
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
