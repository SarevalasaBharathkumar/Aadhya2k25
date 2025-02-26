import React, { useEffect } from "react";
import "../styles/pages.css"; // Import CSS
import "bootstrap/dist/css/bootstrap.min.css";


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
      <div class="page-container">
      // Cleanup scripts when component unmounts
      document.body.removeChild(script1);
      document.body.removeChild(script2);
      </div>
    };
  }, []);


};

export default Page1;
