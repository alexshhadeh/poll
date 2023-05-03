import { getStorage, ref, uploadBytes } from "firebase/storage";

import { app } from './firestore_db';

const storage = getStorage(app);

// 'file' comes from the Blob or File API
export async function uploadImage(file) {
    console.log('sending image..')
    const storageRef = ref(storage, 'test-child');
    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });
}
