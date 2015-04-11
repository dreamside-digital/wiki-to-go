class ArticlesController < ApplicationController
  before_action :require_login

	def destroy
    @user = current_user
    @book = @user.books.find(params[:book_id])
    @article = Article.find(params[:id])
    @article.destroy
    redirect_to user_book_path(@user, @book)
  end

  def export_pdf
    pageid = params[:pageid].to_s
    articles = Article.where(pageid: pageid)
    pdfmaker = ArticleCreator.new
    pdfmaker.make_pdf(pageid, articles)
  end

  def pdf_status
    filename = params[:filename].to_s
    if ArticleCreator.new.pdf_status(filename)
      render json: { id: filename }
    else
      render json: { status: "FAIL"}
    end
  end
end
