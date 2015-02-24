Rails.application.routes.draw do

  root 'site#index'
  get '/search', to: 'site#search'
  post   "/login",  to: "session#create"
  delete "/logout", to: "session#destroy"
  
  resources :users do
    resources :books do
    	resources :articles do
      end
    end
  end

end
