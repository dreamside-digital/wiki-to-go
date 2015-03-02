Rails.application.routes.draw do

  get 'errors/file_not_found'

  get 'errors/unprocessable'

  get 'errors/internal_server_error'

  root 'site#index'
  get '/search', to: 'site#search'
  post   "/login",  to: "session#create"
  delete "/logout", to: "session#destroy"
  get '/select', to: "site#select_article"
  match '/404', to: 'errors#file_not_found', via: :all
  match '/422', to: 'errors#unprocessable', via: :all
  match '/500', to: 'errors#internal_server_error', via: :all
  
  resources :users do
    resources :books do
    	resources :articles do
      end
    end
  end

end
