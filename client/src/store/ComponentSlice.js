import OrdersManagement from "../app/components/AdminComponents/OrdersManagement";
import AddMenu from "../app/components/AdminComponents/AddMenu";
import Role from "../app/components/AdminComponents/Role";
import User from "../app/components/AdminComponents/User";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  component: <OrdersManagement />,
  location: "Orders",
};

export const componentSlice = createSlice({
  name: "component",
  initialState,
  reducers: {
    changeComponent: (state, action) => {
      switch (action.payload) {
        case "orders":
          state.component = <OrdersManagement />;
          state.location = "Orders";
          break;
        case "addMenu":
          state.component = <AddMenu />;
          state.location = "AddMenu";
          break;
        case "role":
          state.component = <Role />;
          state.location = "Role";
          break;
        case "user":
          state.component = <User />;
          state.location = "User";
          break;
        default:
          state.component = <OrdersManagement />;
          state.location = "Orders";
      }
    },
  },
});

export const { changeComponent } = componentSlice.actions;

export default componentSlice.reducer;
