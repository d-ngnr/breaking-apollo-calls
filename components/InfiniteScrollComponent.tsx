"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const InfiniteScrollComponent = () => {
  const [items, setItems] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(2);

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/products?offset=10&limit=12")
      .then((res) => {
        setItems(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fetchMoreData = () => {
    axios
      .get(`https://api.escuelajs.co/api/v1/products?offset=${index}&limit=12`)
      .then((res) => {
        setItems((prevItems) => [...prevItems, ...res.data]);
        res.data.length > 0 ? setHasMore(true) : setHasMore(false);
      })
      .catch((error) => {
        console.log(error);
      });
    setIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      <div className="container">
        <div className="row">
          {items &&
            items.map((item) => (
              <div className="col-md-4" key={item.id}>
                <div className="card">
                  <Image
                    src={item?.thumbnail}
                    className="card-img-top"
                    alt={item?.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item?.title}</h5>
                    <p className="card-text">{item?.description}</p>
                    <a href="#" className="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </InfiniteScroll>
  );
};

export default InfiniteScrollComponent;
