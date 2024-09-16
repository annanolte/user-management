import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

interface UserState {
  users: User[];
  filteredUsers: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  filteredUsers: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/users");
  return response.data;
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    filterUsers: (state, action: PayloadAction<string>) => {
      const searchText = action.payload.toLowerCase();
      state.filteredUsers = state.users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchText) ||
          user.username.toLowerCase().includes(searchText) ||
          user.email.toLowerCase().includes(searchText) ||
          user.phone.toLowerCase().includes(searchText)
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.filteredUsers = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch users";
    });
  },
});

export const { filterUsers } = userSlice.actions;
export default userSlice.reducer;
