Rails.application.routes.draw do
  get '/', to: 'meteos#ask'
  get '/answer', to: 'meteos#answer'

  root to: 'meteos#ask'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
