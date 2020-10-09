# frozen_string_literal: true

class ApplicationDecorator < Draper::Decorator
  delegate_all

  self.include_root_in_json = true

  def api_selector_api_link
    raise NoMethodError, __method__
  end

  def self.collection_decorator_class
    PaginatingDecorator
  end

<<<<<<< HEAD
  private

  API_KEYS = %w[id name system_name links apps_count backends_count unread_alerts_count products_count].freeze

  # FIXME: slice makes the presented very rigid. Better use option :only and :methods when calling to_json
  def parse_api(api_hash)
    add_updated_at(add_link(add_api_type(api_hash.slice(*API_KEYS))))
  end

  def add_link(api_hash)
    api_hash[:link] = api_selector_api_link if object.id
    api_hash
  end

  def add_api_type(api_hash)
    api_hash[:type] = backend_api? ? 'backend' : 'product'
    api_hash
  end

  def add_updated_at(api_hash)
    api_hash[:updated_at] = object.updated_at.to_s :long if object.updated_at?
    api_hash
  end

  def backend_api?
    raise NoMethodError, __method__
=======
  def updated_at
    object.updated_at.to_s :long if object.updated_at?
>>>>>>> af67a08305957eb50ec8ff5be64adf71f3e41ef3
  end
end
