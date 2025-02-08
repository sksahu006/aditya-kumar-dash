export default function NotFoundPage() {
    return (
      <section className="flex flex-col items-center justify-center min-h-screen bg-white font-serif">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <div
              className="w-full h-[400px] bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage:
                  "url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)",
              }}
            >
              <h1 className="text-8xl font-bold text-gray-900">404</h1>
            </div>
  
            <div className="mt-[-50px] text-center">
              <h2 className="text-3xl font-semibold text-gray-800">
                Looks like you're not at Kalamba
              </h2>
              <p className="text-lg text-gray-600 mt-2">
                The page will be available when you will be at  kalamba
              </p>
              <a
                href="/"
                className="mt-6 inline-block px-6 py-3 bg-green-600 text-white font-medium text-lg rounded-md shadow-md hover:bg-green-700 transition duration-300"
              >
                Go to Home
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
  