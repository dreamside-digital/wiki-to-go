require 'rails_helper'

RSpec.describe SessionsController, :type => :controller do

  let(:user_password) { "pa$$word" }
  let(:user) { FactoryGirl.create(:user, password: user_password, password_confirmation: user_password) }

  before(:each) do 
    @request.env["devise.mapping"] = Devise.mappings[:user]
  end

  describe '#create' do

    it "signs in user with valid params" do
      user_data = { 
        user: {
          email: user.email,
          password: user_password
        }
      }
      assert request.session.empty?

      post :create, user_data, format: :json

      assert response.success?
      assert_equal user.id, @controller.current_user.id
      refute request.session.empty?
    end

    it 'returns an error with invalid params' do
      invalid_user_data = { 
        user: {
          email: 'invalid@email.com',
          password: 'invalid'
        }
      }

      post :create, invalid_user_data, format: :json

      expected_error = "Unable to log in"
      expected_status = 401
      
      assert_equal expected_error, JSON.parse(response.body)['message']
      assert_equal expected_status, response.status
      refute response.success?
    end
  end

  describe '#destroy' do
    it "should log out the user and clear session" do
      sign_in user
      delete :destroy, format: :json

      assert response.success?
      refute @controller.current_user
    end
  end

end
