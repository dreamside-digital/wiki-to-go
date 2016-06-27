FactoryGirl.define do
  factory :book do
    title { Faker::Address.city }

    after(:create) do |book, factory|
      book.articles << FactoryGirl.create(:article)
      book.articles << FactoryGirl.create(:article)
      book.articles << FactoryGirl.create(:article)
      book.save
    end
  end

end
