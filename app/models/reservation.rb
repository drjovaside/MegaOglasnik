class Reservation < ActiveRecord::Base
  attr_accessible :ad_id, :user_id, :user_username
  belongs_to :user
  belongs_to :ad
end
