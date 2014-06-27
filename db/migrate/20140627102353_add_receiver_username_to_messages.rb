class AddReceiverUsernameToMessages < ActiveRecord::Migration
  def change
    add_column :messages, :receiver_username, :string
  end
end
