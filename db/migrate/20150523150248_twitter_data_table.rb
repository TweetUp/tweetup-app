class TwitterDataTable < ActiveRecord::Migration
  def change
    create_table :tweets do |t|
      t.integer :tweet_id, null: false
      t.text :text, null: false
      t.string :image_url
      t.timestamps
    end
  end
end
