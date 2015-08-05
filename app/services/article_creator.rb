class ArticleCreator

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

  def make_pdf(pageid, articles)
    if pdf_status(pageid)
      url = ('/'+ pageid +'.pdf')
      articles.each { |article| article.update_attribute(:pdf_path, url) }
    else
      # kit = PDFKit.new('https://en.wikipedia.org/?curid=' + pageid )
      # file = kit.to_file('public/'+ pageid +'.pdf')
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
    if Rails.env.production?
      host = "http://www.wikitogo.co/"
    else
      host = "http://localhost:3000/"
    end
    url = host + 'users/' + user_id + '/books/' + book_id + '/preview'
    title = book_id
    # kit = PDFKit.new(url)
    # file = kit.delay.to_file('public/'+ title +'.pdf')
    url = ('/'+ title +'.pdf')
    @book = Book.find(book_id)
    @book.update_attribute(:pdf_path, url)
  end
end