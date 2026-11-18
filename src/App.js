// import logo from "./logo.svg";
import "./App.css";
import TodoList from "./compoents/TodoList";
// import { v4 as uuidv4 } from "uuid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { TodosContext } from "./Context/TodosContext";
import { ToastProvider } from "./Context/ToastContext";
// import MySnackPar from "./compoents/MySnackpar";
// import { useState } from "react";
import TodosProvider from "./Context/TodosContext";

const theme = createTheme({
  typography: {
    fontFamily: ["A"],
  },
  palette: {
    primary: {
      main: "#bf360c",
    },
    secondary: {
      main: "#3e2723",
    },
  },
});

// const initialTodos = [
//   {
//     id: uuidv4(),
//     title: "قراءة كتاب",
//     details: "شسيشيسشيشسيسش",
//     isCompleted: false,
//   },
//   {
//     id: uuidv4(),
//     title: "قراءة كتاب",
//     details: "شسيشيسشيشسيسش",
//     isCompleted: false,
//   },
//   {
//     id: uuidv4(),
//     title: "قراءة كتاب",
//     details: "شسيشيسشيشسيسش",
//     isCompleted: false,
//   },
// ];

function App() {
  // const [todos, setTodos] = useState(initialTodos);
  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <ToastProvider>
          <div
            className="App"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#191b1f",
              minHeight: "100vh",
              boxSizing: "border-box",
              direction: "rtl",
              padding: "20px 0",
            }}
          >
            {/* <TodosContext.Provider value={{ todos, setTodos }}> */}
              <TodoList />
            {/* </TodosContext.Provider> */}
          </div>
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
