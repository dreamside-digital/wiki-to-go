Rails.application.routes.draw do

  root 'site#index'
  get '/search', to: 'site#search'

  get '/pdf_status', to: 'articles#pdf_status'

  post   "/login",  to: "session#create"
  delete "/logout", to: "session#destroy"
  get '/exportpdf/:pageid', to: 'articles#export_pdf', as: 'export_pdf'
  match '/404', to: 'errors#file_not_found', via: :all
  match '/422', to: 'errors#unprocessable', via: :all
  match '/500', to: 'errors#internal_server_error', via: :all
  
  resources :users, except: [:index] do
    resources :books do
    	resources :articles, only: [:destroy]
    end
  end

end
