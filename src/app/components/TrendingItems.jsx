import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import SingleItem from "./SingleItem";

export default function TrendingItems() {
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    const slider = document.querySelector('.home-trending-items');
    let isDown = false;
    let startX;
    let scrollLeft;

    function mouseDownHandler(e) {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    function mouseLeaveHandler() {
      isDown = false;
      slider.classList.remove('active');
    };

    function mouseUpHandler() {
      isDown = false;
      slider.classList.remove('active');
    };

    function mouseMoveHandler(e) {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener('mousedown', mouseDownHandler);
    slider.addEventListener('mouseleave', mouseLeaveHandler);
    slider.addEventListener('mouseup', mouseUpHandler);
    slider.addEventListener('mousemove', mouseMoveHandler);

    return () => {
      slider.removeEventListener('mousedown', mouseDownHandler);
      slider.removeEventListener('mouseleave', mouseLeaveHandler);
      slider.removeEventListener('mouseup', mouseUpHandler);
      slider.removeEventListener('mousemove', mouseMoveHandler);
    };
  }, []);

  useEffect(() => {
    async function getData() {
      let { data: products, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_trending', 'TRUE')

      setTrendingProducts(products);

    }

    getData();
  }, [])

  return (
    <>
      <div className='home-trending-items'>
        {
          trendingProducts.map((x, index) =>
            <div key={index} className="noselect"> 
              <SingleItem x={x} hasQty={false} inProducts={false} />
            </div>)
        }
      </div>
    </>
  )
}