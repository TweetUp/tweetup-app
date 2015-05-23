class TweetsController < ApplicationController
  skip_authorization_check
  skip_before_action :authenticate_user!

  def index
    respond_to do |format|
      format.html { @tweets = Tweet.all.limit(5) }
      format.json { render json: Tweet.all }
    end
  end
end
