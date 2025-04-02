# spec/factories/invoices.rb

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
FactoryBot.define do
  factory :invoice do
    number { Faker::Number.unique.number(digits: 10) }
    company
    after(:create) do |invoice|
      check = create(:check, company: invoice.company)  # Create a check for the same company
      create(:check_invoice, check: check, invoice: invoice)  # Create the join model
    end
  end
end
