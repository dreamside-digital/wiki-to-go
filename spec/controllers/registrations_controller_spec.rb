require 'rails_helper'

RSpec.describe RegistrationsController, :type => :controller do

  # describe "GET #new" do
  #   it "renders the registration form" do
  #     get :new
  #     expect(response).to render_template("new")
  #   end
  # end

  describe "POST #create" do

    it "creates a new user when the corrent data is entered" do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      user_data = { user: {first_name: "David", last_name: "Bowie", email: "d@bowie.com", password: "password", password_confirmation: "password" }}
      post :create, user_data, format: :json
      binding.pry
      expect(User.last.first_name).to eq "David"
      expect(JSON.parse(response.body)["id"]).to be_present
      # new_user = User.last
      # expect(new_user.last_name).to eq("Bowie")
      # expect(new_user.email).to eq("user@email.com")
      # expect(new_user.password_digest).to_not eq("testpassword")
      # expect(new_user.authenticate("testpassword")).to be new_user
      # expect(new_user.valid?).to be(true)
    end

    # it "redirects to user_path if user is created" do
    #   post :create, user: {name: "User", email: "user@email.com", password: "testpassword", password_confirmation: "testpassword" }
    #   @user = User.find_by(email: "user@email.com")
    #   expect(response).to redirect_to(user_path(@user))
    # end

    # it "renders new template if validation errors" do
    #   post :create, user: { email: "email@email.com", password: "password", password_confirmation: "password" }
    #   expect(response).to render_template("new")
    # end

  end

end
