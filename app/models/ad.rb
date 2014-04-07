class Ad < ActiveRecord::Base
  attr_accessible :description, :expirytime, :price, :rating, :sold, :timestamp, :title, :user_id
belongs_to :user
has_one :item
has_many :pictures
has_many :comments


def self.search(search)
  search_condition = "%" + search + "%"
  find(:all, :conditions => ['title LIKE ? OR description LIKE ?', search_condition, search_condition])
end


end
