class AddArticlesToPersonalwiki < ActiveRecord::Migration
  def change
  	add_column :personal_wikis, :articles, :text
  end
end
