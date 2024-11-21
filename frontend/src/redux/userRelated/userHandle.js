import axios from 'axios';
import {
    authRequest,
    stuffAdded,
    authSuccess,
    authFailed,
    authError,
    authLogout,
    doneSuccess,
    //getDeleteSuccess,
    getRequest,
    getFailed,
    getError,
} from './userSlice';

export const loginUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/${role}Login`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.role) {
            dispatch(authSuccess(result.data));
        } else {
            dispatch(authFailed(result.data.message));
        }
    } catch (error) {
        dispatch(authError(error));
    }
};

// export const registerUser = (fields, role) => async (dispatch) => {
//     dispatch(authRequest());

//     try {
//         const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/${role}Reg`, fields, {
//             headers: { 'Content-Type': 'application/json' },
//         });
//         if (result.data.collegeName) {
//             dispatch(authSuccess(result.data));
//         }
//         else if (result.data.school) {
//             dispatch(stuffAdded());
//         }
//         else {
//             dispatch(authFailed(result.data.message));
//         }
//     } catch (error) {
//         dispatch(authError(error));
//     }
// };



export const registerUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const apiUrl = `${process.env.REACT_APP_BASE_URL}/${role}Reg`; // Ensure the BASE_URL and role are correct
        if (!process.env.REACT_APP_BASE_URL || !role) {
            console.error('Base URL or role is undefined');
            return;
        }

        const response = await axios.post(apiUrl, fields, {
            headers: { 'Content-Type': 'application/json' },
        });

        // Handle responses based on the returned data
        if (response.data.collegeName) {
            dispatch(authSuccess(response.data)); // Dispatch success with serialized data
        } else if (response.data.school) {
            dispatch(stuffAdded()); // Handle additional cases
        } else {
            dispatch(authFailed(response.data.message || 'An unexpected error occurred'));
        }
    } catch (error) {
        // Dispatch a serializable error object
        dispatch(authError({
            message: error.response?.data?.message || error.message,
            status: error.response?.status || 500,
        }));
    }
};





export const logoutUser = () => (dispatch) => {
    dispatch(authLogout());
};

export const getUserDetails = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data) {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

// export const deleteUser = (id, address) => async (dispatch) => {
//     dispatch(getRequest());

//     try {
//         const result = await axios.delete(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`);
//         if (result.data.message) {
//             dispatch(getFailed(result.data.message));
//         } else {
//             dispatch(getDeleteSuccess());
//         }
//     } catch (error) {
//         dispatch(getError(error));
//     }
// }


export const deleteUser = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    dispatch(getFailed("Sorry the delete function has been disabled for now."));
}

export const updateUser = (fields, id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.put(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.collegeName) {
            dispatch(authSuccess(result.data));
        }
        else {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const addStuff = (fields, address) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/${address}Create`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (result.data.message) {
            dispatch(authFailed(result.data.message));
        } else {
            dispatch(stuffAdded(result.data));
        }
    } catch (error) {
        dispatch(authError(error));
    }
};