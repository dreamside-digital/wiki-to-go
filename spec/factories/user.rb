FactoryGirl.define do
  factory :user do
    first_name     { Faker::Name.name } 
    last_name     { Faker::Name.name } 
    email    { Faker::Internet.email }
    password { "pa$$word" }
    password_confirmation { "pa$$word" }
  end
end

