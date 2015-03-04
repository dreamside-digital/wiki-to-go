class ArticleCreator
  def make_pdf(pageid, articles)
    if pdf_status(pageid)
      url = ('/'+ pageid +'.pdf')
      articles.each { |article| article.update_attribute(:pdf_path, url) }
    else
      kit = PDFKit.new('https://en.wikipedia.org/?curid=' + pageid )
      file = kit.to_file('public/'+ pageid +'.pdf')
      url = ('/'+ pageid +'.pdf')
      article.update_attribute(:pdf_path, url)
    end
  end

  def pdf_status(filename)
    file_path = 'public/' + filename + '.pdf'
    File.exists?(file_path)
  end

  def make_book_pdf(attrib)
    user_id = attrib[:user_id].to_s
    book_id = attrib[:id].to_s
    url = 'http://localhost:3000/users/' + user_id + '/books/' + book_id + '/preview'
    title = book_id
    kit = PDFKit.new(url)
    file = kit.to_file('public/'+ title +'.pdf')
    url = ('/'+ title +'.pdf')
    @book = Book.find(book_id)
    @book.update_attribute(:pdf_path, url)
  end
end