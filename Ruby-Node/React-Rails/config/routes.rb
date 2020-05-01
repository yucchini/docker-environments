Rails.application.routes.draw do
  namespace :api do
    namespace :admin do
      mount_devise_token_auth_for 'User', at: '/auth', controllers: {
        registrations: 'api/admin/auth/registrations'
      }
    end
  end
  root 'home#index'
end
