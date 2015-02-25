class FixArticlesColumnName < ActiveRecord::Migration
  def change
  	rename_column :articles, :personalwiki_id, :book_id
  end
end
