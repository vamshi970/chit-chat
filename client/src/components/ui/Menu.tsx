import React from "react";

type MenuProps = {
//   items: string[];
//   handleMenuItemClick: (item: string) => void;
  points: {
    x: number;
    y: number;
  };
};

const Menu: React.FC<MenuProps> = ({points}) => {
  return (
    <div className={`border-2 absolute top-${points.y} left-${points.x} border-gray-300 shadow-md  bg-white py-1`}>
      {["Menu 1","Menu 2","Menu 3"].map((item, index) => (
        <div
          key={index}
        //   onClick={() => handleMenuItemClick(item)}
          className="px-4 py-2 cursor-pointer"
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Menu;
