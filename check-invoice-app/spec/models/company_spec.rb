# spec/models/company_spec.rb

# == Schema Information
#
# Table name: companies
#
#  id         :bigint           not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'rails_helper'

RSpec.describe Company, type: :model do
  it "is valid with a name" do
    company = FactoryBot.create(:company)
    expect(company).to be_valid
  end

  it "is invalid without a name" do
    company = FactoryBot.build(:company, name: nil)
    expect(company).to_not be_valid
  end

  it "has many checks" do
    association = Company.reflect_on_association(:checks)
    expect(association.macro).to eq(:has_many)
  end

  it "has many invoices" do
    association = Company.reflect_on_association(:invoices)
    expect(association.macro).to eq(:has_many)
  end
end
