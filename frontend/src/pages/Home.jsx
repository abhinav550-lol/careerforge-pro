import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">  
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">
          CareerForge Pro
        </h1>
        <p className="text-gray-400 text-lg">
          Your career starts here.
        </p>
         <div className="space-x-4">
          <Link to="/resume-form" className="bg-blue-600 text-white px-4 py-2 rounded">
            Add Resume
          </Link>
          <Link to="/resume-list" className="bg-green-600 text-white px-4 py-2 rounded">
            View Resumes
          </Link>
        </div>

      </div>
    </div> 
  );
};

export default Home;
