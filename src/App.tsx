import './index.css'
import TaxFormsModule from './taxForms/TaxFormsModule'

function App() {
  return (
    <div className=" bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          W9 & 1099 Tax Forms Manager
        </h1>
        <TaxFormsModule />
      </div>
    </div>
  )
}

export default App
