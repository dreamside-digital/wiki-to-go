class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
    	t.integer :personalwiki_id
    	t.string :title
    	t.integer :pageid
    	t.string :url
    	t.integer :latitude
    	t.integer :longitude

      t.timestamps null: false
    end
  end
end
