import React, { useEffect, useState } from "react";

interface VectorCreationProps {
  content: string;
}

const VectorCreation: React.FC<VectorCreationProps> = ({ content }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return visible ? (
    <div className="w-full p-1 ">
      <span className="flex flex-col items-center py-2 px-6 border-2 rounded-md shadow hover:shadow-lg transition-shadow duration-300 h-full tile-animation">
        <span className="font-bold">{content}</span>
      </span>
    </div>
  ) : null;
};

export default VectorCreation;
