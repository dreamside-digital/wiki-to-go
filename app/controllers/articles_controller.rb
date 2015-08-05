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

  def show
    article_id = params[:id]
    @article = Article.find article_id
    wiki_url = @article.url
    pdf = WickedPdf.new.pdf_from_url(wiki_url)
    save_path = Rails.root.join('public',"article-#{article_id}.pdf")
    File.open(save_path, 'wb') do |file|
      file << pdf
    end
    redirect_to "/article-#{article_id}.pdf"
  end

end
