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
    binding.pry
    articleID = params[:pageid]
    pdfmaker = ArticleCreator.new
    pdfmaker.delay.make_pdf(articleID)
  end

  def pdf_status
    articleID = params[:pageid].to_s
    file_path = 'public/' + articleID + '.pdf'
    if File.exists?(file_path)
      render json: { id: articleID }
    else
      render json: { status: "FAIL"}
    end
  end
end
