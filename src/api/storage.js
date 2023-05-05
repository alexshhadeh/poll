import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { app } from './firestore_db';

const storage = getStorage(app);

// 'file' comes from the Blob or File API
export async function uploadImage(file, fileName) {
    const storageRef = ref(storage, fileName);
    await uploadBytes(storageRef, file).then((snapshot) => {
        console.log(`%cUploaded profile image.`, 'color: green;');
    });
}

export async function getUserProfileImage(userId) {
    const imageName = 'profile_image_' + String(userId)
    const imageRef = ref(storage, imageName);

    return getDownloadURL(imageRef).then(onResolve, onReject)

    function onResolve(imageUrl) {
        return imageUrl;
    }
    function onReject() {
        return null;
    }
}