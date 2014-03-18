class Medal < ActiveRecord::Base
  attr_accessible :description, :name, :user_id, :value
  belongs_to :user
end
