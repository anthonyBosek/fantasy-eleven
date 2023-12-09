import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import { checkToken, getToken } from "../../utils/main";
export const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const initialState = {
  data: null,
  errors: [],
  editMode: false,
  spotlight: null,
  loading: true,
};

const fetchAll = async (asyncThunk) => {
  try {
    const resp = await fetch("/productions");
    const data = await resp.json();
    if (resp.ok) {
      return data;
    } else {
      throw data.message || data.msg;
    }
  } catch (error) {
    return error;
  }
};

const fetchOne = async (prod_id, asyncThunk) => {
  try {
    const resp = await fetch(`/productions/${prod_id}`);
    const data = await resp.json();
    if (resp.ok) {
      return data;
    } else {
      throw data.message || data.msg;
    }
  } catch (error) {
    return error;
  }
};

const postProduction = async (values, asyncThunk) => {
  try {
    const respCheckToken = await checkToken();
    if (respCheckToken.ok) {
      const resp = await fetch("/productions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await resp.json();

      if (resp.ok) {
        return data;
      } else {
        throw data.message || data.msg;
      }
    } else {
      const data = await respCheckToken.json();
      throw data.message || data.msg;
    }
  } catch (error) {
    return error;
  }
};

const patchProduction = async ({ id, values }, asyncThunk) => {
  try {
    const respCheckToken = await checkToken();

    if (respCheckToken.ok) {
      const resp = await fetch(`/productions/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await resp.json();

      if (resp.ok) {
        return data;
      } else {
        throw data.message || data.msg;
      }
    } else {
      const data = await respCheckToken.json();

      throw data.message || data.msg;
    }
  } catch (error) {
    return error;
  }
};

const deleteProduction = async (prod_id, asyncThunk) => {
  try {
    const respCheckToken = await checkToken();

    if (respCheckToken.ok) {
      const resp = await fetch(`/productions/${prod_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (resp.ok) {
        //! 204 NO CONTENT
        return { prod_id };
      } else {
        const data = await resp.json();
        throw data.message || data.msg;
      }
    } else {
      const data = await respCheckToken.json();
      throw data.message || data.msg;
    }
  } catch (error) {
    return error;
  }
};

const productionSlice = createSlice({
  name: "production",
  initialState,
  reducers: (create) => ({
    setProduction: create.reducer((state, action) => {
      state.spotlight = action.payload;
      state.loading = false;
      state.errors = [];
    }),
    setEditMode: create.reducer((state, action) => {
      state.editMode = action.payload;
      state.loading = false;
      state.errors = [];
    }),
    addError: create.reducer((state, action) => {
      state.errors.push(action.payload);
      state.loading = false;
    }),
    clearErrors: create.reducer((state) => {
      state.errors = [];
      state.loading = false;
    }),
    fetchAllProductions: create.asyncThunk(fetchAll, {
      pending: (state) => {
        state.loading = true;
        state.errors = [];
      },
      rejected: (state, action) => {
        state.loading = false;
        state.errors.push(action.payload);
      },
      fulfilled: (state, action) => {
        state.loading = false;
        state.data = action.payload;
      },
    }),
    fetchOneProduction: create.asyncThunk(fetchOne, {
      pending: (state) => {
        state.errors = [];
        state.loading = true;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.errors.push(action.payload);
      },
      fulfilled: (state, action) => {
        state.loading = false;
        if (!action.payload.id) {
          state.errors.push(action.payload);
        } else {
          state.spotlight = action.payload;
        }
      },
    }),
    fetchPostProduction: create.asyncThunk(postProduction, {
      pending: (state) => {
        state.errors = [];
        state.loading = true;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.errors.push(action.payload);
      },
      fulfilled: (state, action) => {
        state.loading = false;
        if (!action.payload.id) {
          state.errors.push(action.payload);
        } else {
          state.data.push(action.payload);
        }
      },
    }),
    fetchPatchProduction: create.asyncThunk(patchProduction, {
      pending: (state) => {
        state.errors = [];
        state.loading = true;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.errors.push(action.payload);
      },
      fulfilled: (state, action) => {
        state.loading = false;
        if (!action.payload.id) {
          state.errors.push(action.payload);
        } else {
          const index = state.data.findIndex(
            (production) => production.id === parseInt(action.payload.id)
          );
          state.data[index] = action.payload;
          state.spotlight = null;
        }
      },
    }),
    fetchDeleteProduction: create.asyncThunk(deleteProduction, {
      pending: (state) => {
        state.errors = [];
        state.loading = true;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.errors.push(action.payload);
      },
      fulfilled: (state, action) => {
        state.loading = false;

        if (typeof action.payload === "string") {
          state.errors.push(action.payload);
        } else {
          const idx = state.data.findIndex(
            (production) => production.id === parseInt(action.payload.prod_id)
          );
          state.data.splice(idx, 1);
          state.spotlight = null;
        }
      },
    }),
  }),
  extraReducers: (builder) => {
    builder.addCase("user/fetchRegister/fulfilled", (state, action) => {
      //! This is where I can listen in actions that are not part of this slice
      //! and still perform state changes on this slice
      //! This is just an example of how to do it
    });
  },
  selectors: {
    selectProductions(state) {
      return state.data;
    },
    selectErrors(state) {
      return state.errors;
    },
    selectProductionById: (state, prod_id) => {
      return state.data.find((production) => production.id === prod_id);
    },
  },
});

export const {
  setProduction,
  setEditMode,
  addError,
  clearErrors,
  fetchAllProductions,
  fetchOneProduction,
  fetchPostProduction,
  fetchPatchProduction,
  fetchDeleteProduction,
} = productionSlice.actions;
export const { selectProductions, selectErrors } = productionSlice.selectors;
export default productionSlice.reducer;
