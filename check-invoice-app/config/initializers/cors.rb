Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # origins "*" # ⚠️ Allows all origins. Replace '*' with specific domains for security.
    origins "*"
    resource "*",
      headers: :any,
      methods: [ :get, :post, :put, :patch, :delete, :options ]
  end
end
