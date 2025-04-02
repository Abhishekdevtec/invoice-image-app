# spec/factories/check_invoices.rb

# == Schema Information
#
# Table name: check_invoices
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  check_id   :bigint
#  invoice_id :bigint
#
# Indexes
#
#  index_check_invoices_on_check_id    (check_id)
#  index_check_invoices_on_invoice_id  (invoice_id)
#
# Foreign Keys
#
#  fk_rails_...  (check_id => checks.id)
#  fk_rails_...  (invoice_id => invoices.id)
#
FactoryBot.define do
  factory :check_invoice do
    check
    invoice
  end
end
