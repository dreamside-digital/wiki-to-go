require 'rails_helper'

RSpec.describe SessionsController, :type => :controller do

  describe '#create' do
    before :each do
      User.make(:name => 'user', :email => 'user@email.com', :password => 'password', :password_confirmation => 'password')
    end

    it "should set a session when a user registers" do
      expect(session[:name]).to not_be nil
    end

    it "logs in with correct info" do
      visit '/'
      within(".form-group") do
        fill_in 'Email', :with => 'user@email.com'
        fill_in 'Password', :with => 'password'
      end
      click_button 'Log in'
      expect(page).to have_content 'Welcome'
      expect(session[:id]).to not_be nil
    end
  end

  describe '#destroy' do
    it "should log out the user and clear session" do
      visit '/'
      click_button 'Logout'
      expect(page).to have_content 'Log in'
      expect(session[:id]).to be nil
    end
  end

end
