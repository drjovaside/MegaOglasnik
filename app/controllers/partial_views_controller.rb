class PartialViewsController < ApplicationController 

	def show 
		render params[:id], layout: nil 
	end 
    
    def index
    respond_to do |format|
      format.html # index.html.erb
      format.json {  }
    end
    end
end