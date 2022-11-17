import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { CircularProgress, Typography } from "@mui/material";
import { YMaps, Map, Placemark, FullscreenControl } from "react-yandex-maps";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  height: 450,
  bgcolor: "background.paper",
  borderRadius: "6px",
  p: 4,
  textAlign: "center",
};

interface IMapModal {
  open: boolean;
  setOpen: any;
  handleOpen: any;
  handleClose: any;
  coord: [number, number];
  setCoord: any;
}

export default function MapModal({
  open,
  setOpen,
  handleOpen,
  handleClose,
  coord,
  setCoord,
}: IMapModal) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          setIsLoading(true);
          handleClose();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <YMaps>
            <Map
              defaultState={{
                center: !coord[0] && !coord[1] ? [55.751574, 37.573856] : coord,
                zoom: 5,
              }}
              width={600}
              height={400}
              controls={[]}
              onLoad={() => setIsLoading(false)}
            >
              <Placemark
                geometry={
                  !coord[0] && !coord[1] ? [55.751574, 37.573856] : coord
                }
                options={{
                  draggable: true,
                }}
                instanceRef={(ref: any) => {
                  if (ref) {
                    ref.geometry.events.add("change", function (e: any) {
                      const newCoords = e.get("newCoordinates");
                      setCoord(newCoords);
                    });
                  }
                }}
              />
              <FullscreenControl />
            </Map>
          </YMaps>
          {isLoading ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <Typography textAlign={"left"} variant={"body2"} mt={2}>
              {`Координаты: ${coord[0]}:${coord[1]}`}
            </Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
}
