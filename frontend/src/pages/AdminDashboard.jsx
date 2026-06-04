export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="border-gradient">
        <header className="border-gradient-inner text-white p-4 h-16 flex items-center rounded-lg">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <button className="ml-auto bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded border-2 border-white">
            Logout
          </button>
        </header>
      </div>
      <div className="flex justify-center p-6">
        <div className="border-gradient">
          <div className="border-gradient-inner p-4 rounded-lg flex flex-row">
            <img
              src="/kai_face.jpeg"
              alt="K-AI"
              className="w-10 h-10 rounded-full mr-4 object-cover white-shadow"
            />
            <div>
              <h2 className="text-lg font-semibold">
                Welcome to the Admin Dashboard
              </h2>
              <p className="text-sm text-white/70">
                Manage destinations, hotels, homestays and tourist attractions.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-wrap gap-6 justify-center p-6">
          <div className="border-gradient rounded-lg">
            <div className="border-gradient-inner p-4 rounded-lg">
            <h2>Total Places Analytics</h2>
          </div>
          </div>
           <div className="border-gradient rounded-lg">
            <div className="border-gradient-inner p-4 rounded-lg">
            <h2>Total Visitors</h2>
          </div>
          </div>
           <div className="border-gradient rounded-lg">
            <div className="border-gradient-inner p-4 rounded-lg">
            <h2>Manage Destinations</h2>
          </div>
          </div>
        </div>
      </div>
      <div className="border-gradient m-2">
          <div className="border-gradient-inner p-4 rounded-lg ">
            <h2 className="text-lg font-semibold text-center">Available Places</h2>
            <div></div>

          </div>
        </div>
    </div>
  );
}
