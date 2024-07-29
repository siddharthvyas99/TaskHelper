# frozen_string_literal: true

source "https://rubygems.org"

ruby "3.2.4"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 7.1.3", ">= 7.1.3.2"

# Application server
gem "puma", "6.4.2"

# database
gem "pg", "1.5.4"

gem "shakapacker", "6.5.2"

# JS compressor
gem "terser"

# Faster env load times
gem "bootsnap", "1.17.0", require: false

gem "base64", "0.2.0"

# For cache store
gem "redis", "5.0.8"

# Background jobs
gem "sidekiq", "7.1.6"

# For periodic jobs on sidekiq
gem "sidekiq-cron", "1.10.1"

# For seeing failed jobs in sidekiq
gem "sidekiq-failures"

# adds unique constraints to sidekiq jobs
gem "sidekiq-unique-jobs"

# Authentication
gem "devise", "4.9.3"

# Authorization
gem "pundit"

# Google Authentication
gem "omniauth-google-oauth2", "1.1.1"

gem "autoprefixer-rails"

gem "dotenv-rails", "2.8.1"

# Cross-Origin Resource Sharing (CORS) for Rack compatible web applications
gem "rack-cors", "2.0.2", require: "rack/cors"

# Rack attack gem for DDOS attacks
gem "rack-attack"

# Rails request timeout, needed if running on Heroku-
# https://devcenter.heroku.com/articles/request-timeout
gem "rack-timeout", require: "rack/timeout/base"

# To use AWS S3 as backend for ActiveStorage
gem "aws-sdk-s3", require: false

# Error tracking
gem "honeybadger"

# convert email css to inline
gem "premailer-rails"

# I18n Internationalization
gem "rails-i18n"

# To inject React components in views and pass props from server
gem "react-rails"

# JSON builder
gem "jbuilder"

# Pagination
gem "pagy"

# Application Perfomance Monitoring
gem "newrelic_rpm", "9.6.0"

# Image processing
gem "mini_magick"

# Email previews for Actionmailer
gem "rails_email_preview"
# ActiveRecord Session Store
gem "activerecord-session_store"

# To fix uninitialized constant Mail::TestMailer with ruby 3.1.2
gem "net-smtp" # to send email
gem "net-imap" # for rspec
gem "net-pop" # for rspec

# Catch unsafe migrations in development
# gem "strong_migrations"

# support data migrations alongside schema migrations
gem "data_migrate"

# Generate fake data
gem "faker"

gem "solid_cache"

# To send marketing data to intercom
gem "intercom-rails"

# For product analytics
gem "mixpanel-ruby"

# Websockets don't work with rack v3.1.3
gem "rack", "3.0.11"

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem "web-console"

  # A Ruby static code analyzer, based on the community Ruby style guide
  gem "rubocop", require: false

  gem "rubocop-minitest"

  # A RuboCop extension focused on enforcing Rails best practices and coding conventions.
  gem "rubocop-rails", "2.22.1", require: false

  # For linting ERB files
  gem "erb_lint", require: false, git: "https://github.com/Shopify/erb-lint.git", branch: "main"

  # Patch-level verification for Bundler.
  gem "bundler-audit", require: false

  # vulnerabity checker for Ruby itself.
  gem "ruby_audit", require: false

  gem "rack-mini-profiler"

  # For checkking security vulnerabilities
  gem "brakeman"
end

group :development, :heroku do
  # For testing the mail locally
  gem "letter_opener"

  # For testing the emails in the browser, works with `letter_opener`
  gem "letter_opener_web"
end

group :development, :test do
  # To replace using fixures
  gem "factory_bot_rails"

  # reports N+1 queries
  gem "bullet"

  gem "awesome_print"

  # Adds step-by-step debugging and stack navigation capabilities to pry using byebug.
  # supports both syntax - pry and byebug
  gem "pry-byebug"

  gem "wkhtmltopdf-binary"

  # Complete suite of testing facilities
  gem "minitest"
end

group :test do
  # Test coverage
  gem "simplecov", require: false

  # for stubbing and setting expectations on HTTP requests
  gem "webmock"

  # To mock and stub objects in tests
  gem "mocha"

  gem "minitest-reporters"

  # Records test results and generates XML files.
  gem "minitest-ci"

  # helps you isolate and debug random test failures.
  gem "minitest-bisect"
end

group :development, :staging, :heroku, :test do
  gem "database_cleaner"
end

group :production do
  # This gem works together with the Judoscale Heroku add-on
  # to automatically scale web and worker dynos
  gem "judoscale-rails", "1.5.2"
  gem "judoscale-sidekiq"
end
