class RemovePasswordDigestAndNameFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :password_digest
    remove_column :users, :name
  end
end
