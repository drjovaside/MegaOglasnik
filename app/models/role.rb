class Role < ActiveRecord::Base
  attr_accessible :name
  has_many :role_has_actions
  has_and_belongs_to_many :actions
  has_many :actions, :through => :role_has_action
  has_many :user_has_roles
  has_and_belongs_to_many :users
  has_many :users, :through => :user_has_roles
end
