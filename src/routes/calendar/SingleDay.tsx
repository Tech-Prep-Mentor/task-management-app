import React from "react";

type Props = {
  height: string; // height of each hour block in pixels
};

function SingleDay({ height }: Props) {
  return (
    <div className="flex-1 border-b-[1px] border-l-[1px] ">
      <div className="grid grid-rows-[24]">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className={`static items-center justify-center border-t-[1px]`}
            style={{ height: height }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default SingleDay;
