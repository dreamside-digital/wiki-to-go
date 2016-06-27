require 'rails_helper'

RSpec.describe Api::UsersController, :type => :controller do

  context "valid user data provided" do

    describe 'POST #create' do
      it "creates a new user and return user id as JSON" do
        user_data = { user: {name: "David Bowie", email: "d@bowie.com", password: "password", password_confirmation: "password" }}
        post :create, user_data, format: :json
        expect(response.status).to eq(200)
        expect(response.content_type).to eq("application/json")
        expect(JSON.parse(response.body)["user"]["name"]).to eq(user_data[:user][:name])
        expect(User.last.id).to eq(JSON.parse(response.body)["user"]["id"]) #to_s?
      end
    end

  end

  context "invalid user data" do

    describe 'POST #create' do
      it "returns error messages" do
        user_data = { user: {name: "David Bowie" } }
        post :create, user_data, format: :json
        expect(response.status).to eq(200)
        expect(response.content_type).to eq("application/json")
        expect(JSON.parse(response.body)["error_messages"]).to be_present
      end
    end

  end

  context "new account with OAuth" do
    # todo
  end

end