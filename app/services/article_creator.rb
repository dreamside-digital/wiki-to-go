class ArticleCreator
  def make_pdf(articleID)
    kit = PDFKit.new('https://en.wikipedia.org/?curid=' + articleID )
    file = kit.to_file('public/'+ articleID +'.pdf')
  end
end