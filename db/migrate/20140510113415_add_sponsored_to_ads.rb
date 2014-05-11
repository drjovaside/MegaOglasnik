class AddSponsoredToAds < ActiveRecord::Migration
  def change
    add_column :ads, :sponsored, :boolean
  end
end
