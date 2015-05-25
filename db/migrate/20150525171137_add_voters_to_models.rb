class AddVotersToModels < ActiveRecord::Migration
  def change
    add_column :posts, :voters, :text, array:true, default: []
    add_column :comments, :voters, :text, array:true, default: []
  end
end