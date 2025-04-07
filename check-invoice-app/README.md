# Check Invoice App

## Overview

This project consists of two parts:

1. **check-invoice-app** - A Rails 8 MVC backend that handles business logic, API endpoints, and also provides views, so it can function independently without the React frontend.
2. **check-invoice-frontend** - A React frontend that provides a modern user interface and communicates with the backend via APIs.

## Tech Stack

### Backend (Rails 8)

* **Ruby:** 3.2.2
* **Rails:** 8.0.2
* **Database:** PostgreSQL
* **Puma:** Web Server
* **Turbo Rails & Stimulus:** For interactive UI enhancements
* **Tailwind CSS:** Styling
* **RSpec & FactoryBot:** Testing

### Frontend (React)

* **React** : ^19.1.0
* **Node.js:** 21.7.1
* **npm:** 10.5.0
* **Yarn:** 1.22.19
* **React Router:** Client-side navigation
* **Axios:** API requests
* **Tailwind CSS:** Styling

## Prerequisites

Ensure you have the following installed on your system before setting up the project:

### Backend (Rails 8)

* **Ruby** (3.3.3 or later)
* **Rails** (8.0.2 or later)
* **PostgreSQL**
* **Bundler**
* **Node.js** (for compiling assets)
* **Yarn** (for managing JavaScript dependencies) or npm

### Frontend (React)

* **Node.js** (21.7.1 or later)
* **npm** (10.5.0 or later)

## Setup Instructions

### 1. Backend Setup (Rails 8)

```sh
cd check-invoice-app
gem install bundler
bundle install
rails db:create 
rails db:migrate
rails db:seed
rails s

if assets not loaded please run 
rails assets:precompile

before running rails sever
```

This will start the Rails API server.
Visit `http://localhost:3000` in your browser for rails only app

or if you want to run using react frontend then follow step 2-

### 2. Frontend Setup (React)

```sh
cd check-invoice-frontend
npm start

if not work install dependecies using 
npm install
```

This will start the React development server.
Visit `http://localhost:3001` in your browser for react frontend

## Running Tests

### Backend (Rails)

```sh
cd check-invoice-app
rspec
```
