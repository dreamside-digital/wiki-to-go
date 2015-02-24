class PersonalWikisController < ApplicationController

	def new
		@user = User.find session[:user_id]
		@pwiki = @user.personal_wikis.create(pwiki_params)
	end

	def show
		@pwiki = PersonalWiki.find(params[:id])
	end

	def create
		@user = User.find session[:user_id]
		@pwiki = @user.personal_wikis.create(pwiki_params)

		if @pwiki.save
			flash[:saved] = "Your personal wiki has been saved"
			redirect_to user_personalwiki_path(@pwiki)
		else
			redirect_to '/'
		end
	end

	def delete
	end

	def edit
	end

	def update
	end

	private

	def pwiki_params
		params.require(:user).permit(:user_id, :articles)
	end
end
