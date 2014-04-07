class AddPreferedLanguageToUser < ActiveRecord::Migration
  def change
    add_column :users, :prefered_language, :string
  end
end
