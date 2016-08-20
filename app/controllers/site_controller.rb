class SiteController < ApplicationController 

  attr_accessor :results
  before_action :disable_footer, only: [:index]

	def index
		@results
    @book = Book.new
    @user = user_signed_in? ? current_user : User.new
    @user_wikis = current_user.books.order(updated_at: :desc).limit(5) if user_signed_in?
	end

end
 