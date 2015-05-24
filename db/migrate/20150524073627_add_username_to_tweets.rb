class AddUsernameToTweets < ActiveRecord::Migration
  def change
    add_column :tweets, :user_name, :string
    add_column :tweets, :user_screen_name, :string
  end
end
