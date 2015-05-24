class TweetsController < ApplicationController
  skip_authorization_check
  skip_before_action :authenticate_user!
  layout false

  def index
    tweets = Tweet.all.with_location_data.order(created_at: :desc)
    respond_to do |format|
      format.html { @tweets = tweets.limit(5) }
      format.json { render json: tweets }
    end
  end
end
