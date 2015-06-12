require 'rails_helper'

RSpec.describe Api::PostsController, regressor: true do
  # === Routes (REST) ===
  it { should route(:get, '/api/posts').to('api/posts#index', {format::json}) }
	it { should route(:get, '/api/posts/1').to('api/posts#show', {id:"1", format::json}) }
	it { should route(:post, '/api/posts').to('api/posts#create', {format::json}) } 
	it { should route(:put, '/api/posts/1/upvote').to('api/posts#upvote', {post_id:"1", format::json}) } 
  # === Callbacks (Before) ===
  it { should use_before_filter(:verify_authenticity_token) }
	it { should use_before_filter(:configure_permitted_parameters) }
	it { should use_before_filter(:authenticate_user!) }
  # === Callbacks (After) ===
  it { should use_after_filter(:set_xsrf_token_cookie) }
	it { should use_after_filter(:verify_same_origin_request) }
  # === Callbacks (Around) ===
  
end