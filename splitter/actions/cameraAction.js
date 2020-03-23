const TakePicture = (newBillPicture) => {
    return {
        type: 'TakePicture',
        payload: {
            newBillPicture
        }
    }
}

const ResetPicture = () => {
    return {
        type: 'ResetPicture'
    }
}

export {
    TakePicture,
    ResetPicture
}