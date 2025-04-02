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
require 'rails_helper'

RSpec.describe CheckInvoice, type: :model do
  it "is valid with a check and an invoice" do
    company = FactoryBot.create(:company)
    check = FactoryBot.create(:check, company: company)
    invoice = FactoryBot.create(:invoice, company: company)

    check_invoice = CheckInvoice.new(check: check, invoice: invoice)
    expect(check_invoice).to be_valid
  end

  it "is invalid without a check" do
    invoice = FactoryBot.create(:invoice)
    check_invoice = CheckInvoice.new(invoice: invoice)
    expect(check_invoice).to_not be_valid
  end

  it "is invalid without an invoice" do
    check = FactoryBot.create(:check)
    check_invoice = CheckInvoice.new(check: check)
    expect(check_invoice).to_not be_valid
  end

  it "belongs to a check" do
    association = CheckInvoice.reflect_on_association(:check)
    expect(association.macro).to eq(:belongs_to)
  end

  it "belongs to an invoice" do
    association = CheckInvoice.reflect_on_association(:invoice)
    expect(association.macro).to eq(:belongs_to)
  end
end
