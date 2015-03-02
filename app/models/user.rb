class User < ActiveRecord::Base
	has_secure_password
	has_many :books
  # has_attached_file :avatar, :styles => { :medium => "300x300>", :thumb => "30x30>" }, :default_url => "/images/:style/little-bird.png"
	validates :name, :email, presence: true, length: { in: 2..255 }

end
