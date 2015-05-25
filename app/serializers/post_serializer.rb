class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :link, :upvotes, :voters ,:created_at
  has_one :user
  has_many :comments
end
