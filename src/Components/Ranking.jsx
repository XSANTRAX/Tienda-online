import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export function Ranking({ rating }) {
  const totalStars = 5;

  return (
    <div style={{ display: "flex", gap: "4px", color: "gold" }}>
      {Array.from({ length: totalStars }, (_, index) => {
        const starValue = index + 1;
        if (rating >= starValue) return <FaStar key={index} />;
        else if (rating >= starValue - 0.5) return <FaStarHalfAlt key={index} />;
        else return <FaRegStar key={index} />;
      })}
    </div>
  );
}
