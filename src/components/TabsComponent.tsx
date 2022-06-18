import React, { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ListComponent from "./ListComponent";
import ListComponentWithoutScroll from "./ListComponentWithoutScroll";
import Button from "@mui/material/Button";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  const listType = index == 0 ? "domestic" : "overseas";

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {/* infinite scroll 사용 */}
          <ListComponent index={index} listType={listType} />

          {/* 스크롤 없는 단순 리스트 */}
          {/* <ListComponentWithoutScroll index={index} listType={listType} /> */}
        </Box>
      )}
    </div>
  );
};

const TabsComponent = () => {
  const [value, setValue] = React.useState(0);
  const [showTopBtn, setShowTopBtn] = React.useState(false);

  const handleTapChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box sx={{ width: "100%" }} style={{ position: "relative" }}>
      <Box
        sx={{ borderBottom: 1, borderColor: "divider" }}
        style={{
          position: "sticky",
          top: "100px",
          backgroundColor: "#fff",
          zIndex: 100,
        }}
      >
        <Tabs value={value} onChange={handleTapChange}>
          <Tab label="국내 차트" {...a11yProps(0)} />
          <Tab label="해외 차트" {...a11yProps(1)} />
        </Tabs>
      </Box>
      {showTopBtn && (
        <Button
          onClick={goToTop}
          style={{
            position: "fixed",
            bottom: "50px",
            right: "45px",
            zIndex: 100,
            backgroundColor: "#bfbfbf",
            border: "2px solid #fff",
            borderRadius: "50%",
            height: "50px",
            width: "50px",
            color: "#fff",
          }}
        >
          Top
        </Button>
      )}
      <TabPanel value={value} index={0} />
      <TabPanel value={value} index={1} />
    </Box>
  );
};

export default TabsComponent;
