import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


export default function Todo({ todo, showAlert, onEdit, onCheck }) {
  function handleDeleteClick() {
    showAlert(todo);
  }
  function handleUpdateClick() {
    onEdit(todo);
  }
  function handleCheckClick() {
    onCheck(todo.id);
  }
  return (
    <>
      <Card
        sx={{
          backgroundColor: "#283593",
          color: "white",
          mt: 3,
        }}
        className="todocard"
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8} sx={{ direction: "rtl", textAlign: "right" }}>
              <Typography
                variant="h5"
                sx={{
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.details}
              </Typography>
            </Grid>

            <Grid
              size={4}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={handleCheckClick}
                aria-label="إنجاز المهمة"
                sx={{
                  backgroundColor: todo.isCompleted ? "#8bc344" : "white",
                  border: "3px solid #8bc344",
                  color: todo.isCompleted ? "white" : "#8bc344",
                }}
              >
                <CheckIcon />
              </IconButton>

              <IconButton
                onClick={handleUpdateClick}
                aria-label="تعديل المهمة"
                sx={{
                  backgroundColor: "white",
                  border: "3px solid #1769aa",
                  color: "#1769aa",
                }}
              >
                <EditIcon />
              </IconButton>

              <IconButton
                onClick={handleDeleteClick}
                aria-label="حذف المهمة"
                sx={{
                  backgroundColor: "white",
                  border: "3px solid #b23c17",
                  color: "#b23c17",
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
