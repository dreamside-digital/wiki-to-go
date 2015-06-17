class WikipediaService

  include HTTParty
  attr_accessor :results_array, :results

  def search(params)

    response = search_coords(params[:location])
    process_response(response)
    return @results

  end

  def search_coords(location)
		response = HTTParty.get('http://en.wikipedia.org/w/api.php?action=query&format=json&list=geosearch&gslimit=50&gsradius=10000&gscoord=' + CGI::escape(location) )
	end

	def process_response(response)

		results = JSON.parse(response.body)

		if response.code != 200
			render 'no_results'
		elsif results["error"].present?
			render 'no_results'
			flash[:search_error] = results["error"]["info"]
		else
			@results_array = results["query"]["geosearch"]
			get_marker_info
			@results_array
		end
	end
 
	def get_marker_info

		@results = []
		@results_array.each do |place|

      title = place["title"]
      lat = place["lat"]
      lon = place["lon"]
      id = place["pageid"]

			@results << {
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
    article_preview = response["query"]["pages"][articleID]["extract"]
  end

end