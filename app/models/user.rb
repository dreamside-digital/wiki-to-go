class User < ActiveRecord::Base
	has_secure_password

	has_many :searches

	validates :name, :email, presence: true, length: { in: 2..255 }
	
end
