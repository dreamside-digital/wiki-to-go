class PersonalWikisController < ApplicationController

	def new
		@user = User.find params[:user_id]
		@pwiki = PersonalWiki.new
	end

	def create
		@user = User.find params[:user_id]
		@pwiki = @user.personal_wikis.new(pwiki_params)
	end

	def delete
	end

	def edit
	end

	def update
	end

	private

	def pwiki_params
		params.require(:user).permit(:user_id)
	end
end
