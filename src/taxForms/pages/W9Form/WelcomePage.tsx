// Page 1: Welcome Page
const WelcomePage: React.FC<{ onSelectForm: (form: string) => void }> = ({
  onSelectForm,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-light text-gray-800 mb-2 text-center">
          New! Welcome to tax year <span className="font-semibold">2025</span>
        </h1>
        <p className="text-2xl text-gray-700 mb-12 text-center">
          Which form would you like to start using?
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => onSelectForm("1099")}
            className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-gray-200 hover:border-primary"
          >
            <div className="text-center">
              <div className="text-sm font-semibold text-white bg-primary inline-block px-3 py-1 rounded mb-2">
                Create
              </div>
              <div className="text-5xl font-bold text-primary/90 mb-4">
                1099
              </div>
              <p className="text-gray-600 text-lg">
                The 1099 form is used to report income from independent
                contractors and freelancers. If you hired someone as a
                contractor and paid them more than $600 during the tax year,
                this is the form you’ll need to file.
              </p>
              <div className="text-gray-600 space-y-1"></div>
            </div>
          </button>

          <button
            onClick={() => onSelectForm("W9")}
            className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-gray-200 hover:border-orange-500"
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
