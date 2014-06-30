class AddTitleToReservation < ActiveRecord::Migration
  def change
    add_column :reservations, :ad_title, :string
  end
end
