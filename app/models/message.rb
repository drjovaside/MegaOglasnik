class Message < ActiveRecord::Base
  attr_accessible :contents, :reciever_sender_id, :timestamp, :title, :user_sender_id, :sender_username, :receiver_username
belongs_to :user
end
