class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :upvotes, :post_id, :voters, :created_at
  has_one :user
end
