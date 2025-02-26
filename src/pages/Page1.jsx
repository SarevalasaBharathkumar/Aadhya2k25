import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/pages.css"; // Import CSS
import image1 from "./h1.jpeg"; 
import image2 from "./h2.jpeg";
import image3 from "./h3.jpeg";
import image4 from "./h4.jpeg";
import image5 from "./h5.jpeg";

const Page1 = () => {
  useEffect(() => {
    // Inject Botpress Chatbot script dynamically
    const script1 = document.createElement("script");
    script1.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://files.bpcontent.cloud/2025/02/26/12/20250226124703-MYR99HJ2.js";
    script2.async = true;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <div className="page-container">
      {/* Text Section */}
      <div className="w-100 px-3 mt-4 text-center">
        <h1 style={{color:"maroon"}}>Welcome to University Discussions and Collaborative Platform</h1>
        <p className="fs-7">
        Where university life meets innovation. Our platform is designed to keep you connected with everything that matters
       class schedules, university events, academic discussions, and career opportunities all in one place.
      
      
        Whether you're looking to <strong style={{color:"maroon"}}>network with alumni</strong>, engage in <strong style={{color:"maroon"}}>live Q&A sessions</strong> with professors, 
        or join a student club,  offers a dynamic, interactive environment for learning and growth.
      
        Stay updated with <strong style={{color:"maroon"}}>real-time notifications</strong>, collaborate on projects, and explore 
        <strong style={{color:"maroon"}}> internships and job postings</strong> tailored to your interests. 
      
        It’s more than just a platform; it’s your university experience, simplified.
      </p>
      </div>

      {/* Image Gallery */}
      <div className="container mt-4">
        <div className="row justify-content-center">
          {/* First Row (3 Images) */}
          <div className="col-md-4 mb-3">
            <img src={image1} alt="Image 1" className="img-fluid rounded shadow" />
          </div>
          <div className="col-md-4 mb-3">
            <img src={image2} alt="Image 2" className="img-fluid rounded shadow" />
          </div>
          <div className="col-md-4 mb-3">
            <img src={image3} alt="Image 3" className="img-fluid rounded shadow" />
          </div>
        </div>

        <div className="row justify-content-center">
          {/* Second Row (2 Images) */}
          <div className="col-md-4 mb-3">
            <img src={image4} alt="Image 4" className="img-fluid rounded shadow" />
          </div>
          <div className="col-md-4 mb-3">
            <img src={image5} alt="Image 5" className="img-fluid rounded shadow" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page1;