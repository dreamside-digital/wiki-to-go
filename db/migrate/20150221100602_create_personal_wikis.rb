class CreatePersonalWikis < ActiveRecord::Migration
  def change
    create_table :personal_wikis do |t|
    	t.integer :user_id

      t.timestamps null: false
    end
  end
end
