const initialState = {
    newBillPicture: ''
}

const cameraReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'TakePicture':
            return {
                ...state, newBillPicture: state.newBillPicture = action.payload.newBillPicture
            }
        case 'ResetPicture':
            return {
                ...state, newBillPicture: state.newBillPicture = ''
            }
        default:
            return state
    }
}

export default cameraReducer