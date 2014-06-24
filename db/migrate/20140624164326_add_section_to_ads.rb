class AddSectionToAds < ActiveRecord::Migration
  def change
    add_column :ads, :section, :string
  end
end
