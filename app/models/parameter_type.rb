class ParameterType < ActiveRecord::Base
  attr_accessible :category_id, :name
  has_many :parameters
  belongs_to :category
end
