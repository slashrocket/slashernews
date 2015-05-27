require 'rails_helper'

RSpec.describe Post, regressor: true do

  # === Relations ===
  it { is_expected.to belong_to :user}
  
  it { is_expected.to have_many :comments}

  # === Nested Attributes ===
  

  # === Database (Columns) ===
  it { is_expected.to have_db_column :id }
	it { is_expected.to have_db_column :title }
	it { is_expected.to have_db_column :link }
	it { is_expected.to have_db_column :upvotes }
	it { is_expected.to have_db_column :created_at }
	it { is_expected.to have_db_column :updated_at }
	it { is_expected.to have_db_column :user_id }
	it { is_expected.to have_db_column :voters }

  # === Database (Indexes) ===
  it { is_expected.to have_db_index ["user_id"]}

  # === Validations (Length) ===
  

  # === Validations (Presence) ===
  

  # === Validations (Numericality) ===
  

  
  # === Enums ===
  
  
end