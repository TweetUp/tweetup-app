require 'dotenv'
require 'rubygems'
require 'bundler/setup'
require 'tweetstream'

Dotenv.load

ENV["RAILS_ENV"] ||= "development"

root = File.expand_path(File.join(File.dirname(__FILE__), '..'))
require File.join(root, "config", "environment")

TweetStream.configure do |config|
  config.consumer_key = ENV['TWITTER_CONSUMER_KEY']
  config.consumer_secret = ENV['TWITTER_CONSUMER_SECRET']
  config.oauth_token = ENV['TWITTER_AUTH_TOKEN']
  config.oauth_token_secret = ENV['TWITTER_AUTH_TOKEN_SECRET']
  config.auth_method = :oauth
end

main_tag = 'tweetupapp'

daemon = TweetStream::Daemon.new('tracker',
  :log_output => true,
  :backtrace  => true,
)

daemon.on_inited do
  ActiveRecord::Base.connection.reconnect!
  ActiveRecord::Base.logger = Logger.new(
    File.open(File.join(root, "log", "stream.log"), 'w+')
  )
end

daemon.on_error do |message|
  puts "on_error: #{message}"
end

daemon.on_reconnect do |timeout, retries|
  puts "on_reconnect: #{timeout}, #{retries}"
end

daemon.on_limit do |discarded_count|
  puts "on_limit: #{skip_count}"
end

daemon.track([main_tag]) do |tweet|
  t = Tweet.new({
    tweet_id: tweet.id,
    text: tweet.text,
    image_url: tweet.media.first.try(:media_url).try(:to_s),
    lat: tweet.geo.coordinates.first,
    lon: tweet.geo.coordinates.last
  })
  tags = tweet.hashtags.map(&:text)
  tags.delete(main_tag)
  t.tag_list.add(tags)
  t.save!
end
