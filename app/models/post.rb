class Post < ActiveRecord::Base
  has_many :comments
  belongs_to :user
  def as_json(options = {})
    super(options.merge(include: :comments))
  end
end
