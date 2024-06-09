import React ,{useEffect} from 'react'




export default function Redirect() {


    useEffect(() => {
        // Function to extract token from URL params
        const getTokenFromParams = () => {
          const params = new URLSearchParams(window.location.search);
          const token = params.get('token');
          if (token) {
            // Store token in local storage
            localStorage.setItem('token', token);
            // Get userid from URL params
            const userId = params.get('id');
            // Redirect to profile page with token and userid
            window.location.href = `http://localhost:3000/profileuser/${token}/${userId}`;
          }
        };
    
        // Call the function when component mounts
        getTokenFromParams();
      }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div>loading..</div>
  )
}
