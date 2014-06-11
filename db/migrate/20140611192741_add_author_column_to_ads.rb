class AddAuthorColumnToAds < ActiveRecord::Migration
  def change
    add_column :ads, :author, :string
    add_column :ads, :forexchange, :boolean
  end
end
