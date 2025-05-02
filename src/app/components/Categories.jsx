import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function Categories({ categories, currentCategory, setCurrentCategory, setCategories }) {

  useEffect(() => {
    const slider = document.querySelector('.categories-list');
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
      let { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort', { ascending: true })
    setCategories(categories);
    setCurrentCategory(categories[0]);
    }

    getData();
  }, [])

  return (
    <>
      <div className="categories-list">
        {
          categories?.map(x => <span
            className={currentCategory?.id == x?.id ? "selected noselect" : "noselect"}
            onClick={() => setCurrentCategory(x)}
            key={x?.id}>
            {x?.name}
          </span>)
        }
      </div>
    </>
  )
}