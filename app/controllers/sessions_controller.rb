class SessionsController < ApplicationController

  def new
  	
  end

  def create
  	user = User.validate_login(params[:session][:email],params[:session][:password])
    if user
    session=Session.new
    session.user_id=user.id
    session.save
    redirect_to user
    flash[:notice] = 'Successfully logged in!'
    else 
    flash[:error] = 'The email address or password you entered is not valid. Please try again.'
    redirect_to login_path
    
    end
  end

  def destroy
  	redirect_to login_path
  end
end
