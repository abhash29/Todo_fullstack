import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Header() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { id } = useParams(); // get user id from URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token"); // JWT token
        const result = await axios.get(`http://127.0.0.1:8787/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // send token for auth
          },
        });
        console.log(result.data); 
        setFirstName(result.data.firstname);
        setLastName(result.data.lastname);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (id) fetchUserDetails();
  }, [id]);

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="flex justify-between items-center px-4 py-2">
        <div className="text-sm font-medium">
          {firstName} {lastName}
        </div>
        <button
          onClick={() => navigate('/login')}
          className="px-2 py-1 text-sm bg-white text-blue-600 rounded hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </div>

      <div className="text-2xl font-bold text-center mt-3 mb-2">
        Todo App
      </div>
      <div className="h-px bg-gray-300 my-2"></div>
    </header>
  );
}

export default Header;
