class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
	has_many :books
  # has_attached_file :avatar, :styles => { :medium => "300x300>", :thumb => "30x30>" }, :default_url => "/images/:style/little-bird.png"
  validates :first_name, presence: true, length: { in: 2..255 }
	validates :last_name, presence: true, length: { in: 2..255 }
  validates :email, uniqueness: {case_sensitive: false}, presence: true, length: { in: 2..255 }
end
