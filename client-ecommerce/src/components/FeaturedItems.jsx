import React from 'react'
import Items from './Items';
import useItem from '../store/item';

const FeaturedItems = () => {
  const { setItem,item } = useItem();

//   const shuffleArray = (unshuffeled) => {
//     return unshuffeled
//       .map((value) => ({ value, sort: Math.random() }))
//       .sort((a, b) => a.sort - b.sort)
//       .map(({ value }) => value);
//   }
  return (
    <div className="w-full flex flex-col p-6 gap-6">
      <div className="header w-full flex items-center justify-start gap-3">
        <div className="larger_header flex flex-col px-4 font-bold text-4xl gap-2">
          Featured Items{" "}
          <div className="underline w-[70%] h-2 bg-[#ffe26e] -translate-x-3"></div>
        </div>
        {/* <div className="show_all font-medium text-lg">Show All</div> */}
      </div>
      <div className="items flex flex-wrap w-full px-10 gap-10 items-center justify-center">
        {item.slice(0,8).map((ele,ind)=>{
            return <Items item={ele} key={ind} />
        })}
      </div>
    </div>
  );
}

export default FeaturedItems