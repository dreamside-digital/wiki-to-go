class AddPdfPathToBook < ActiveRecord::Migration
  def change
    add_column :books, :pdf_path, :string
  end
end
