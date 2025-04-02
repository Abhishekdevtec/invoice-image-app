class InvoicesController < ApplicationController
  def index
    @invoices = Invoice.includes(:checks).order(:number)

    respond_to do |format|
      format.html
      format.json { render json: @invoices.to_json(include: { company: {}, checks: {} }), status: :ok }
    end
  end
end
