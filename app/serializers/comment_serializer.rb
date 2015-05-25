class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :upvotes, :post_id, :created_at
  has_one :user
end
