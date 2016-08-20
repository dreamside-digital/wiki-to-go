class SessionsController < Devise::SessionsController
	respond_to :json
	prepend_before_action :require_no_authentication, only: [:create, :new]

	def create
    self.resource = warden.authenticate!(scope: resource_name, recall: "#{controller_path}#failure")
    sign_in(resource_name, resource)
    yield resource if block_given?
    render json: { status: :success, user: resource }, status: 200
	end

	def destroy
		signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    yield if block_given?
  	render json: signed_out ? {status: :success} : {status: :unprocessable_entity}
	end

	def failure
		render json: { message: "Unable to log in" }, status: 401
	end

end
