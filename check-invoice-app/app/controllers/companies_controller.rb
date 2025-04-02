class CompaniesController < ApplicationController
  def index
    @companies = Company.all

    respond_to do |format|
      format.html
      format.turbo_stream
      format.json { render json: @companies, status: :ok }
    end
  end
end
