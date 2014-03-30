class ApplicationController < ActionController::Base
helper :all

before_filter :set_locale
def set_locale
  logger.debug "* Accept-Language: #{request.env['HTTP_ACCEPT_LANGUAGE']}"
  I18n.locale = extract_locale_from_accept_language_header
  logger.debug "* Locale set to '#{I18n.locale}'"
end



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

private
def extract_locale_from_accept_language_header
  request.env['HTTP_ACCEPT_LANGUAGE'].scan(/^[a-z]{2}/).first
end

end
