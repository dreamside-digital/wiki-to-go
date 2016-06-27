class Api::BooksController < ApplicationController

  def current_user
    @user ||= User.find(params[:user_id])
  end

  def index
    render json: { books: current_user.books.order(title: :asc) }
  end

  def show
    book = Book.find(params[:id])
    articles = book.articles.order(title: :asc)
    markers = get_marker_info(articles)
    render json: { book: book, articles: articles, markers: markers }
  end

  def create
    book = current_user.books.new(book_params)
    articles = params[:book][:articles]

    if book.save
      # ArticleCreator.new.create_articles(book, articles)
      render json: { status: :success, book: { id: book.id, title: book.title, path: user_book_path(current_user, book) }}
    else
      render json: { status: :error, error_messages: book.errors.full_messages }
    end
  end

  def update
    book = current_user.books.find(params[:id])
    book.update_attributes(book_params)
    articles = params[:book][:articles]
    if book.save
      # ArticleCreator.new.create_articles(book, articles)
      render json: { status: :success, book: { id: book.id, title: book.title, path: user_book_path(current_user, book) }}
    else
      render json: { status: :error, error_messages: book.errors.full_messages }
    end
  end

  def destroy
    book = current_user.books.find(params[:id])
    book.destroy
    render json: { status: :success, book: { id: book.id }}
  end

  # def export
  #   book_id = params[:id]
  #   @book = Book.find book_id
  #   @articles = @book.articles
  #   @map_image_url = generate_map_image_url
  #   respond_to do |format|
  #     format.html
  #     format.pdf do
  #        render pdf: "book-#{book_id}",
  #               encoding: "utf-8"
  #     end
  #   end
  # end


  private

  def book_params
    params.require(:book).permit(:title)
  end

  def get_marker_info(articles)

    articles.collect do |article|

      {
        title: article.title, 
        lat: article.latitude,
        lon: article.longitude,
        id: article.pageid
      }

    end
  end

  def generate_map_image_url
    markers = get_marker_info
    root_url = "https://maps.googleapis.com/maps/api/staticmap?"
    parameters = markers.collect.with_index do |marker, i|
      "markers=color:orange|label:#{i+1}|#{marker[:lat]},#{marker[:lon]}"
    end
    parameters.push("key=#{ENV["google_static_map_key"]}")
    parameters.push("size=500x300")
    URI.escape(root_url + parameters.join("&"))
  end

end