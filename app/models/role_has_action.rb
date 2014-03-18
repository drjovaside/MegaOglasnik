class RoleHasAction < ActiveRecord::Base
  attr_accessible :action_id, :role_id
  belongs_to :role
  belongs_to :action
end
