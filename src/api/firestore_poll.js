import db from './firestore_db'

import { collection, addDoc, doc, getDoc } from 'firebase/firestore'

export async function createPoll(pollDocument) {
    const pollReference = await addDoc(collection(db, "polls"), pollDocument);
    console.log(`%cPoll created in database with ID: ${pollReference.id}`, "color: green;");
    return pollReference.id;
}

export async function getPoll(pollId) {
    const pollRef = doc(db, "polls", pollId);
    const pollDoc = await getDoc(pollRef);
    console.log(`%cFetched poll with Id: ${pollId}`, "color: green;");
    return pollDoc.data();
}