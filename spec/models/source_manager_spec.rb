describe SourceManager do
  subject { SourceManager }

  it { should respond_to(:source) }

  let(:data_structure) do
    Struct.new(:images) do
      def images
        [Struct.new(:src) do
          def src
            'http://test-image.jpg'
          end
        end.new]
      end
    end.new
  end

  describe '#source' do
    it 'abstracts source from image url' do
      expect(SourceManager.source(data_structure)).to eq '//test-image.jpg'
    end
  end
end
