class SessionsController < ApplicationController
 
 def new
 end

 def create
  	#user = User.validate_login(params[:session][:email],params[:session][:password])
  	#if user
     # user.update_attribute(:lastlogin, Time.now)
     # user.save
  		#session[:user_id] = user.id
  		#redirect_to user
  	#else
  	#	flash[:status] = FALSE
  	#	flash[:alert] = 'Invalid username and password'
  	#	redirect_to login_path
  	#end

    #novi login
    user = User.validate_login(params[:session][:email],params[:session][:password])
    if user
      session[:user_id] = user.id
      user.update_attribute(:lastlogin, Time.now)
      user.save
      redirect_to user
    else
      redirect_to users_path, :alert => "Invalid user/password combination"
    end

  end


  def destroy
  	session[:user_id] = nil
  	redirect_to login_path
  end
end