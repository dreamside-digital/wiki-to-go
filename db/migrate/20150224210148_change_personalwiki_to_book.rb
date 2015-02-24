class ChangePersonalwikiToBook < ActiveRecord::Migration
  def change
  	rename_table :personal_wikis, :books
  end
end
