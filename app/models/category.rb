class Category < ActiveRecord::Base
  attr_accessible :name,:category_id,:ad_id
  has_many :items
  has_many :parameter_types
end
