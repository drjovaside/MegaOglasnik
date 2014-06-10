class ApplicationController < ActionController::Base
helper :all

before_filter :set_locale, :add_cors_headers
skip_before_filter :verify_authenticity_token
protect_from_forgery

after_filter :set_csrf_cookie_for_ng

def set_csrf_cookie_for_ng
  cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
end   
def add_cors_headers
  puts 'ApplicationController.set_headers'
  if request.headers["HTTP_ORIGIN"]     
  # better way check origin
  # if request.headers["HTTP_ORIGIN"] && /^https?:\/\/(.*)\.some\.site\.com$/i.match(request.headers["HTTP_ORIGIN"])
    headers['Access-Control-Allow-Origin'] = request.headers["HTTP_ORIGIN"]
    headers['Access-Control-Expose-Headers'] = 'ETag'
    headers['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS, HEAD'
    headers['Access-Control-Allow-Headers'] = '*,x-requested-with,Content-Type,If-Modified-Since,If-None-Match,Auth-User-Token'
    headers['Access-Control-Max-Age'] = '86400'
    headers['Access-Control-Allow-Credentials'] = 'true'
  end
end

def set_locale
  logger.debug "* Accept-Language: #{request.env['HTTP_ACCEPT_LANGUAGE']}"
  #I18n.locale = extract_locale_from_accept_language_header
  #I18n.locale = :en
  unless session[:user_id].nil?
    if user = User.find_by_id(session[:user_id])
      if (user.prefered_language == 'default') 
      I18n.locale = extract_locale_from_accept_language_header
      elsif user.prefered_language == 'bosnian' 
      I18n.locale = :bs
      elsif user.prefered_language == 'english' 
      I18n.locale = :en

       elsif user.prefered_language == nil
      I18n.locale = :bs

      end
    else
      I18n.locale = extract_locale_from_accept_language_header
    end

  logger.debug "* Locale set to '#{I18n.locale}'"
    else
      if (session[:language] == "default")
        I18n.locale = extract_locale_from_accept_language_header
        #I18n.locale = :en
      elsif session[:language] == "bosnian" 
        I18n.locale = :bs
      elsif session[:language] == "english"
        I18n.locale = :en
      end
          
  end
end

protect_from_forgery

  def home
    if session[:language] == nil
      session[:language] = "default"
    end
  @user=User.find_by_id(session[:user_id])
  respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @user }
    end
  end

  def registration
  	
  end

def current_user
 return (session[:user_id] && User.find_by_id(session[:user_id]).active==true)
end

def authenticate_user!
  if self.current_user 
  else
  redirect_to(:controller => 'sessions', :action => 'new')
  flash[:error]=(t :must_be_logged_in)
end
end



private
def extract_locale_from_accept_language_header
  request.env['HTTP_ACCEPT_LANGUAGE'].scan(/^[a-z]{2}/).first
end

end
