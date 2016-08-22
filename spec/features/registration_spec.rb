require 'rails_helper'

describe "the registration process", type: :feature do
  it "creates new account if valid data entered", js: true do
    user_attrs = FactoryGirl.attributes_for(:user)
    binding.pry
    visit root_path

    expect(page).to have_content "Sign up"
    page.find('#sign-up').click
    within("#registration-modal") do
      fill_in 'First name', with: user_attrs[:first_name]
      fill_in 'Last name', with: user_attrs[:last_name]
      fill_in 'Email', with: user_attrs[:email]
      fill_in 'Password', with: user_attrs[:password]
      fill_in 'Password confirmation', with: user_attrs[:password_confirmation]
    end
    click_button 'Save'
    expect(page).to have_content 'Welcome to WikiToGo!'
  end

  it 'displays errors if invalid data entered', js: true do
    user_attrs = FactoryGirl.attributes_for(:user)

    visit root_path
    expect(page).to have_content "Sign up"
    page.find('#sign-up').click
    within("#registration-modal") do
      fill_in 'First name', with: user_attrs[:first_name]
      fill_in 'Last name', with: user_attrs[:last_name]
      fill_in 'Password', with: user_attrs[:password]
      fill_in 'Password confirmation', with: user_attrs[:password_confirmation]
    end
    click_button 'Save'
    expect(page).to have_content 'Missing required attribute'
  end
end