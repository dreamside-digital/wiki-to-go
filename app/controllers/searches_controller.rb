class SearchesController < ApplicationController

	def new
		@user = User.find params[:id]
		@search = @user.searches.new
	end

	def create
		@user = User.find params[:id]
		@search = @user.searches.new(search_params)
		if @search.save
			flash[:message] = "Your search is being processed by tiny wikipedia elves"
			redirect_to '/'
		else
			flash[:message] = "Try again"
			redirect_to '/'
	end

	def show
	end

	def index
	end

	def delete
	end

	private

		def search_params
			params.require(:search).permit(:query)
		end

	end

end
