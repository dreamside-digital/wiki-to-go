require 'rails_helper'

RSpec.describe WikipediaService, :type => :model do

  before do
    @wikiservice = WikipediaService.new
  end

  describe "#search" do
    it "accepts coordinates and returns results array" do
      expect(@wikiservice.search({"location"=>"41.3916143|2.1763342999999997"})).to include("Fundació Vila Casas")
    end
  end

  describe "#search_coords" do

    it "should hit wikipedia API and return json response" do
      location = "41.3916143|2.1763342999999997"
      expect(@wikiservice.search_coords(location)).to include("query")
    end
  end

  describe "#get article content" do
    it "hits wikipdia api and for article abstracts and adds them to array" do
    end
  end

end