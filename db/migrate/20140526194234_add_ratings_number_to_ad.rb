class AddRatingsNumberToAd < ActiveRecord::Migration
  def change
    add_column :ads, :ratingsnumber, :integer
  end
end
