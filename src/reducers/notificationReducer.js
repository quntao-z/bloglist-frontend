import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        notificationSetting(action) {
            return action.payload;
        },
        notificationRemoving() {
            return "";
        }
    }
})

export const setNotification = (notification) => {
    return async dispatch => {
        await dispatch(notificationSetting(notification))
        setTimeout(() => {
            dispatch(notificationRemoving())
        }, 5000)
    }
}

export const {notificationSetting, notificationRemoving} = notificationSlice.actions
export default notificationSlice.reducer