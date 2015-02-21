class UsersController < ApplicationController

	def index
	end

	def show
		@user = User.find params[:id]
	end

	def new
		@user = User.new
	end

	def create
		@user = User.new(user_params)

		if @user.save
			flash[:welcome] = "Welcome to Wiki to Go!"
			redirect_to user_path(@user)
		else
			redirect_to '/'
	end

	def edit
	end

	def update
	end

	def delete
	end

	private

	def user_params
		params.require(:user).permit(:name, :email, :password, :password_confirmation)
	end
	end

end
