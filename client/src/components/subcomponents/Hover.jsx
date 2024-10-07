import React from "react";

const Hover = ({
  id,
  children,
  onClick,
  hoveredComponent,
  setHoveredComponent,
  selectedPlaylist,
}) => {
  const isHovered =
    hoveredComponent === null || hoveredComponent === id ? 100 : 40;

  const isSelected =
    selectedPlaylist === null || selectedPlaylist.id === id ? 100 : 40;

  const handleMouseEnter = () => {
    setHoveredComponent(id);
  };

  const handleMouseLeave = () => {
    setHoveredComponent(999);
  };

  return (
    <div
      className="cursor-pointer transition-opacity duration-150"
      style={{
        opacity:
          selectedPlaylist !== null && selectedPlaylist.id === id
            ? isSelected / 100
            : isHovered / 100,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Hover;
