class Item < ActiveRecord::Base
  attr_accessible :ad_id, :category_id, :name, :shopping_cart_id
  belongs_to :ad
  belongs_to :shopping_cart
  belongs_to :category
  has_many :parameters
end
