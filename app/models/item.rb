class Item < ActiveRecord::Base
  attr_accessible :ad_id, :category_id, :name, :shopping_cart_id
  belongs_to :ad
  belongs_to :shopping_cart
  belongs_to :category
  has_many :parameters


  def new_based_on ( ad )
  	line_item = Item.new
  	line_item.ad = ad
  	line_item.price=ad.price
  	return line_item 
  end




end
