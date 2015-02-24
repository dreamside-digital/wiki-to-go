class SessionController < ApplicationController

	def create

		user = User.find_by(email: params[:email])

		if user && user.authenticate(params[:password])
			session[:user_id] = user.id
			session[:name] = user.name
			redirect_to root_path
		else
			flash[:error] = "Login was not successful."
			redirect_to root_path
		end
	end

	def destroy
		session.clear
		redirect_to root_path
	end

end
