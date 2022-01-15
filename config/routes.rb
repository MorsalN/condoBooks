Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do # /api/data

    get '/', to: 'users#index'
    get '/admin' to: 'amenities#show'
    
    resources :users
    resources :amenities only [:show]
    resources :bookings only [:show]

    namespace :admin do
      root to: 'amenities#show'
      resources :amenities
    end

  end

  get '*path', to: "static_pages#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

end
