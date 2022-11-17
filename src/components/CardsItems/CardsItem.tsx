import {
  CardContent,
  ListItem,
  Card,
  Typography,
  CardActions,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ITrainData } from "../../model/Model";
import { useAppDispatch, useAppSelector } from "../../features/Hook";
import {
  changeFormEditStatus,
  removeTrain,
} from "../../features/TrainSlice";

interface ICardsItemProps {
  train: ITrainData;
  isMapPage?: boolean;
  selected?: boolean;
  setSelectedTrain?: any;
}

function CardsItem(props: ICardsItemProps) {
  const { name, seria, sectionsCount, coord, id } = props.train;
  const { isEditForm } = useAppSelector(
    (state) => state.todosReduced
  );
  const dispatch = useAppDispatch();

  const handleRemove = (id: any) => {
    dispatch(removeTrain(id));
  };

  const handleEdit = () => {
    dispatch(
      changeFormEditStatus({
        status: !isEditForm,
        editTrain: props.train,
      })
    );
  };

  return (
    <ListItem
      disablePadding
      onClick={
        props.isMapPage ? () => props.setSelectedTrain(props.train) : () => {}
      }
    >
      <Card
        style={{
          marginBottom: "10px",
          width: "100%",
          backgroundColor: props.selected ? "#1976d2" : "",
        }}
      >
        <CardContent style={{ paddingBottom: props.isMapPage ? "10" : "0" }}>
          <Typography gutterBottom variant="h6" component="div">
            {`Наименование: ${name}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Серия: ${seria}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Колличество секций: ${sectionsCount}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Координаты: ${coord[1]}:${coord[1]}`}
          </Typography>
        </CardContent>
        {!props.isMapPage ? (
          <CardActions>
              <IconButton aria-label="delete" color="success" onClick={() => handleEdit()} size="small" >
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete" color="error" size="small" onClick={() => handleRemove(id)}>
                <DeleteIcon />
              </IconButton>
          </CardActions>
        ) : (
          <></>
        )}
      </Card>
    </ListItem>
  );
}

export default CardsItem;
