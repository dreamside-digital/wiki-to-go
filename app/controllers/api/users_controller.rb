class Api::UsersController < ApplicationController

  def create
    user = User.new(user_params)
    if user.save
      session[:user_id] = user.id
      session[:name] = user.name
      render json: { status: :success, user: { id: user.id, name: user.name } } 
    else
      render json: { status: :error, error_messages: user.errors.full_messages }
    end
  end


  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

end