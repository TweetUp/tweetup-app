class TweetsController < ApplicationController
  skip_authorization_check
  skip_before_action :authenticate_user!

  def index
    @tweets = Tweet.all
    render json: @tweets
  end
end
