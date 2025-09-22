export default function TestContainer() {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold py-8 bg-gradient-to-r from-blue-600 to-orange-600 text-white">
        max-w-6xl Test Page - Check How Content Centers
      </h1>

      {/* Test 1: With max-w-6xl - content should be centered with max-width */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 border-4 border-red-500">
          <div className="bg-blue-500 text-white p-6 rounded">
            <h2 className="text-xl font-bold mb-2">WITH max-w-6xl Class</h2>
            <p>✅ This content is CENTERED with max-width constraints</p>
            <p>✅ Red border shows max-w-6xl boundaries</p>
            <p>✅ On all screens: max-width is 1152px (6xl)</p>
            <p>✅ Content stays centered as screen grows</p>
          </div>
        </div>
      </section>

      {/* Test 2: Without max-w-6xl - content should be full width */}
      <section className="py-8 bg-gray-200">
        <div className="px-4 border-4 border-green-500">
          <div className="bg-orange-500 text-white p-6 rounded">
            <h2 className="text-xl font-bold mb-2">WITHOUT max-w-6xl Class</h2>
            <p>❌ This content spans FULL WIDTH</p>
            <p>❌ Green border shows it goes edge to edge</p>
            <p>❌ No max-width constraints</p>
            <p>❌ Content stretches on large screens</p>
          </div>
        </div>
      </section>

      {/* Test 3: max-w-6xl with different background to show centering */}
      <section className="py-8 bg-gradient-to-r from-blue-100 to-orange-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">max-w-6xl Centering Demo</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-500 text-white p-4 rounded text-center">
                <h3 className="font-bold">Column 1</h3>
                <p>Centered content</p>
              </div>
              <div className="bg-orange-500 text-white p-4 rounded text-center">
                <h3 className="font-bold">Column 2</h3>
                <p>Centered content</p>
              </div>
              <div className="bg-blue-500 text-white p-4 rounded text-center">
                <h3 className="font-bold">Column 3</h3>
                <p>Centered content</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Test 4: Multiple containers showing consistent centering */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded">
            <h2 className="text-xl font-bold">Section 1</h2>
            <p>All sections with max-w-6xl align to the same center and max-width</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded">
            <h2 className="text-xl font-bold">Section 2</h2>
            <p>Notice how all sections have the same width and alignment</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded">
            <h2 className="text-xl font-bold">Section 3</h2>
            <p>Perfect alignment across all sections</p>
          </div>
        </div>
      </section>

      {/* Visual Guide */}
      <section className="py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="border-2 border-dashed border-blue-500 p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">max-w-6xl Information</h2>
            <div className="space-y-2 text-center">
              <p className="text-xl font-bold text-blue-600">max-w-6xl = 1152px (72rem)</p>
              <p className="text-lg">Consistent width on all breakpoints</p>
              <p className="text-sm text-gray-600">📱 Mobile: Fluid width with padding</p>
              <p className="text-sm text-gray-600">💻 Tablet: Fluid width with padding</p>
              <p className="text-sm text-gray-600">🖥️ Desktop and larger: Fixed max-width of 1152px</p>
            </div>
          </div>
        </div>
      </section>

      {/* Instructions */}
      <section className="py-8 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">How to Test:</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Resize your browser window from small to large</li>
            <li>Notice how max-w-6xl maintains consistent max-width and stays centered</li>
            <li>Compare sections WITH max-w-6xl vs WITHOUT max-w-6xl</li>
            <li>Red border = with max-w-6xl (centered, max 1152px)</li>
            <li>Green border = without max-w-6xl (full width)</li>
          </ol>
        </div>
      </section>
    </div>
  )
}