import * as React from "react";
import { useState, useEffect } from "react";
import { Grid, TextField, Button, Icon, Typography } from "@mui/material";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import MapModal from "../Modal/Modal";
import { useAppDispatch, useAppSelector } from "../../features/Hook";
import {
  addTrain,
  changeFormEditStatus,
  updateTrain,
} from "../../features/TrainSlice";
import { v4 } from "uuid";

export default function Form() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState<string>("");
  const [seria, setSeria] = useState<string>("");
  const [sectionsCount, setSectionsCount] = useState<number>(0);
  const [coord, setCoord] = useState<[number, number]>([0, 0]);

  const dispatch = useAppDispatch();
  const { isEditForm, editTrain } = useAppSelector(
    (state) => state.todosReduced
  );

  useEffect(() => {
    if (isEditForm && editTrain) {
      setName(editTrain?.name);
      setSeria(editTrain?.seria);
      setSectionsCount(editTrain?.sectionsCount);
      setCoord(editTrain?.coord);
    } else {
      reset();
    }
  }, [isEditForm, editTrain]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (isEditForm && editTrain) {
      handleUpdate();
    } else {
      dispatch(
        addTrain({
          name,
          seria,
          sectionsCount,
          coord,
          id: v4(),
        })
      );
    }
  };

  const reset = () => {
    setName("");
    setSeria("");
    setSectionsCount(0);
    setCoord([0, 0]);
  };

  const handleUpdate = () => {
    dispatch(
      updateTrain({
        name,
        seria,
        sectionsCount,
        coord,
        id: editTrain?.id,
      })
    );
    dispatch(
      changeFormEditStatus({
        status: false,
        editTrain: null,
      })
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography textAlign={"left"} mb={1} ml={1}>
              Наименование
            </Typography>
            <TextField
              fullWidth
              id="train-name"
              variant="outlined"
              placeholder="Введите наименование"
              size="small"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography textAlign={"left"} mb={1} ml={1}>
              Серия
            </Typography>
            <TextField
              fullWidth
              id="train-seria"
              variant="outlined"
              placeholder="Введите серию"
              size="small"
              required
              value={seria}
              onChange={(e) => setSeria(e.target.value)}
            />
          </Grid>
          <Grid item xs={5}>
            <Typography textAlign={"left"} mb={1} ml={1}>
              Координата - X
            </Typography>
            <TextField
              fullWidth
              id="train-coord-x"
              variant="outlined"
              type="number"
              size="small"
              placeholder="X"
              required
              value={coord[0]}
              onChange={(e) => setCoord([parseInt(e.target.value), coord[1]])}
            />
          </Grid>
          <Grid item xs={5}>
            <Typography textAlign={"left"} mb={1} ml={1}>
              Координата - Y
            </Typography>
            <TextField
              fullWidth
              id="train-coord-y"
              variant="outlined"
              type="number"
              size="small"
              placeholder="Y"
              required
              value={coord[1]}
              onChange={(e) => setCoord([coord[0], parseInt(e.target.value)])}
            />
          </Grid>
          <Grid item xs={2} alignItems="center" justifyContent="center">
            <Button style={{ height: "100%" }} fullWidth onClick={handleOpen}>
              <Icon>
                <MapOutlinedIcon />
              </Icon>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography textAlign={"left"} mb={1} ml={1}>
              Колличество секций
            </Typography>
            <TextField
              fullWidth
              id="outlined-basic"
              variant="outlined"
              size="small"
              placeholder="Колличество секций"
              type="number"
              required
              value={sectionsCount}
              onChange={(e) => setSectionsCount(parseInt(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} textAlign="right">
            <Button variant="contained" type="submit">
              {isEditForm ? 'Изменить' : 'Сохранить'}
            </Button>
          </Grid>
        </Grid>
      </form>
      <MapModal
        open={open}
        setOpen={setOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
        coord={coord}
        setCoord={setCoord}
      />
    </>
  );
}
