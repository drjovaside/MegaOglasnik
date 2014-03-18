class Parameter < ActiveRecord::Base
  attr_accessible :item_id, :parameter_type_id, :value
end
