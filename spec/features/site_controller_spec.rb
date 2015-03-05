require 'rails_helper'

RSpec.describe SiteController, :type => :controller do

  describe "#index" do
    it "renders logged out navbar if no user is logged in" do
      get :index
      expect(response).to render_template ("sessions/login")
    end
  end

  describe "#search" do
    it "renders search page if coordinate are provided" do
      get :search, { location: "41.391611|2.1763475" }
      expect(response).to render_template 'search'
    end
  end

end
