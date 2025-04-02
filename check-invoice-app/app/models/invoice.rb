# == Schema Information
#
# Table name: invoices
#
#  id         :bigint           not null, primary key
#  number     :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  company_id :bigint
#
# Indexes
#
#  index_invoices_on_company_id  (company_id)
#
# Foreign Keys
#
#  fk_rails_...  (company_id => companies.id)
#
class Invoice < ApplicationRecord
  belongs_to :company
  has_many :check_invoices, dependent: :destroy
  has_many :checks, through: :check_invoices

  validates :number, presence: true, uniqueness: true, numericality: { greater_than_or_equal_to: 0, message: "Check number cannot be negative" }
end
