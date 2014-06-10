class MessagesController < ApplicationController
    def recieved
        @messages = Message.where(reciever_sender_id: session[:user_id]).all
        render json: @messages
        end
    
    def show
        @message = Message.find(params[:id])
        render json: @messages
        end
    
    
    def sent
        @messages = Message.where(user_sender_id: session[:user_id]).all
        render json: @messages
        end
    def write_message
        @message = Message.new
        @message.title=params[:title]
        @message.contents=params[:content]
        @message.reciever_sender_id=params[:reciever_sender_id]
        @message.user_sender_id = params[:user_sender_id]
        @message.timestamp = Time.now
        @message.save
        render json: @message
    end
end