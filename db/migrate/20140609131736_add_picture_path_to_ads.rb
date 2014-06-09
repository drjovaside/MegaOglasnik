class AddPicturePathToAds < ActiveRecord::Migration
  def change
    add_column :ads, :picture_path, :string
  end
end
