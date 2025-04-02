class ChecksController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [ :create ]
  def index
    @checks = Check.includes(:company, :invoices).order(created_at: :desc)

    respond_to do |format|
      format.html
      format.turbo_stream
      format.json { render json: @checks.as_json(methods: [:image_url], include: { company: { only: :name }, invoices: { only: :number } }) }
    end
  end

  def new
    @check = Check.new
  end

  def create
    begin
      ActiveRecord::Base.transaction do
        @check = Check.new(check_params)

        if @check.save
          invoice_numbers = params[:check][:invoice_ids].to_s.split(",").map(&:strip).reject(&:blank?)
          invoices = []

          invoice_numbers.each do |number|
            invoice = Invoice.new(number: number, company_id: @check.company_id)
            if invoice.save
              invoices << invoice
            else
              @check.errors.add(:base, "Failed to assign invoice #{number}: #{invoice.errors.full_messages.join(', ')}")
              raise StandardError, error_message
            end
          end

          @check.invoices = invoices

          respond_to do |format|
            format.html { redirect_to @check, notice: "Check was successfully created." }
            format.turbo_stream
            format.json do
              render json: {
                check: @check.as_json(include: [:company, :invoices]),
                message: "Check was successfully created."
              }, status: :created
            end
          end
        else
          raise StandardError, error_message
        end
      end
    rescue => e
      respond_to do |format|
        format.html { render :new, status: :unprocessable_entity }
        format.turbo_stream { render turbo_stream: turbo_stream.replace("new_check", partial: "checks/form", locals: { check: @check }) }
        format.json { render json: { errors: @check.errors.full_messages }, status: :unprocessable_entity }
      end
    end
  end

  private

  def check_params
    params.require(:check).permit(:number, :company_id, :image)
  end
end
