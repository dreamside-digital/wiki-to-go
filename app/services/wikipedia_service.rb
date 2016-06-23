class WikipediaService

  include HTTParty
  attr_accessor :results
  ROOT_URL = 'http://en.wikipedia.org/w/api.php'
  COMMON_PARAMS = '?action=query&format=json'
  HEADER = {'Api-User-Agent' => 'WikiToGo (sharon.peishan.kennedy@gmail.com)'}

  def search_by_location(location)
    url = ROOT_URL + COMMON_PARAMS + "&list=geosearch&gslimit=50&gsradius=10000&gscoord=#{CGI::escape(location)}"
    response = HTTParty.get(url, headers: HEADER)
    process_response(response)
  end

  def get_article_preview(article_id)
    {
      article_id: article_id,
      text: get_wikipedia_article_preview(article_id),
      image: get_image_thumbnail(article_id)
    }
  end


  private

	def process_response(response)
		results = JSON.parse(response.body)

		if response.code != 200
			render 'no_results'
		elsif results["error"].present?
			render 'no_results'
			flash[:search_error] = results["error"]["info"]
		else
			get_marker_info results["query"]["geosearch"]
		end
	end
 
	def get_marker_info(parsed_response)

		parsed_response.collect do |place|

      title = place["title"]
      lat = place["lat"]
      lon = place["lon"]
      id = place["pageid"]

			{
				title: title, 
				lat: lat,
				lon: lon,
				id: id
			}

		end
	end

  def get_article_content(articles)
    articles_with_intros = 
    articles.map do |article|
      articleID = article[1][:id]
      preview = get_wikipedia_article_preview(articleID)
      article << { intro: preview }
    end
    return articles_with_intros
  end

  def get_wikipedia_article_preview(articleID)
    response = HTTParty.get('http://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&pageids=' + articleID)
    response["query"]["pages"][articleID]["extract"]
  end

  def get_image_thumbnail(articleID)
    response = HTTParty.get("http://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&pithumbsize=300&pageids=" + articleID)
    response["query"]["pages"][articleID]["thumbnail"]["source"]
  end

end