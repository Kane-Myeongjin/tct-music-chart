import {
    Avatar,
    Box,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from "@mui/material";
import axios from "axios";
import { title } from "process";
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

const ListCompontStyleTwoColumn = ({ index, listType }: TabProps) => {
    const navigate = useNavigate();
    const [list, setList] = useState<Item[]>([]);
    const [pageNum, setPageNum] = useState(0);
    const [loadMore, setLoadMore] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [searched, setSearched] = useState<string[]>([]);

    const getList = async (search: string = "") => {
        const url = "http://localhost:3300/v1/chart/domestic";

        await axios.get(url).then((response) => {
            // 무한스크롤일 경우 사용
            // if (pageNum > 5) {
            //     //chartList length로 판단
            //     setLoadMore(false);
            //     return;
            // }
            // setPageNum(pageNum + 1);
            // setList(list.concat(response.data.chartList));

            if (search === "") {
                setList(response.data.chartList);
            } else {
                // 검색
                const result = response.data.chartList.filter((list: Item) =>
                    list.title.toLowerCase().includes(search.toLowerCase())
                );
                setList(result);
            }
        });
    };

    const getImage = (url: string) => {
        const baseUrl = process.env.PUBLIC_URL + "/images/";
        return baseUrl + url;
    };

    const onSearch = () => {
        if ("" !== searchText) {
            // 이미 검색했던 검색어 삭제
            let result = searched;
            if (searched.includes(searchText)) {
                result = searched.filter((se) => se !== searchText);
            }

            // 최근검색어는 최대 5개까지 보임
            if (result.length === 5) {
                result.shift();
            }

            result.push(searchText);
            setSearched(result);

            // 스토리지 set
            localStorage.setItem("searched", result.toString());
        }
        getList(searchText);
        setSearchText("");
    };

    const onSearchClear = () => {
        setSearched([]);
        localStorage.setItem("searched", "");
    };

    const onSearchTextClear = () => {
        getList();
    };

    const onSearchDelete = (text: string) => {
        if (searched.includes(text)) {
            const result = searched.filter((se) => se !== text);
            setSearched(result);

            // 스토리지 set
            localStorage.setItem("searched", result.toString());
        }
    };

    useEffect(() => {
        getList();
        // 스토리지 get
        const result = localStorage.getItem("searched");
        if (result) {
            setSearched(result.split(","));
        }
    }, []);

    return (
        // <div>
        //     <InfiniteScroll
        //         dataLength={list.length}
        //         next={() => {
        //             getList(listType);
        //         }}
        //         hasMore={loadMore}
        //         loader={<h4>Loading...</h4>}
        //         endMessage={
        //             <p style={{ textAlign: "center" }}>
        //                 <b>Yay! You have seen it all</b>
        //             </p>
        //         }
        //     >
        // <List>
        <>
            <Box
                style={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#fff",
                    height: "90px",
                    padding: "10px",
                    zIndex: 100,
                }}
            >
                <div
                    style={{
                        fontSize: "30px",
                        textAlign: "center",
                        fontWeight: "bold",
                        margin: "10px",
                    }}
                >
                    <input
                        style={{ width: "200px" }}
                        placeholder="검색해주세요."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button onClick={onSearch}>검색</button>
                    <button onClick={onSearchTextClear}>검색어 초기화</button>
                </div>
                <div
                    style={{
                        textAlign: "center",
                    }}
                >
                    {searched.map((text) => (
                        <span
                            key={text}
                            style={{
                                textAlign: "center",
                                marginRight: "10px",
                            }}
                        >
                            {text}
                            <button
                                style={{
                                    textAlign: "center",
                                    marginLeft: "10px",
                                }}
                                onClick={() => onSearchDelete(text)}
                            >
                                x
                            </button>
                        </span>
                    ))}
                    {searched && searched.length > 0 && (
                        <button onClick={onSearchClear}>초기화</button>
                    )}
                </div>
            </Box>
            <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
                {list &&
                    list.map((item: Item, index: number) => {
                        return (
                            <Grid item xs={6}>
                                <ListItem
                                    key={index}
                                    button
                                    style={{ padding: "10px" }}
                                    onClick={() => {
                                        navigate("/detail", {
                                            state: {
                                                id: item.id,
                                            } as DetailProps,
                                        });
                                    }}
                                >
                                    <img
                                        style={imageStyle}
                                        src={getImage(item.imageUrl)}
                                    />
                                    <ListItemText
                                        style={{
                                            // textAlign: "center",
                                            marginLeft: "20px",
                                            marginRight: "20px",
                                        }}
                                        className={"ellipsis"}
                                        primary={
                                            item.rank +
                                            ". " +
                                            item.title +
                                            "(" +
                                            item.singer +
                                            ")"
                                        }
                                    />
                                </ListItem>
                            </Grid>
                        );
                    })}
            </Grid>
        </>
        // </List>
        // </InfiniteScroll>
        // </div>
    );
};

export default ListCompontStyleTwoColumn;
