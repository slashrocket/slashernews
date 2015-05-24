Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :posts, only: [:create, :index, :show] do
      put '/upvote' => 'posts#upvote'
      resources :comments, only: [:show, :create] do
        put '/upvote' => 'comments#upvote'
      end
    end
  end
  devise_for :users, path: 'api/users'
  root to: 'application#angular'
  get '*path' => 'application#angular'
end
