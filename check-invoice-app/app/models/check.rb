# == Schema Information
#
# Table name: checks
#
#  id         :bigint           not null, primary key
#  number     :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  company_id :bigint
#
# Indexes
#
#  index_checks_on_company_id  (company_id)
#
# Foreign Keys
#
#  fk_rails_...  (company_id => companies.id)
#
class Check < ApplicationRecord

  include Rails.application.routes.url_helpers

  belongs_to :company
  has_one_attached :image

  has_many :check_invoices, dependent: :destroy
  has_many :invoices, through: :check_invoices

  validates :number, presence: true, uniqueness: { message: "for check already taken and check number must be uniq." }, numericality: { greater_than_or_equal_to: 0, message: "Check number cannot be negative" }
  validates :image, presence: true


  def image_url
    return unless image.attached? # Ensure image is present

    Rails.application.routes.url_helpers.rails_blob_url(image, host: "localhost:3000")
  rescue => e
    Rails.logger.error "Error generating image URL: #{e.message}"
    nil
  end
end
