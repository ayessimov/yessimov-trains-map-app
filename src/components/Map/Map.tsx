import { useState } from "react";
import { YMaps, Map, Placemark, FullscreenControl } from "react-yandex-maps";
import { useAppSelector } from "../../features/Hook";
import { ITrainData } from "../../model/Model";
import TrainModal from "../TrainModal/TrainModal";
import { CircularProgress } from "@mui/material";

interface IMainMap {
  selectedTrain: ITrainData | null;
}

function MainMap(props: IMainMap) {
  const { selectedTrain } = props;
  const { trains } = useAppSelector((state) => state.todosReduced);
  const [open, setOpen] = useState<boolean>(false);
  const [currentTrain, setCurrentTrain] = useState<ITrainData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleOpenModal = (train: ITrainData) => {
    setOpen(true);
    setCurrentTrain(train);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setCurrentTrain(null);
  };

  return (
    <div style={{ height: "500px" }}>
      <YMaps>
        <Map
          state={{
            center: selectedTrain?.coord
              ? selectedTrain.coord
              : [55.751574, 37.573856],
            zoom: selectedTrain ? 5 : 3,
          }}
          style={{
            height: "100%",
            width: "100%",
            minHeight: "400px",
            minWidth: "400px",
          }}
          controls={[]}
          onLoad={() => setIsLoading(false)}
        >
          {trains.map((train) => (
            <Placemark
              key={train.id}
              geometry={train.coord}
              options={{
                draggable: false,
              }}
              instanceRef={(ref: any) => {
                if (ref) {
                  ref.events.add("click", (e: any) => {
                    handleOpenModal(train);
                  });
                }
              }}
            />
          ))}
          <FullscreenControl />
        </Map>
      </YMaps>
      <TrainModal
        open={open}
        handleClose={handleCloseModal}
        train={currentTrain}
      />
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
        <></>
      )}
    </div>
  );
}

export default MainMap;
