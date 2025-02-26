import React from "react";

const Card = ({ children }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      {children}
    </div>
  );
};

const CardContent = ({ children }) => {
  return <div className="p-2">{children}</div>;
};

export { Card, CardContent };
