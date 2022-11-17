import * as React from "react";
import List from "@mui/material/List";
import { ITrainData } from "../../model/Model";
import CardsItem from "../CardsItems/CardsItem";
import { useAppSelector } from "../../features/Hook";

export default function CardLists() {

  const trains = useAppSelector(state => state.todosReduced.trains)
  
  return (
    <List
      sx={{
        width: "100%",
        padding: " 0px",
        borderRadius: "6px",
      }}
    >
      {trains.map((value: ITrainData) => (
        <CardsItem train={value} key={value.id} />
      ))}
    </List>
  );
}
