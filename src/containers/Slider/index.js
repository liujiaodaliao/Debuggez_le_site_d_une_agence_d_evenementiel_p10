import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  
  // 修改日期渲染逻辑,用副本比较排序避免原始数据被修改，添加空数组避免空值检查，报错，因为不bhdagedesc初始默认值为undefined，然后对比事件时间符合降序返回负值，实现降序排列事件
  const byDateDesc = data?.focus ? [...data.focus].sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  ) : [];

  // 修改循环播放逻辑
  const nextCard = () => {
    setTimeout(
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
    );
    };

  useEffect(() => {
    const timer = setTimeout(nextCard, 5000);
    return () => clearTimeout(timer); // 清除定时器以避免内存泄漏
  }, [index]);

    // console.log('byDateDesc:', byDateDesc)

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, eventIdx) => (  // 将 idx 改为 eventIdx
        <div  key={event.title}>
          <div
           
            className={`SlideCard SlideCard--${
              index ===  eventIdx ? "display" : "hide"
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
              {byDateDesc.map((_,radioIdx) => (
                <input
                  // key={`${event.id}`}
                  key={`${event.id}-${radioIdx}`} 
                  type="radio"
                  name={`radio-button-${eventIdx}-${radioIdx}`}  // donne valeur unique
                  checked={index === radioIdx}  // 内外索引相同
                  onChange={() => setIndex(radioIdx)} // 点击时切换到对应图片
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
