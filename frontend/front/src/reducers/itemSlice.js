import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import AxiosHeaderToken from "./AxiosHeaderToken";

export const initialState = {
  writeItemLoading: false,
  writeItemDone: false,
  writeItemError: null,
  modifyItemLoading: false,
  modifyItemDone: false,
  modifyItemError: null,
  searchItemLoading: false,
  searchItemDone: false,
  searchItemError: null,
  searchDetailItemLoading: false,
  searchDetailItemDone: false,
  searchDetailItemError: null,
  searchMyItemLoading: false,
  searchMyItemDone: false,
  searchMyItemError: null,
  deleteItemLoading: false,
  deleteItemDone: false,
  deleteItemError: null,
  searchInterestDetailLoading: false,
  searchInterestDetailDone: false,
  searchInterestDetailError: null,
  searchInterestAllLoading: false,
  searchInterestAllDone: false,
  searchInterestAllError: null,
  addInterestLoading: false,
  addInterestDone: false,
  addInterestError: null,
  deleteInterestLoading: false,
  deleteInterestDone: false,
  deleteInterestError: null,
  myItem: null,
  interest: false,
  myInterests: null,
  items: null,
  itemDetail: null,
  last: false,
  currentPage: 0,

};

export const writeItemAsync = createAsyncThunk(
  'item/WRITE',
  async (data, thunkAPI) => {
    try {
      const response = await AxiosHeaderToken.post(
        '/broker/items/new', data
      );
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const modifyItemAsync = createAsyncThunk(
  'item/MODIFY',
  async (data, thunkAPI) => {
    try {
      const response = await AxiosHeaderToken.patch(
        '/broker/items/modify', data
      );
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const SearchItemAsync = createAsyncThunk(
  'item/NEXT_SEARCH_ITEM',
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `/items?page=${data.page}&size=${data.size}`, data
      );
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const searchDetailItemAsync = createAsyncThunk(
  'item/SEARCH_DETAIL',
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `/items/${data}`,
      );
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const searchMyItemAsync = createAsyncThunk(
  'item/FIND_MY_ITEM',
  async (data, thunkAPI) => {
    try {
      const response = await AxiosHeaderToken.get(
        '/mypage/item',
      );
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const searchInterestDetailAsync = createAsyncThunk(
  'interest/SEARCH_INTEREST_DETAIL',
  async (data, thunkAPI) => {
    try {
      const response = await AxiosHeaderToken.get(
        `/user/interest/items/check/${data}`,
      );
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const searchInterestAllAsync = createAsyncThunk(
  'interest/SEARCH_INTEREST_ALL',
  async (data, thunkAPI) => {
    try {
      const response = await AxiosHeaderToken.get(
        `/user/interest/items`,
      );
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const addInterestAsync = createAsyncThunk(
  'interest/ADD_INTEREST',
  async (data, thunkAPI) => {
    try {
      const response = await AxiosHeaderToken.post(
        '/user/interest/items/new', data
      );
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const deleteInterestAsync = createAsyncThunk(
  'interest/DELETE_INTEREST',
  async (data, thunkAPI) => {
    try {
      const response = await AxiosHeaderToken.post(
        `/user/interest/items/${data}`,
      );
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const DeleteItemAsync = createAsyncThunk(
  'item/DELETE_MY_ITEM',
  async (data, thunkAPI) => {
    try {
      const response = await AxiosHeaderToken.patch(
        `/broker/items/deactivate/${data}`,
      );
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);


const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    initItemState: (state) => {
      state.items = null;
      state.currentPage = 0;
      state.last = false;
      state.itemDetail = null;
    },
    clearSearchDetailItemDone: (state) => {
      state.searchDetailItemDone = false
    },
    clearWriteItemDone: (state) => {
      state.writeItemDone = false
    },
    clearModifyItemDone: (state) => {
      state.modifyItemDone = false
    },
    choiceItemDetail: (state, action) => {
      state.itemDetail = action.payload
    },
    changeInterest: (state) => {
      state.interest = !state.interest
    },
    deleteMyItem: (state, action) => {
      state.myItem.map((item, index) => {
        if (item.item.item_id === action.payload) {
          state.myItem.splice(index, 1);
          return
        }
      })
    }
  },
  extraReducers: (builder) => {
    builder.addCase(writeItemAsync.pending, (state, action) => {
      state.writeItemLoading = true;
      state.writeItemError = null;
      state.writeItemDone = false;
    });
    builder.addCase(writeItemAsync.fulfilled, (state, action) => {
      state.writeItemLoading = false;
      state.writeItemDone = true;
      alert('매물 등록 성공')
    });
    builder.addCase(writeItemAsync.rejected, (state, action) => {
      state.writeItemLoading = false;
      state.writeItemError = action.payload
      alert('매물 등록 실패');
    });
    builder.addCase(modifyItemAsync.pending, (state, action) => {
      state.modifyItemLoading = true;
      state.modifyItemError = null;
      state.modifyItemDone = false;
    });
    builder.addCase(modifyItemAsync.fulfilled, (state, action) => {
      state.modifyItemLoading = false;
      state.modifyItemDone = true;
      alert('매물 수정 성공')
    });
    builder.addCase(modifyItemAsync.rejected, (state, action) => {
      state.modifyItemLoading = false;
      state.modifyItemError = action.payload
      alert('매물 수정 실패');
    });
    builder.addCase(searchMyItemAsync.pending, (state, action) => {
      state.searchMyItemLoading = true;
      state.searchMyItemError = null;
      state.searchMyItemDone = false;
    });
    builder.addCase(searchMyItemAsync.fulfilled, (state, action) => {
      state.searchMyItemLoading = false;
      state.searchMyItemDone = true;
      state.myItem = action.payload
    });
    builder.addCase(searchMyItemAsync.rejected, (state, action) => {
      state.searchMyItemLoading = false;
      state.searchMyItemError = action.error
    });
    builder.addCase(SearchItemAsync.pending, (state, action) => {
      state.searchItemLoading = true;
      state.searchItemDone = null;
      state.searchItemError = false;
    });
    builder.addCase(SearchItemAsync.fulfilled, (state, action) => {
      state.searchItemLoading = false;
      state.searchItemDone = true;
      if (state.items === null) {
        state.items = action.payload.content;
      } else {
        state.items = state.items.concat(action.payload.content)
      }
      state.currentPage += 1;
      state.last = action.payload.last
    });
    builder.addCase(SearchItemAsync.rejected, (state, action) => {
      state.searchItemLoading = false;
      state.searchItemError = action.error
    });
    builder.addCase(searchDetailItemAsync.pending, (state, action) => {
      state.searchDetailItemLoading = true;
      state.searchDetailItemDone = null;
      state.searchDetailItemError = false;
    });
    builder.addCase(searchDetailItemAsync.fulfilled, (state, action) => {
      state.searchDetailItemLoading = false;
      state.searchDetailItemDone = true;
      state.itemDetail = action.payload;
    });
    builder.addCase(searchDetailItemAsync.rejected, (state, action) => {
      state.searchDetailItemLoading = false;
      state.searchDetailItemError = action.error
    });
    builder.addCase(DeleteItemAsync.pending, (state, action) => {
      state.deleteItemLoading = true;
      state.deleteItemDone = null;
      state.deleteItemError = false;
    });
    builder.addCase(DeleteItemAsync.fulfilled, (state, action) => {
      state.deleteItemLoading = false;
      state.deleteItemDone = true;
    });
    builder.addCase(DeleteItemAsync.rejected, (state, action) => {
      state.deleteItemLoading = false;
      state.deleteItemError = action.error
    });
    builder.addCase(searchInterestDetailAsync.pending, (state, action) => {
      state.searchInterestDetailLoading = true;
      state.searchInterestDetailDone = null;
      state.searchInterestDetailError = false;
    });
    builder.addCase(searchInterestDetailAsync.fulfilled, (state, action) => {
      state.searchInterestDetailLoading = false;
      state.searchInterestDetailDone = true;
      state.interest = action.payload
    });
    builder.addCase(searchInterestDetailAsync.rejected, (state, action) => {
      state.searchInterestDetailLoading = false;
      state.searchInterestDetailError = action.error
    });
    builder.addCase(searchInterestAllAsync.pending, (state, action) => {
      state.searchInterestAllLoading = true;
      state.searchInterestAllDone = null;
      state.searchInterestAllError = false;
    });
    builder.addCase(searchInterestAllAsync.fulfilled, (state, action) => {
      state.searchInterestAllLoading = false;
      state.searchInterestAllDone = true;
      state.myInterests = action.payload
    });
    builder.addCase(searchInterestAllAsync.rejected, (state, action) => {
      state.searchInterestAllLoading = false;
      state.searchInterestAllError = action.error
    });
    builder.addCase(addInterestAsync.pending, (state, action) => {
      state.addInterestLoading = true;
      state.addInterestDone = null;
      state.addInterestError = false;
    });
    builder.addCase(addInterestAsync.fulfilled, (state, action) => {
      state.addInterestLoading = false;
      state.addInterestDone = true;
      state.interest = true;
    });
    builder.addCase(addInterestAsync.rejected, (state, action) => {
      state.addInterestLoading = false;
      state.addInterestError = action.error
    });
    builder.addCase(deleteInterestAsync.pending, (state, action) => {
      state.deleteInterestLoading = true;
      state.deleteInterestDone = null;
      state.deleteInterestError = false;
    });
    builder.addCase(deleteInterestAsync.fulfilled, (state, action) => {
      state.deleteInterestLoading = false;
      state.deleteInterestDone = true;
      state.interest = false;
    });
    builder.addCase(deleteInterestAsync.rejected, (state, action) => {
      state.deleteInterestLoading = false;
      state.deleteInterestError = action.error
    });
  }
});

export const { initItemState, clearWriteItemDone, clearSearchDetailItemDone, choiceItemDetail, deleteMyItem, clearModifyItemDone, changeInterest } = itemSlice.actions;
export default itemSlice.reducer;