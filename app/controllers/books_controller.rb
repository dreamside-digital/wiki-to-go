class BooksController < ApplicationController
	before_action :require_login, except: [:preview]

	def index
		@user = User.find(current_user.id)
		@books = @user.books.order(title: :asc)
	end

	def show
		@book = Book.find(params[:id])
		@articles = @book.articles.order(title: :asc)
		@markers_info = get_marker_info
	end

	def get_marker_info

		@articles.collect do |article|

			{
				title: article.title, 
				lat: article.latitude,
				lon: article.longitude,
				id: article.pageid
			}

		end
	end

	def new
		@user = User.find params[:user_id]
		@book = @user.books.new (book_params)
	end

	def create
		@user = User.find params[:user_id]

		if @user.books.find_by(title: params[:book][:title]) != nil
			@book = @user.books.find_by(title: params[:book][:title])
			@book.update_attributes(book_params)
			@articles = params[:book][:articles]
		else
			@book = @user.books.new(book_params)
			@articles = params[:book][:articles]
		end

		if @book.save
			ArticleCreator.new.create_articles(@book, @articles)
			render layout:false
		else
			redirect_to root_path
		end
	end

	def destroy
		@user = current_user
		@book = @user.books.find(params[:id])
		@book.destroy
		render layout:false
	end

	def export
		book_id = params[:id]
    @book = Book.find book_id
    @articles = @book.articles
    respond_to do |format|
      format.html
      format.pdf do
         render pdf: "book-#{book_id}",
                encoding: "utf-8"
      end
    end
	end

	private

	def book_params
		params.require(:book).permit(:title)
	end
end
