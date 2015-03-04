class ArticleCreator
  def make_pdf(pageid, articles)
    if pdf_status(pageid)
      file_path = ('public/'+ pageid +'.pdf')
      articles.each { |article| article.update_attribute(:pdf_path, file_path) }
    else
      kit = PDFKit.new('https://en.wikipedia.org/?curid=' + pageid )
      file = kit.to_file('public/'+ pageid +'.pdf')
      article.update_attribute(:pdf_path, file_path)
    end
  end

  def pdf_status(pageid)
    file_path = 'public/' + pageid + '.pdf'
    File.exists?(file_path)
  end
end