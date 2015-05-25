class SetDefaultUpvotes < ActiveRecord::Migration
  def change
    change_column :posts, :upvotes, :integer, default: 0
    change_column :comments, :upvotes, :integer, default: 0
  end
end
