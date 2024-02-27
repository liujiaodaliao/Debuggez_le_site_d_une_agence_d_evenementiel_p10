import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  // const byDateDesc = data?.focus.sort((evtA, evtB) =>
  //   new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  // );
  // const nextCard = () => {
  //   setTimeout(
  //     () => setIndex(index < byDateDesc.length ? index + 1 : 0),
  //     5000
  //   );
  // };
  // useEffect(() => {
  //   nextCard();
  // });
  
  
  // 修改日期渲染逻辑
  const byDateDesc = data?.focus ? [...data.focus].sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  ) : [];

  // 修改循环播放逻辑
  const nextCard = () => {
    setTimeout(
      () => setIndex((prevIndex) => (prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0)), // 如果到达最后一张，则循环回第一张
      5000
    );
  };

  useEffect(() => {
    nextCard();
  }, [index]); // 添加 index 作为 useEffect 依赖项，确保每次 index 变化时重新计时

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <>
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`${event.id}`}
                  type="radio"
                  name="radio-button"
                  checked={idx === radioIdx}
                />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;
