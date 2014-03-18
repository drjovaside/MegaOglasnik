class ShoppingCart < ActiveRecord::Base
  attr_accessible :payed, :saved, :timestamp, :user_id
  belongs_to :user
  has_many :items
end
