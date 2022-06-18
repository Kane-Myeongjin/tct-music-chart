import { List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import "../styles/compiled/style.css";

interface TabProps {
  index?: number;
  listType: string;
}
interface Item {
  id: number;
  rank: number;
  title: string;
  singer: string;
  imageUrl: string;
}

interface DetailProps {
  id: number;
}

const imageStyle = {
  width: "100px",
  height: "100px",
};

const ListComponent = ({ index, listType }: TabProps) => {
  const navigate = useNavigate();
  const [list, setList] = useState<Item[]>([]);
  const [pageNum, setPageNum] = useState(0);
  const [loadMore, setLoadMore] = useState(true);

  const getList = async (chartType: string) => {
    const url = "http://localhost:3300/v1/chart/" + chartType;

    await axios.get(url).then((response) => {
      if (pageNum > 5) {
        //chartList length로 판단
        setLoadMore(false);
        return;
      }
      setList(list.concat(response.data.chartList));
      setPageNum(pageNum + 1);
    });
  };

  const getImage = (url: string) => {
    const baseUrl = process.env.PUBLIC_URL + "/images/";
    return baseUrl + url;
  };

  useEffect(() => {
    getList(listType);
  }, []);

  return (
    <div>
      <InfiniteScroll
        dataLength={list.length}
        next={() => {
          getList(listType);
        }}
        hasMore={loadMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {list &&
          list.map((item: Item, index: number) => {
            return (
              <ListItem
                key={index}
                button
                style={{ padding: "10px" }}
                onClick={() => {
                  navigate("/detail", {
                    state: { id: item.id } as DetailProps,
                  });
                }}
              >
                <ListItemText
                  style={{
                    width: "30px",
                    marginLeft: "20px",
                    marginRight: "20px",
                    textAlign: "left",
                  }}
                  primary={item.rank}
                />
                <img style={imageStyle} src={getImage(item.imageUrl)} />
                <ListItemText
                  style={{
                    textAlign: "left",
                    marginLeft: "20px",
                    marginRight: "20px",
                    width: "150px",
                  }}
                  className={"ellipsis"}
                  primary={item.title}
                />
                <ListItemText
                  style={{ textAlign: "right", width: "30px" }}
                  primary={item.singer}
                  className={"ellipsis"}
                />
              </ListItem>
            );
          })}
      </InfiniteScroll>
    </div>
  );
};

export default ListComponent;
