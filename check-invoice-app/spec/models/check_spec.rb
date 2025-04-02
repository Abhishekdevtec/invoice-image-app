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
require 'rails_helper'

RSpec.describe Check, type: :model do
  it "is valid with a number and image" do
    company = FactoryBot.create(:company)
    check = FactoryBot.create(:check, company: company)
    expect(check).to be_valid
  end

  it "is invalid without a number" do
    company = FactoryBot.create(:company)
    check = FactoryBot.build(:check, company: company, number: nil)
    expect(check).to_not be_valid
  end

  it "is invalid with a negative number" do
    company = FactoryBot.create(:company)
    check = FactoryBot.build(:check, company: company, number: -1)
    expect(check).to_not be_valid
  end

  it "belongs to a company" do
    association = Check.reflect_on_association(:company)
    expect(association.macro).to eq(:belongs_to)
  end

  it "has many invoices" do
    association = Check.reflect_on_association(:invoices)
    expect(association.macro).to eq(:has_many)
  end

  it "can have an attached image" do
    company = FactoryBot.create(:company)
    check = FactoryBot.create(:check, company: company)
    expect(check.image).to be_attached
  end

  describe '#image_url' do
    it "returns the image URL if the image is attached" do
      company = FactoryBot.create(:company)
      check = FactoryBot.create(:check, company: company)
      expect(check.image_url).to match(/localhost:3000/)
    end

    it "returns nil if the image is not attached" do
      company = FactoryBot.create(:company)
      check = FactoryBot.build(:check, company: company, image: nil)
      expect(check.image_url).to be_nil
    end
  end
end
