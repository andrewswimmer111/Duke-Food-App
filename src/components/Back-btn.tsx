import { useState } from "react";

interface Props {
  onClick: () => void;
}

function BackBtn({ onClick }: Props) {

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseHover = () => {
        setIsHovered(true);
    }
    const handleMouseLeave = () => {
        setIsHovered(false);
    }

  return (
    <button 
        type="button" 
        className="btn btn-warning btn-lg" 
        onClick={onClick}
        onMouseEnter={handleMouseHover}
        onMouseLeave={handleMouseLeave}
        style={{
            margin: "10px", 
            backgroundImage: isHovered ? "url(/sad-cat.png)" : "none",
            backgroundSize: "contain",
            backgroundPosition: "center",
            color: isHovered ? "transparent" : "black",
            transitionDuration: "100ms"
        }}
    >
      Back
    </button>
  );
}

export default BackBtn;
