class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :link, :upvotes, :thumbnail, :voters ,:created_at
  has_one :user
  has_many :comments

  def thumbnail
    object.thumbnail.present? ? object.thumbnail : '//img.imgur.com/NAhYNUt.jpg'
  end
end
