class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :link, :upvotes, :created_at
  has_one :user
  has_many :comments
end
