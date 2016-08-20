class SiteController < ApplicationController 

  attr_accessor :results
  before_action :disable_footer, only: [:index]

	def index
		@results
    @book = Book.new
    if current_user
      @user = current_user
      @user_wikis = @user.books.order(updated_at: :desc).limit(5)
    end
	end

end
 