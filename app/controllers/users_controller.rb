class UsersController < ApplicationController

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
			redirect_to '/'
		end
	end

	def edit
		@user = User.find session[:user_id]
		render 'new'
	end

	def update

		@user = User.find session[:user_id]
		@user.update_attributes user_params

	    if @user.save
	      flash[:notice] = "Profile updated yeahhh"
	      redirect_to user_path(@user)
	    else
	      flash[:error]  = "Noooo couldn't update profile"
	      render 'new'
	    end
	end


	def destroy
		@user = User.find_by session[:id]
		@user.destroy!
		session.clear
		redirect_to '/'
	end

	def login

		user = User.find_by(email: params[:email])

		if user && user.authenticate(params[:password])
			session[:user_id] = user.id
			session[:name] = user.name
			redirect_to '/'
		else
			flash[:error] = "Login was not successful."
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
 