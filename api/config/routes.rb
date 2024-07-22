Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  namespace :api do
    namespace :v1 do
      resources :wallets do
        resources :histories
        # add /move
        post '/histories/:id/move', to: 'histories#move'
      end
    end
  end
end
