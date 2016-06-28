class WikipediaService

  include HTTParty
  attr_accessor :results
  ROOT_URL = 'http://en.wikipedia.org/w/api.php'
  COMMON_PARAMS = '?action=query&format=json'
  HEADER = {'Api-User-Agent' => 'WikiToGo (sharon.peishan.kennedy@gmail.com)'}

  def search_by_location(location)
    begin
      url = ROOT_URL + COMMON_PARAMS + "&list=geosearch&gslimit=50&gsradius=10000&gscoord=#{CGI::escape(location)}"
      response = HTTParty.get(url, headers: HEADER)
    rescue
      wiki_error
    end
    process_response(response)
  end

  def get_article_preview(article_id)
    begin
      {
        article_id: article_id,
        text: get_wikipedia_article_preview(article_id),
        image: get_image_thumbnail(article_id)
      }
    rescue
      wiki_error("Invalid page id", "No preview available")
    end
  end

  
  private

  def process_response(response)
    wiki_error("bad request", "The query failed, please try again.") if response.code != 200
    results = JSON.parse(response.body)
    if results["error"].present?
      wiki_error(results["error"]["code"], results["error"]["info"])
    elsif results["query"]["geosearch"].present?
      get_marker_info results["query"]["geosearch"]
    else
      wiki_error
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


  def get_wikipedia_article_preview(article_id)
    begin
      url = ROOT_URL + COMMON_PARAMS + "&prop=extracts&exintro=&explaintext=&pageids=#{article_id}"
      response = HTTParty.get(url, headers: HEADER)
      response["query"]["pages"][article_id]["extract"]
    rescue
      raise
    end
  end

  def get_image_thumbnail(article_id)
    begin
      url = ROOT_URL + COMMON_PARAMS + "&prop=pageimages&pithumbsize=300&pageids=#{article_id}"
      response = HTTParty.get(url, headers: HEADER)
      response["query"]["pages"][article_id]["thumbnail"]["source"]
    rescue
      raise
    end
  end

  def wiki_error(error="Unknown error", message="The query failed, please try again.")
    caller = caller_locations(1,1)[0].label
    { error: "#{error} from #{caller}", error_message: message }
  end

end

