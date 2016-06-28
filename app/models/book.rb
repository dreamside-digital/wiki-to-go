class Book < ActiveRecord::Base
	belongs_to :user
	has_many :articles

  def add_articles(articles)
    wiki_service = WikipediaService.new
    articles.each do |article|
      article_id = article[1][:id]
      article_params = {
          title: article[1][:title],
          pageid: article_id,
          url: "http://en.wikipedia.org/?curid=#{article_id.to_s}",
          latitude: article[1][:lat],
          longitude: article[1][:lon],
          intro: wiki_service.get_wikipedia_article_preview(article_id.to_s)
      }
      old_article = self.articles.find_by(pageid: article_id)
      old_article.present? ? old_article.update_attributes(article_params) : self.articles.create(article_params)
    end
  end

end
