class ApplicationController < ActionController::Base
helper :all


#before_filter :maintain_session_and_user, only: [:index, :new, :create]

protect_from_forgery


  def index
  	
  	
  end

  def registration
  	
  end

def current_user
 return unless session[:user_id]
 @current_user ||= User.find(session[:user_id])
end

def authenticate_user!
  redirect_to(:controller => 'sessions', :action => 'new') unless current_user
  flash[:error]='Morate biti logovani'
end

end
