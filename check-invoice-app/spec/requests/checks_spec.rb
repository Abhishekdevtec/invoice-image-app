require 'rails_helper'

RSpec.describe ChecksController, type: :request do
  let(:company) { FactoryBot.create(:company) }
  let!(:check) { FactoryBot.create(:check, company: company) }
  let(:valid_params) do
    {
      check: {
        number: '12345',
        company_id: company.id,
        image: Rack::Test::UploadedFile.new(Rails.root.join('spec/fixtures/files/sample_image.jpg'), 'image/png'),
        invoice_ids: '988, 989, 990'
      }
    }
  end

  describe 'GET #new' do
    it 'assigns a new Check to @check' do
      get new_check_path

      expect(response).to have_http_status(:success)
      expect(response.body).to include('form')
      expect(response.body).to include('check_number')
    end
  end

  describe "GET /checks" do
    it "returns a successful HTML response" do
      get checks_path
      expect(response).to have_http_status(:success)
      expect(response.body).to include(check.number)
      expect(response.body).to include(check.company.name)
    end

    it "returns a successful JSON response" do
      get checks_path, params: { format: :json }
      expect(response).to have_http_status(:success)
      expect(response.body).to include(check.number)
      expect(response.body).to include(check.company.name)
    end
  end

  describe "POST /checks" do
    context "when the check is created successfully" do
      it "redirects to the show page with an HTML response" do
        post checks_path, params: valid_params
        check = Check.last
        expect(response).to redirect_to(check_path(check))
        expect(flash[:notice]).to eq("Check was successfully created.")

        check.reload
        invoice_ids = valid_params[:check][:invoice_ids].split(',').map(&:strip).map(&:to_i)
        expect(check.invoices.count).to eq(invoice_ids.length)
      end

      it "returns a successful Turbo Stream response" do
        post checks_path, params: valid_params.merge(format: :turbo_stream)
        expect(response).to have_http_status(:success)
        expect(response.body).to include("<turbo-stream action=\"update\" target=\"new_check\"")
      end

      it "returns a successful JSON response" do
        post checks_path, params: valid_params.merge(format: :json)
        check = Check.last

        expect(response).to have_http_status(:created)
        expect(response.body).to include('Check was successfully created.')
        expect(response.body).to include('company')
        expect(response.body).to include('invoices')

        invoice_ids = valid_params[:check][:invoice_ids].split(',').map(&:strip).map(&:to_i)
        expect(JSON.parse(response.body)['check']['invoices'].count).to eq(invoice_ids.length)
      end
    end

    context "when the check creation fails" do
      it "renders the form with errors on failure (HTML)" do
        invalid_params = { check: { number: '', company_id: company.id } }
        post checks_path, params: invalid_params
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "renders the form with errors on failure (Turbo Stream)" do
        invalid_params = { check: { number: '', company_id: company.id } }
        post checks_path, params: invalid_params.merge(format: :turbo_stream)
        expect(response.body).to include('new_check')
      end

      it "returns a JSON response with errors" do
        invalid_params = { check: { number: '', company_id: company.id } }
        post checks_path, params: invalid_params.merge(format: :json)
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.body).to include("can't be blank")
      end
    end
  end
end
