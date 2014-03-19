class UsersController < ApplicationController
  def index
end

def show
end

  def new
  	@user = User.new
    end

  def create 
	@user = User.new(params[:user])
	if @user.save
		#flash[:status] = TRUE
		#flash[:alert] = 'Registration successful!'
		#redirect_to @user
		# handle a successful save.
	else
		#flash[:status] = FALSE
		#flash[:alert] = 'Registration failed!'
	end
	#redirect_to register_path
end
end