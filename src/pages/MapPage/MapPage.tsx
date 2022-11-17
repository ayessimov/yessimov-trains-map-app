import { useState } from "react";
import { Box, Container, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import MainMap from "../../components/Map/Map";
import MapPageList from "../../components/MapPageList/MapPageList";
import { useAppSelector } from "../../features/Hook";
import { ITrainData } from "../../model/Model";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export default function MapPage() {
  const { trains } = useAppSelector((state) => state.todosReduced);
  const [selectedTrain, setSelectedTrain] = useState<ITrainData | null>(
    trains.length ? trains[0] : null
  );

  return (
    <Container>
      <Box maxWidth={"m"} mt={4}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Item>
              <MainMap selectedTrain={selectedTrain} />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <MapPageList selectedTrain={selectedTrain} setSelectedTrain={setSelectedTrain} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
