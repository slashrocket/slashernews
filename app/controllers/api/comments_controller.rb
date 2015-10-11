module Api
  # Handle creating and modifying comments
  class CommentsController < ApplicationController
    before_filter :authenticate_user!, only: [:create, :upvote]

    def create
      @post = Post.find(params[:post_id])
      @comment = @post.comments.create(comment_params.merge(user_id: current_user.id))
      respond_to do |format|
        format.json { render json: @comment }
      end
    end

    def upvote
      @comment = Comment.find(params[:id])
      submit_vote unless has_already_voted_or_owns_the_comment
      respond_to do |format|
        format.json { render json: @comment }
      end
    end

    def destroy
      @comment = Comment.find(params[:id])
      respond_with Post.destroy(params[:post_id]) if post.users.include? current_user
    end

    private

    def has_already_voted_or_owns_the_comment
      @comment.voters.include?(current_user.id.to_s) || @comment.user_id == current_user.id
    end

    def submit_vote
      @comment.voters << current_user.id
      @comment.increment!(:upvotes)
    end

    def comment_params
      params.require(:comment).permit(:body)
    end

    def default_serializer_options
      { root: false }
    end
  end
end
