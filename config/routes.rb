Rails.application.routes.draw do

  get 'hello_world', to: 'hello_world#index'
  devise_for :users, :controllers => {sessions: 'sessions', registrations: 'registrations'}
  root 'site#index'

  post   "/login",  to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get '/users/:user_id/books/:id/export', to: 'books#export', as: 'book_export'
  match '/404', to: 'errors#file_not_found', via: :all
  match '/422', to: 'errors#unprocessable', via: :all
  match '/500', to: 'errors#internal_server_error', via: :all
  
  resources :users, only: [:index] do
    resources :books, only: [:index, :show] do
    	resources :articles, only: [:destroy]
    end
  end

  namespace :api, defaults: { format: :json }, path: '/' do
    get 'search', to: 'wikipedia#search'
    get 'preview', to: 'wikipedia#article_preview'
    resources :books, only: [:create, :update, :destroy] do
      resources :articles, only: [:destroy]
    end
  end


end
