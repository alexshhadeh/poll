import db from './firestore_db'

import { collection, addDoc } from 'firebase/firestore'

export async function createPoll(pollDocument) {
    const pollReference = await addDoc(collection(db, "polls"), pollDocument);
    console.log(`%cPoll created in database with ID: ${pollReference.id}%s`, "color: green;");
}