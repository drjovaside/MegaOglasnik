class CreateRoleHasActions < ActiveRecord::Migration
  def change
    create_table :role_has_actions do |t|
      t.integer :role_id
      t.integer :action_id

      t.timestamps
    end
  end
end
