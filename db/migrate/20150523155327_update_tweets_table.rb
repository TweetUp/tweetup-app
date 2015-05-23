class UpdateTweetsTable < ActiveRecord::Migration
  def change
    change_column :tweets, :tweet_id, :string
    add_column :tweets, :lat, :string
    add_column :tweets, :lon, :string
  end
end
