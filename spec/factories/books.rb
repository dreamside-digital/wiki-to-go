FactoryGirl.define do
  factory :book do
    title { Faker::Address.city }

    after(:create) do |book, factory|
      3.times { book.articles << FactoryGirl.create(:article, :saved) }
      book.save
    end
  end

end
