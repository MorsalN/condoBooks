Rails.application.routes.draw do
  get 'homepage/index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do # /api/data

    get '/data', to: 'tests#index'
    # get '/user', to: 'users#index'
    get '/admin', to: 'amenities#show'
    #get '/bookings', to: 'bookings#index'
    post '/slot', to: 'bookings#create'
    get '/users/:id/bookings', to: 'users#user_bookings'
    

    resources :users, only: [:index]
    resources :amenities, only: [:show]
    resources :bookings, only: [:index, :show, :edit]
  

    namespace :admin do
      root to: 'amenities#show'
      resources :amenities
    end


  end

  


  # get '*path', to: "static_pages#fallback_index_html", constraints: ->(request) do
  #   !request.xhr? && request.format.html?
  # end

end
