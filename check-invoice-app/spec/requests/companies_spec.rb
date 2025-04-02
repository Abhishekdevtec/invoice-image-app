require 'rails_helper'

RSpec.describe "Companies", type: :request do
  let!(:company) { FactoryBot.create(:company) }

  describe "GET /companies" do
    it "returns a successful HTML response" do
      get companies_path
      expect(response).to have_http_status(:success)
      expect(response.body).to include(company.name)
    end

    it "returns a successful JSON response" do
      get companies_path, params: { format: :json }
      expect(response).to have_http_status(:success)
      expect(response.body).to include(company.name)
    end
  end
end
