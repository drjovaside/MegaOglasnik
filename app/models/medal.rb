class Medal < ActiveRecord::Base
  attr_accessible :description, :name,:price, :user_id, :value
  belongs_to :user
end
