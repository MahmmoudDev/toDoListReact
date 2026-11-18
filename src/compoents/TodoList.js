import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Todo from "./Todo";

import { useToast } from "../Context/ToastContext";
import { useState, useEffect, useMemo } from "react";


import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useTodos ,useTodosDispatch} from "../Context/TodosContext";

export default function TodoList() {
  const todos = useTodos();
  const dispatch = useTodosDispatch();

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const [titleInput, setTitleInputs] = useState("");
  const [displayTodos, setDisplayTodos] = useState("all");
  const [alertTodo, setAlertTodo] = useState(null);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: "",
    details: "",
  });

  const { showHideToast } = useToast();
  const completedTodos = useMemo(() => {
    return todos.filter((todo) => {
      console.log("Calling The completed Todo");
      return todo.isCompleted;
    });
  }, [todos]);

  const notcompletedTodos = useMemo(() => {
    return todos.filter((todo) => {
      console.log("Calling The notcompleted Todo");
      return !todo.isCompleted;
    });
  }, [todos]);
  let todostobedisplayed = todos;
  if (displayTodos === "completed") {
    todostobedisplayed = completedTodos;
  } else if (displayTodos === "non-complete") {
    todostobedisplayed = notcompletedTodos;
  } else {
    todostobedisplayed = todos;
  }

  useEffect(() => {
    dispatch({
      type: "get",
    });
  }, []);

  function handledisplayTodo(event) {
    setDisplayTodos(event.target.value);
  }
  function handleAddclick() {
    if (titleInput === "") {
      alert("الرجاء تسجيل مهمة");
    } else {
      dispatch({
        type: "added",
        payload: {
          title: titleInput,
        },
      });
      setTitleInputs("");
      showHideToast("نم اضافة المهمة بنجاح");
    }
  }
  function openDeleteAlert(todo) {
    setAlertTodo(todo);
    // alert(todo.id);
    setShowDeleteAlert(true);
  }
  function handleDeleteClose() {
    setShowDeleteAlert(false);
  }

  function handleDeleteToDO() {
    dispatch({
      type: "deleted",
      payload: {
        id: alertTodo.id,
      },
    });
    setShowDeleteAlert(false);
    showHideToast("تم حذف المهمة بنجاح");
  }

  function handlecheckclick(id) {
    const todo = todos.find((t) => t.id === id);
    dispatch({
      type: "toggled",
      payload: {
        id: id,
      },
    });
    if (!todo) return;

    if (!todo.isCompleted) {
      showHideToast("تم إنجاز المهمة بنجاح");
    } else {
      showHideToast("تم إلغاء إنجاز المهمة");
    }
  }

  function openUpdateAlert(todo) {
    setAlertTodo(todo);
    setUpdatedTodo({
      title: todo.title,
      details: todo.details,
    });
    setShowUpdateAlert(true);
  }

  function handleUpdateClose() {
    setShowUpdateAlert(false);
  }
  // function handleUpdateToDO() {
  //   dispatch({
  //     type: "updated",
  //     payload: {
  //       id: alertTodo.id,
  //       title: alertTodo.title,
  //       details: alertTodo.details,
  //     },
  //   });
  //   handleUpdateClose();
  //   showHideToast("تم تحديث المهمة بنجاح");
  // }

  function handleUpdateToDO() {
    dispatch({
      type: "updated",
      payload: {
        id: alertTodo.id,
        title: updatedTodo.title,
        details: updatedTodo.details,
      },
    });

    handleUpdateClose();
    showHideToast("تم تحديث المهمة بنجاح");
  }
  const todosjsx = todostobedisplayed.map((todo) => (
    <Todo
      key={todo.id}
      todo={todo}
      showAlert={openDeleteAlert}
      onEdit={openUpdateAlert}
      onCheck={handlecheckclick}
    />
  ));

  return (
    <>
      <Dialog
        style={{ direction: "rtl" }}
        onClick={handleDeleteClose}
        open={showDeleteAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">
          {"هل انت متاكد من حذف المهمة؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن الحذف بعد إتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDeleteClose}>
            أغلاق
          </Button>
          <Button onClick={handleDeleteToDO}>نعم</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        style={{ direction: "rtl" }}
        // onClick={handleUpdateClose}
        open={showUpdateAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">
          {"هل انت متاكد من حذف المهمة؟"}
        </DialogTitle>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="email"
          label="عنوان المهمة"
          fullWidth
          variant="standard"
          value={updatedTodo.title}
          onChange={(e) =>
            setUpdatedTodo({ ...updatedTodo, title: e.target.value })
          }
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="email"
          label="التفاصيل"
          fullWidth
          variant="standard"
          value={updatedTodo.details}
          onChange={(e) =>
            setUpdatedTodo({ ...updatedTodo, details: e.target.value })
          }
        />
        <DialogActions>
          <Button autoFocus onClick={handleUpdateClose}>
            أغلاق
          </Button>
          <Button onClick={handleUpdateToDO}>تحديث</Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="sm">
        <Card
          sx={{ minWidth: 275 }}
          style={{
            maxHeight: "80vh",
            overflow: "scroll",
          }}
        >
          <CardContent>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 300,
                textAlign: "center",
                direction: "rtl",
              }}
            >
              مهامي
            </Typography>

            <Divider />

            <ToggleButtonGroup
              value={displayTodos}
              style={{ direction: "ltr", marginTop: "15px" }}
              color="primary"
              exclusive
              aria-label="فلترة المهام"
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 2,
                mb: 3,
              }}
              onChange={handledisplayTodo}
            >
              <ToggleButton value="completed">المنجز</ToggleButton>
              <ToggleButton value="non-complete">غير المنجز</ToggleButton>
              <ToggleButton value="all">الكل</ToggleButton>
            </ToggleButtonGroup>

            {todosjsx}

            <Grid
              container
              spacing={2}
              sx={{
                mt: 2,
                direction: "ltr",
                alignItems: "stretch",
              }}
            >
              <Grid size={4}>
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    height: "56px",
                  }}
                  color="secondary"
                  onClick={() => {
                    handleAddclick();
                  }}
                >
                  إضافة
                </Button>
              </Grid>

              <Grid size={8}>
                <TextField
                  value={titleInput}
                  onChange={(event) => {
                    setTitleInputs(event.target.value);
                  }}
                  fullWidth
                  label="عنوان المهمة"
                  variant="outlined"
                  sx={{ direction: "rtl" }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
