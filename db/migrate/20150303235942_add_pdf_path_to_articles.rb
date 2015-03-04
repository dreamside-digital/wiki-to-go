class AddPdfPathToArticles < ActiveRecord::Migration
  def change
    add_column :articles, :pdf_path, :string
  end
end
