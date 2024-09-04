import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { myFirebaseStorage } from '../config/firebase';

export const uploadImage = async (file: Express.Multer.File, userId: string): Promise<string> => {
    // Upload the File
    const fileName = file.originalname;
    const filePathToStore = `/uploads/images/${userId}/${fileName}`;
    const imageRef = ref(myFirebaseStorage, filePathToStore);

    // Upload file to Firebase Storage
    const snapshot = await uploadBytes(imageRef, file.buffer, {
        contentType: file.mimetype,
    });

    // Get the download URL of the uploaded file
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
};
