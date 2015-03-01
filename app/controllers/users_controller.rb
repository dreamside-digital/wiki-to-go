class UsersController < ApplicationController

	before_action :require_login, except: [:new, :create]

	def index
		@users = User.order(created_at: :asc)
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
			session[:user_id] = @user.id
			session[:name] = @user.name
			redirect_to user_path(@user)
		else
			render 'new'
		end
	end

	def edit
		@user = User.find session[:user_id]
	end

	def update

		@user = User.find session[:user_id]
		@user.update_attributes user_params

	    if @user.save
	      flash[:notice] = "Profile updated yeahhh"
	      redirect_to user_path(@user)
	    else
	      flash[:error]  = "Noooo couldn't update profile"
	      render 'edit'
	    end
	end


	def destroy
		@user = User.find_by session[:id]
		@user.destroy!
		session.clear
		redirect_to root_path
	end

	private

		def user_params
			params.require(:user).permit(:name, :email, :password, :password_confirmation)
		end

end
 