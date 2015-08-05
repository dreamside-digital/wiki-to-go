class ArticleCreator

  def create_articles(book, articles)

    wiki_service = WikipediaService.new
    articles_with_intros = wiki_service.get_article_content(articles)

    articles_with_intros.each do |article|

      article_params = {
          title: article[1][:title],
          pageid: article[1][:id],
          url: 'http://en.wikipedia.org/?curid=' + article[1][:id].to_s,
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

end