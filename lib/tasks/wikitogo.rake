
namespace :wikitogo do
  desc "Seed user database"
  task seed_user_database: :environment do
    if Rails.env == "development"
      10.times do |i|
        User.create!(name: Faker::Name.name, email: Faker::Internet.email, password: Faker::Internet.password)
      end
    else
      puts "\nTask not meant to be run in other environment but development"
    end
  end
end