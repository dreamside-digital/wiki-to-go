class User < ActiveRecord::Base
	has_secure_password
	has_many :personal_wikis

	validates :name, :email, presence: true, length: { in: 2..255 }
	accepts_nested_attributes_for :personal_wikis
end
