require 'rails_helper'

RSpec.describe "Invoices", type: :request do
  let!(:invoice) { FactoryBot.create(:invoice) }

  describe "GET /invoices" do
    it "returns a successful HTML response" do
      get invoices_path
      expect(response).to have_http_status(:success)
      expect(response.body).to include(invoice.number)
      expect(response.body).to include(invoice.checks.first.number)
    end

    it "returns a successful JSON response" do
      get invoices_path, params: { format: :json }
      expect(response).to have_http_status(:success)
      expect(response.body).to include(invoice.number)
      expect(response.body).to include(invoice.company.name)
    end
  end
end
