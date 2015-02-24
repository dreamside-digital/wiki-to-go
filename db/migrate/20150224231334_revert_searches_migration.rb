require_relative '20150220105213_create_searches'

class RevertSearchesMigration < ActiveRecord::Migration
  def change
  	revert CreateSearches

  	create_table :searches do |t|
    	t.string :query
    	t.integer :user_id

    t.timestamps null: false
    end
  end
end
