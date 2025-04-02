# == Schema Information
#
# Table name: companies
#
#  id         :bigint           not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Company < ApplicationRecord
  has_many :checks, dependent: :destroy
  has_many :invoices, dependent: :destroy

  validates :name, presence: true, uniqueness: true
end
