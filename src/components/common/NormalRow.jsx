import { useSwipeable } from "react-swipeable";
import { useState, useRef, useEffect } from "react";
import NormalPoster from "./NormalPoster";
import { getByStatus } from "../../services/tracker/trackerServices";

const NormalRow = ({ title, fetchItems, data = null, status = null }) => {
  const [position, setPosition] = useState(0);
  const [content, setContent] = useState([]);
  const rowRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        if (data) {
          setContent(data);
        } else if (status) {
          const response = await getByStatus(status);
          setContent(response);
        } else if (fetchItems) {
          const response = await fetchItems();
          setContent(response.results);
        }
      } catch (error) {
        console.error(`Error fetching content:`, error);
      }
    };

    fetchContent();
  }, [data, fetchItems, status]);

  useEffect(() => {
    let intervalId;

    if (isAnimating && rowRef.current) {
      intervalId = setInterval(() => {
        const rowWidth = rowRef.current.scrollWidth;
        const containerWidth = rowRef.current.clientWidth;
        const maxPosition = -(rowWidth - containerWidth);

        setPosition((prevPosition) => {
          const newPosition = prevPosition - 220;
          return newPosition <= maxPosition ? 0 : newPosition;
        });
      }, 3000);
    }

    return () => clearInterval(intervalId);
  }, [isAnimating]);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      const rowWidth = rowRef.current?.scrollWidth || 0;
      const containerWidth = rowRef.current?.clientWidth || 0;
      const maxPosition = -(rowWidth - containerWidth);
      setPosition(Math.max(position - 300, maxPosition));
    },
    onSwipedRight: () => {
      setPosition(Math.min(position + 300, 0));
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="overflow-hidden w-full h-auto bg-transparent p-4 mt-10">
      <div className="text-white text-2xl font-bold mb-6 ml-8">{title}</div>
      <div
        className="group relative"
        onMouseEnter={() => setIsAnimating(false)}
        onMouseLeave={() => setIsAnimating(true)}
      >
        <div
          {...handlers}
          ref={rowRef}
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(${position}px)` }}
        >
          {content?.map((item) => (
            item && (
              <div key={item._id}>
                <NormalPoster show={item}/>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default NormalRow;
