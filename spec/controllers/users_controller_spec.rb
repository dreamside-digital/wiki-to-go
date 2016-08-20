require 'rails_helper'

RSpec.describe UsersController, :type => :controller do

  describe "GET #new" do
    it "renders the registration form" do
      get :new
      expect(response).to render_template("new")
    end
  end

  describe "POST #create" do

    it "creates a new user when the corrent data is entered" do
      binding.pry
      @request.env["devise.mapping"] = Devise.mappings[:user]
      post :create, user: {first_name: "David", last_name: "Bowie", email: "user@email.com", password: "testpassword", password_confirmation: "testpassword" }
      # new_user = User.last
      # expect(new_user.last_name).to eq("Bowie")
      # expect(new_user.email).to eq("user@email.com")
      # expect(new_user.password_digest).to_not eq("testpassword")
      # expect(new_user.authenticate("testpassword")).to be new_user
      # expect(new_user.valid?).to be(true)
    end

    it "redirects to user_path if user is created" do
      post :create, user: {name: "User", email: "user@email.com", password: "testpassword", password_confirmation: "testpassword" }
      @user = User.find_by(email: "user@email.com")
      expect(response).to redirect_to(user_path(@user))
    end

    it "renders new template if validation errors" do
      post :create, user: { email: "email@email.com", password: "password", password_confirmation: "password" }
      expect(response).to render_template("new")
    end

  end

end
