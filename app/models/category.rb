class Category < ActiveRecord::Base
  attr_accessible :name
  has_many :items
  has_many :parameter_types
end
