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
    else
    	redirect_to users_path
    end
  end

  def destroy
  	
  	redirect_to login_path
  end
end
