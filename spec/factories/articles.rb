FactoryGirl.define do
  factory :article do
    title { Faker::Company.name }
    pageid { Faker::Number.number(8) }
    intro { Faker::Company.catch_phrase }
    latitude { Faker::Address.latitude }
    longitude { Faker::Address.longitude }
  end

end
