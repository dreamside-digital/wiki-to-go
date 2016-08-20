class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  before_action :set_user_books
  protect_from_forgery with: :null_session

  def set_user_books
    if current_user
      @user = current_user
      @user_wikis = @user.books.order(updated_at: :desc).limit(5)
    end
  end

  def disable_footer
    @disable_footer = true
  end

  def require_login
    unless current_user
      flash[:error] = 'Please log in or register to access this page'
      redirect_to root_path
    end
  end

  # Devise helpers
  # def resource_name
  #   :user
  # end

  # def resource
  #   @resource ||= User.new
  # end

  # def devise_mapping
  #   @devise_mapping ||= Devise.mappings[:user]
  # end

end
