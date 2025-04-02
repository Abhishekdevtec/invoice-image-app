# spec/models/invoice_spec.rb

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
require 'rails_helper'

RSpec.describe Invoice, type: :model do
  it "is valid with a number" do
    company = FactoryBot.create(:company)
    invoice = FactoryBot.create(:invoice, company: company)
    expect(invoice).to be_valid
  end

  it "is invalid without a number" do
    company = FactoryBot.create(:company)
    invoice = FactoryBot.build(:invoice, company: company, number: nil)
    expect(invoice).to_not be_valid
  end

  it "is invalid with a negative number" do
    company = FactoryBot.create(:company)
    invoice = FactoryBot.build(:invoice, company: company, number: -1)
    expect(invoice).to_not be_valid
  end

  it "belongs to a company" do
    association = Invoice.reflect_on_association(:company)
    expect(association.macro).to eq(:belongs_to)
  end

  it "has many checks" do
    association = Invoice.reflect_on_association(:checks)
    expect(association.macro).to eq(:has_many)
  end
end
