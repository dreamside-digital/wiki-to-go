class AddIntroColumnToArticles < ActiveRecord::Migration
  def change
    add_column :articles, :intro, :text
  end
end
