import { useAppSelector } from "../../features/Hook";
import List from "@mui/material/List";
import CardsItem from "../CardsItems/CardsItem";
import { ITrainData } from "../../model/Model";

interface IMapPageList {
  selectedTrain: ITrainData | null;
  setSelectedTrain: any;
}

function MapPageList(props: IMapPageList) {
  const { selectedTrain, setSelectedTrain } = props;
  const { trains } = useAppSelector((state) => state.todosReduced);
  return (
    <List
      sx={{
        width: "100%",
        padding: " 0px",
        borderRadius: "6px",
      }}
    >
      {trains.map((value: ITrainData) => (
        <CardsItem
          key={value.id}
          train={value}
          isMapPage={true}
          selected={selectedTrain?.id === value.id ? true : false}
          setSelectedTrain={setSelectedTrain}
        />
      ))}
    </List>
  );
}

export default MapPageList;
