class Ad < ActiveRecord::Base
  attr_accessible :academic_year, :category_id, :description, :expirytime,:picture_path, :price, :rating,:section, :sold,:sponsored, :timestamp, :title, :user_id, :author, :forexchange
belongs_to :user
belongs_to :category
has_one :item
has_many :pictures
has_many :comments

validates :title, :presence => true
validates :price, :presence => true
validates :section, :presence => true
validates :academic_year, :presence => true
validates :price, :numericality => { :greater_than_or_equal_to => 0 }
validates :academic_year, :numericality => true
def self.search(search)
  search_condition = "%" + search + "%"
  find(:all, :conditions => ['title LIKE ? OR description LIKE ?', search_condition, search_condition])
end


end
