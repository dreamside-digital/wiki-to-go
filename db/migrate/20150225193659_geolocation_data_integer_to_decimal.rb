class GeolocationDataIntegerToDecimal < ActiveRecord::Migration
  def change
  	change_column :articles, :latitude, :decimal
  	change_column :articles, :longitude, :decimal
  end
end
