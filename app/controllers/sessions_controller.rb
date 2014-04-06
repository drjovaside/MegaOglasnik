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
          flash[:notice] = 'Uspjesno ste se prijavili.'          
      else
       flash[:error] = 'Niste verifikovali email adresu!'
       redirect_to login_path
      end
      
      else 
        flash[:error] = 'Email adresa ili password koji ste unijeli nije ispravan. Molimo Vas pokusajte ponovo.'
        redirect_to login_path
      end
  end


  def destroy
    session[:user_id]=nil
    flash[:notice] = 'Uspjesno ste se odjavili.' 
    redirect_to login_path
  end




end
