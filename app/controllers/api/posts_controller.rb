module Api
  class PostsController < ApplicationController
    before_filter :authenticate_user!, only: [:create, :upvote, :destroy]
    respond_to :json

    def index
      respond_with Post.all
    end

    def show
      respond_with Post.find(params[:post_id])
    end

    def create
      @user = User.find(current_user.id)
      @post = Post.create(post_params.merge(user_id: current_user.id))
      if @post.save
        respond_with @post
      else
        render json: {error: "There was an error saving the post"}
      end
    end

    def upvote
      post = Post.find(params[:post_id])
      post.increment!(:upvotes)
      respond_with post
    end

    def destroy
      post = Post.find(params[:post_id])
      if post.users.include? current_user
        respond_with Post.destroy(params[:post_id])
      end
    end

    private

    def post_params
      params.require(:post).permit(:link, :title)
    end
  end
end