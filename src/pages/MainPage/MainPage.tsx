import { Box, Container, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import Form from "../../components/Form/Form";
import Lists from "../../components/Lists/Lists";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export default function MainPage() {
  return (
    <Container>
      <Box maxWidth={"m"} mt={4}>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Item>
              <Form />
            </Item>
          </Grid>
          <Grid item xs={5}>
            <Lists />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
