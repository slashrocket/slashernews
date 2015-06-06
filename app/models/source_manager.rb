class SourceManager
  class << self
    PROTOCOLS = ['http', 'https']

    def source(data)
      return if data.images.empty?
      remove_protocols(data.images.first.src.to_s)
    end

    private

    def remove_protocols(source)
      PROTOCOLS.inject(source) do |result, element|
        result.gsub("#{element}:", '')
      end
    end
  end
end
