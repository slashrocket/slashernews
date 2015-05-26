module Api
  class PostsController < ApplicationController
    before_filter :authenticate_user!, only: [:create, :upvote, :destroy]
    respond_to :json

    def index
      respond_with Post.all
    end

    def show
      respond_with Post.find(params[:id])
    end

    def create
      @user = User.find(current_user.id)
      @post = Post.create(post_params.merge(user_id: current_user.id))
      respond_to do |format| 
        format.json { render json: @post } 
      end
    end

    def upvote
      @post = Post.find(params[:id])
      if @post.voters.include?(current_user.id.to_s)
        @post.voters << current_user.id
        @post.increment!(:upvotes)
      end
      respond_to do |format| 
        format.json { render json: @post } 
      end
    end

    def destroy
      @post = Post.find(params[:id])
      if post.users.include? current_user
        respond_with Post.destroy(params[:id])
      end
    end

    private

    def post_params
      params.require(:post).permit(:link, :title)
    end
    
    def default_serializer_options
      {root: false}
    end
  end
end