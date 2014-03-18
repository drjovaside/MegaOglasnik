class Item < ActiveRecord::Base
  attr_accessible :ad_id, :category_id, :name, :shopping_cart_id
end
