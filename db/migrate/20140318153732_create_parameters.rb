class CreateParameters < ActiveRecord::Migration
  def change
    create_table :parameters do |t|
      t.integer :parameter_type_id
      t.integer :item_id
      t.string :value

      t.timestamps
    end
  end
end
