class AddRatingSumToAd < ActiveRecord::Migration
  def change
    add_column :ads, :ratingsum, :double
  end
end
