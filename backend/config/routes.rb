Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }

      namespace :auth do
        resources :sessions, only: %i[index]
      end

      get 'recipes/recommended' => "recipes#recommended"
      get 'recipes/recent' => "recipes#recent"

      get 'mypage' => "users#mypage"
      get 'search' => "searches#search"

      resources :test, only: %i[index]
      resources :recipes, only: [:create, :index, :show, :edit, :update, :destroy] do
        resource :ingredients, only: [:show, :update]
        resource :steps, only: [:show, :update]
      end
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
