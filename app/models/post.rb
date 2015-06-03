class Post < ActiveRecord::Base
  has_many :comments
  belongs_to :user
  before_save :get_data

  def get_data
    data = LinkThumbnailer.generate(self.link)
    self.title = data.title
    self.thumbnail = data.images.first.src.to_s.gsub('http:','').gsub('https:','')
  end
end
