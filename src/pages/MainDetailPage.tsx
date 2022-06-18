import {
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../styles/compiled/style.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

interface DetailItem {
  id: number;
  title: string;
  singer: string;
  melodizer: string;
  lyricist: string;
  genre: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const MainDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { id: number };
  const [detail, setDetail] = useState<DetailItem>();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getDetailItem = async () => {
    const url = "http://localhost:3300/v1/chart/detail/" + state.id;

    await axios.get(url).then((response) => {
      setDetail(response.data.chart);
    });
  };

  useEffect(() => {
    getDetailItem();
  }, [state]);

  return (
    <div>
      <Card variant="outlined">
        <IconButton
          onClick={() => {
            navigate("/");
          }}
        >
          <ArrowBackIcon fontSize="large" color="primary" />
        </IconButton>
        <CardContent className={"detail"}>
          <Typography variant="h3" component="h2" gutterBottom>
            {detail?.title}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {detail?.singer}
          </Typography>
          <Button onClick={handleOpen}>버튼 클릭</Button>
          <div>
            <tbody>
              <tr>
                <td>
                  <Typography variant="h6" className={"subtitle"}>
                    장르
                  </Typography>
                </td>
                <td>
                  <Typography className={"text"}> {detail?.genre} </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6" className={"subtitle"}>
                    작사
                  </Typography>
                </td>
                <td>
                  <Typography className={"text"}>
                    {" "}
                    {detail?.lyricist}{" "}
                  </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6" className={"subtitle"}>
                    작곡
                  </Typography>
                </td>
                <td>
                  <Typography className={"text"}>
                    {detail?.melodizer}
                  </Typography>
                </td>
              </tr>
            </tbody>
          </div>
        </CardContent>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              알림
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              삭제 하시겠습니까?
            </Typography>
            <Button
              onClick={() => {
                console.log(state.id);
              }}
            >
              확인
            </Button>
            <Button onClick={handleClose}>취소</Button>
          </Box>
        </Modal>
      </Card>
    </div>
  );
};

export default MainDetailPage;
