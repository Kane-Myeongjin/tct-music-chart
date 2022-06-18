import React from "react";
import TabsComponent from "../components/TabsComponent";
import MainListTitle from "../components/MainListTitle";
import ListComponentWithoutScroll from "../components/ListComponentWithoutScroll";
import ListComponent from "../components/ListComponent";
import { numberFormat } from "../utils/commonUtils";

const MainListPage = () => {
    return (
        <div>
            {/* <div>{numberFormat(1234567890)}</div> */}
            <MainListTitle />
            {/* 탭 있는 화면 */}
            <TabsComponent />

            {/* 탭 없고 스크롤 없는 화면 */}
            {/* <ListComponentWithoutScroll listType="domestic" /> */}

            {/* 탭 없고 무한스크롤 있는 화면 */}
            {/* <ListComponent listType="domestic" /> */}
        </div>
    );
};

export default MainListPage;
