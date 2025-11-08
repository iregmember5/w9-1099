// Page 1: Welcome Page
const WelcomePage: React.FC<{ onSelectForm: (form: string) => void }> = ({
  onSelectForm,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-3">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-light text-gray-800 mb-2 text-center">
          New! Welcome to tax year <span className="font-semibold">2025</span>
        </h1>
        <p className="text-2xl text-gray-700 mb-12 text-center">
          Which form would you like to start using?
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => onSelectForm("W9")}
            className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-gray-200 hover:border-orange-500 max-w-md w-full"
          >
            <div className="text-center">
              <div className="text-sm font-semibold text-white bg-orange-500 inline-block px-3 py-1 rounded mb-2">
                Create
              </div>
              <div className="text-6xl font-bold text-orange-400 mb-4">W-9</div>
              <p className="text-gray-600 text-lg">
                The W-9 form is used by businesses to collect necessary tax
                information from their contractors or vendors. You'll use this
                form to provide your Taxpayer Identification Number (TIN) to the
                business for tax reporting purposes.
              </p>
              <div className="text-gray-600 space-y-1"></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
