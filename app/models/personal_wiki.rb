class PersonalWiki < ActiveRecord::Base
	belongs_to :user
	serialize :articles
end
