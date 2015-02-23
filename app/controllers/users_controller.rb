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
	end

	def edit
		@user = User.find session[:user_id]
		render 'new'
	end

	def update
	    if @user.update(user_params)
	      flash[:notice] = "Profile updated yeahhh"
	      redirect_to user_path(@user)
	    else
	      flash[:error]  = "Noooo couldn't update profile"
	      render :edit
	    end
	end

	def delete
	end

	def login

		user = User.find_by(email: params[:email])

		if user && user.authenticate(params[:password])
			session[:user_id] = user.id
			session[:name] = user.name
			redirect_to '/'
		else
			flast[:error] = "Login was not successful."
			redirect_to '/'
		end
	end

	def logout
		session.clear
		redirect_to '/'
	end

	private

		def user_params
			params.require(:user).permit(:name, :email, :password, :password_confirmation)
		end

end
 