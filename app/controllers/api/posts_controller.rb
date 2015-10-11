module Api
  # List, create, and modify Posts
  class PostsController < ApplicationController
    before_filter :authenticate_user!, only: [:create, :upvote, :destroy]
    respond_to :json

    def index
      respond_with Post.includes(:comments, :user)
    end

    def show
      respond_with Post.where('id = ?', params[:id]).includes(:comments, :user).first
    end

    def create
      @post = Post.create(post_params.merge(user_id: current_user.id))
      respond_to do |format|
        format.json { render json: @post }
      end
    end

    def upvote
      @post = Post.find(params[:id])
      submit_vote unless has_already_voted_or_owns_the_post
      respond_to do |format|
        format.json { render json: @post }
      end
    end

    def destroy
      @post = Post.find(params[:id])
      respond_with Post.destroy(params[:id]) if post.users.include? current_user
    end

    private

    def has_already_voted_or_owns_the_post
      @post.voters.include?(current_user.id.to_s) || @post.user_id == current_user.id
    end

    def submit_vote
      @post.voters << current_user.id
      @post.increment!(:upvotes)
    end

    def post_params
      params.require(:post).permit(:link)
    end

    def default_serializer_options
      { root: false }
    end
  end
end
