# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


10.times do |i|
  Tweet.create(
    tweet_id: "60218133838968012#{i}",
    text: '#tweetupapp Lorem ipsum dolor sit amet',
    image_url: 'http://pbs.twimg.com/media/CFthKstWgAADBoT.jpg',
    lat: '53.55641',
    lon: '9.923058'
  )
end
