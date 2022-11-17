import { Modal, Box, Card, CardContent, Typography } from "@mui/material";
import { ITrainData } from "../../model/Model";

interface ITrainModal {
  train: ITrainData | null;
  open: boolean;
  handleClose: any;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: 400,
  bgcolor: "background.paper",
  borderRaduis: '6px'
};

function TrainModal(props: ITrainModal) {
  const { train, open, handleClose } = props;
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Card
          style={{
            width: "100%",
          }}
        >
          <CardContent style={{ paddingBottom: "10" }}>
            <Typography gutterBottom variant="h6" component="div">
              {`Наименование: ${train?.name}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Серия: ${train?.seria}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Колличество секций: ${train?.sectionsCount}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Координаты: ${train?.coord[1]}:${train?.coord[1]}`}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
}

export default TrainModal;
