class Parameter < ActiveRecord::Base
  attr_accessible :item_id, :parameter_type_id, :value
  belongs_to :item
  belongs_to :parameter_type
end
