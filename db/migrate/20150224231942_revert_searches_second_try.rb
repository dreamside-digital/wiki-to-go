require_relative '20150220105213_create_searches'

class RevertSearchesSecondTry < ActiveRecord::Migration
  def change
  	revert CreateSearches
  end
end
