class BooksController < ApplicationController
	before_action :require_login, except: [:preview]

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
			create_articles(@book, @articles)
			render layout:false
		else
			redirect_to root_path
		end
	end

	def create_articles(book, articles)

		wiki_service = WikipediaService.new
		articles_with_intros = wiki_service.get_article_content(articles)

		articles_with_intros.each do |article|

			article_params = {
					title: article[1][:title],
					pageid: article[1][:id],
					url: 'https://en.wikipedia.org/?curid=' + article[1][:id].to_s,
					latitude: article[1][:lat],
					longitude: article[1][:lon],
					intro: article[2][:intro]
			}
				
			if book.articles.find_by(pageid: article[1][:id]) != nil
				old_article = book.articles.find_by(pageid: article[1][:id])
				old_article.update_attributes(article_params)
			else
				book.articles.create(article_params)
			end
		end

	end

	def destroy
		@user = current_user
		@book = @user.books.find(params[:id])
		@book.destroy
		render layout:false
	end

	def edit
	end

	def update
	end

	def preview
		@book = Book.find(params[:id])
		@articles = @book.articles.all
	end

	def export
		pdfmaker = ArticleCreator.new
		pdfmaker.delay.make_book_pdf(params)
	end

	private

	def book_params
		params.require(:book).permit(:title)
	end
end
