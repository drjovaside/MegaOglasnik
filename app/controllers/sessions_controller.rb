class SessionsController < ApplicationController

  def new
  	
  end

 
  def create
     	user = User.validate_login(params[:session][:email],params[:session][:password])
      if user 
        if user.active==true
        user.lastlogin=Time.now
        user.save
          session[:user_id]=user.id
          redirect_to '/home'
          flash[:notice] = (t :successfully_logged_in)          
      else
       flash[:error] = 'Niste verifikovali email adresu!'
       redirect_to login_path
      end
      
      else 
        flash[:error] = ( t :login_error)
        redirect_to login_path
      end

  end


  def destroy
    session[:user_id]=nil
    session[:language]= "default"
    flash[:notice] = (t :successfully_logged_out)
    redirect_to login_path
  end




end
