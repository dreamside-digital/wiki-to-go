FactoryGirl.define do
  factory :article do
    title { Faker::Company.name }

    trait :saved do
      pageid { Faker::Number.number(8) }
      intro { Faker::Company.catch_phrase }
      latitude { Faker::Address.latitude }
      longitude { Faker::Address.longitude }
    end

    trait :from_json do
      id { Faker::Number.number(8) }
      lat { Faker::Address.latitude }
      lon { Faker::Address.longitude }
    end
  end

end
