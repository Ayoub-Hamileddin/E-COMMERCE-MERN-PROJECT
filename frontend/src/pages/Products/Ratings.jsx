import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Ratings = ({ value, text, color = "yellow-500" }) => {
  const FullStars = Math.floor(value);
  const halfStars = value - FullStars >= 0.5 ? 1 : 0;
  const emptyStarts = 5 - FullStars - halfStars;
  return (
    <div className="flex items-center">
      {[...Array(FullStars)].map((_, index) => (
        <FaStar key={index} className={`text-${color} ml-1 `} />
      ))}
      {halfStars === 1 && <FaStarHalfAlt className={`text-${color} ml-1 `} />}
      {[...Array(emptyStarts)].map((_, index) => (
        <FaRegStar key={index} className="text-gray-600 ml-1 " />
      ))}

      <span className="ml-[2rem]">{text && text}</span>
    </div>
  );
};

export default Ratings;
