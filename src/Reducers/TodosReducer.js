import { v4 as uuidv4 } from "uuid";
export default function Reducer(currentState, action) {
  switch (action.type) {
    case "added": {
      const newtodo = {
        id: uuidv4(),
        title: action.payload.title,
        details: "",
        isCompleted: false,
      };
      const StorageTodos = [...currentState, newtodo];
      localStorage.setItem("todos", JSON.stringify(StorageTodos));
      return StorageTodos;
    }
    case "deleted": {
      const newtodo = currentState.filter((t) => {
        // if (t.id === todo.id) {
        //   return false;
        // } else {
        //   return true;
        // }
        return t.id !== action.payload.id;
      });
      // setTodos(newtodo);
      localStorage.setItem("todos", JSON.stringify(newtodo));
      return newtodo;
    }
    case "updated": {
      // const updatedTodos = currentState.map((t) => {
      // if (t.id === action.payload.id) {
      //   return {
      //     ...t,
      //     title: action.payload.title,
      //     details: action.payload.details,
      //   };
      // } else {
      //   return t;

      // if (!action.payload.id) return;

      const updatedTodos = currentState.map((t) =>
        t.id === action.payload.id
          ? {
              ...t,
              title: action.payload.title,
              details: action.payload.details,
            }
          : t,
      );

      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
      // });
    }
    // case "toggled": {
    //   // const updatedTodos = currentState.map((todo) =>
    //   //   todo.id === action.payload.id
    //   //     ? { ...todo, isCompleted: !todo.isCompleted }
    //   //     : todo,
    //   // );
    //   const updatedTodos = currentState.map((t) => {
    //     if (t.id === action.payload.id) {
    //       t.isCompleted = !t.isCompleted;
    //     }
    //     return t;
    //   });

    //   localStorage.setItem("todos", JSON.stringify(updatedTodos));
    //   return updatedTodos;
    // }

    case "toggled": {
      const updatedTodos = currentState.map((t) => {
        if (t.id === action.payload.id) {
          return {
            ...t,
            isCompleted: !t.isCompleted,
          };
        }

        return t;
      });

      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "get": {
      // console.log("Calling The Effect");
      const updateTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
      return updateTodos;
    }
    // break;
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
}
