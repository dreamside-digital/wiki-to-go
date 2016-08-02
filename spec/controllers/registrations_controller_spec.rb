require 'rails_helper'

RSpec.describe RegistrationsController, :type => :controller do

  let(:user_attrs) { FactoryGirl.attributes_for(:user) }
  let(:user_password) { user_attrs[:password] }
  let(:user) { FactoryGirl.create(:user, password: user_password) }

  before(:each) do 
    @request.env["devise.mapping"] = Devise.mappings[:user]
  end
    

  describe "GET #new" do
    it "renders the registration form" do
      get :new
      expect(response).to render_template("new")
    end
  end

  describe "POST #create" do

    it "creates a new user when valid params are provided" do
      user_data = { user: user_attrs }
      post :create, user_data, format: :json

      expect(response.content_type).to eq('application/json')
      expect(User.last.first_name).to eq user_data[:user][:first_name]
      expect(JSON.parse(response.body)["user"]["id"]).to be_present
    end

    it 'returns an error if params are invalid' do
      user_data = { user: user_attrs.except(:email) }
      post :create, user_data, format: :json

      expect(response.content_type).to eq('application/json')
      expect(JSON.parse(response.body)["user"]["id"]).to be_nil
      expect(JSON.parse(response.body)["status"]).to eq("unprocessable_entity")
    end

    it 'returns a message if user is inactive for authentication' do
      user_data = { user: user_attrs }
      allow_any_instance_of(User).to receive(:active_for_authentication?).and_return(false)
      post :create, user_data, format: :json

      expect(JSON.parse(response.body)["message"]).to eq("inactive")
    end
  end

  describe 'PUT #update' do

    before(:each) do
      sign_in user
    end

    it 'updates user when valid params are provided' do
      update_attrs = FactoryGirl.attributes_for(:user).except(:email)
      update_attrs.merge!({current_password: user_password})
      user_data = { user: update_attrs }

      put :update, user_data, format: :json

      expect(JSON.parse(response.body)["user"]["first_name"]).to eq(update_attrs[:first_name])
      assert user.valid_password?(user_password)
    end

    it 'returns error when params are not valid' do
      update_attrs = FactoryGirl.attributes_for(:user).except(:email)
      user_data = { user: update_attrs }

      put :update, user_data, format: :json

      expected_status = 'unprocessable_entity'
      expected_error = 'Current password can\'t be blank'
      assert_equal expected_status, (JSON.parse(response.body)['status'])
      assert_equal expected_error, (JSON.parse(response.body)['message'][0])
    end

    it 'returns error if user is not authenticated' do
      sign_out user
      user_data = { user: user_attrs }

      put :update, user: user_data, format: :json

      expected_error = 'You need to sign in or sign up before continuing.'
      expect(JSON.parse(response.body)["error"]).to eq(expected_error)
    end
  end

  describe 'DELETE #destroy' do

    it 'should delete current user if user is authenticated' do
      sign_in user
      current_user_id = user.id

      delete :destroy, format: :json

      assert_equal "success", JSON.parse(response.body)["status"]
      assert_equal current_user_id, JSON.parse(response.body)['user']['id']
      refute User.where(id: current_user_id).exists?
    end

    it 'returns error if user is not authenticated' do
      sign_out user
      
      delete :destroy, format: :json

      expected_error = 'You need to sign in or sign up before continuing.'
      expect(JSON.parse(response.body)["error"]).to eq(expected_error)
    end
  end

end
