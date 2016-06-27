require 'rails_helper'

RSpec.describe Api::WikipediaController, :type => :controller do

  context "valid data presented" do

  let(:coordinates) { "41.3916143|2.1763342999999997" }
  let(:article_id) {"31379573"}

    describe 'GET #search' do
      it "returns results array in JSON format" do
        get :search, { "location" => coordinates }, format: :json
        expect(response.status).to eq(200)
        expect(response.content_type).to eq("application/json")
        expect(JSON.parse(response.body)["results"][0]["title"]).to eq("Fundació Vila Casas")
      end 
    end

    describe 'GET #article_preview' do
      it "returns article preview in JSON format" do
        get :article_preview, { "article_id" => article_id }, format: :json
        expect(response.status).to eq(200)
        expect(response.content_type).to eq("application/json")
        expect(JSON.parse(response.body)["preview"]["text"]).to include("Trinity—Spadina is a provincial electoral district in Ontario, Canada")
      end
    end
  end

  context "invalid data presented" do

    describe 'GET #search' do
      it "returns error message without breaking" do
        coordinates = "|"
        get :search, { "location" => coordinates }, format: :json
        expect(response.status).to eq(200)
        expect(response.content_type).to eq("application/json")
        expect(JSON.parse(response.body)["results"]["error_message"]).to eq("Invalid coordinate provided")
      end 
    end

    describe 'GET #article_preview' do
      it "returns error message without breaking" do
        article_id = "0000"
        get :article_preview, { "article_id" => article_id }, format: :json
        expect(response.status).to eq(200)
        expect(response.content_type).to eq("application/json")
        expect(JSON.parse(response.body)["preview"]["error_message"]).to eq("No preview available")
      end

      it "returns error message without breaking" do
        article_id = ""
        get :article_preview, { "article_id" => article_id }, format: :json
        expect(response.status).to eq(200)
        expect(response.content_type).to eq("application/json")
        expect(JSON.parse(response.body)["preview"]["error_message"]).to eq("No preview available")
      end
    end
  end

end
