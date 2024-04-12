export const FullWidthBgImage = ({
    image,
    label,
    text,
    height,
    borderRadius
  }) => {
    return (
      <div
        className="bg-image-container"
        style={{ backgroundImage: `url(${image})`, borderRadius, height }}
      >
        <div className="gradient">
          <div className="text-container">
          </div>
        </div>
      </div>
    );
  };
  