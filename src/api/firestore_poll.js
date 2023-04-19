import db from './firestore_db';

import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';

export async function createPoll(pollDocument) {
  const pollReference = await addDoc(collection(db, 'polls'), pollDocument);
  console.log(
    `%cPoll created in database with ID: ${pollReference.id}`,
    'color: green;'
  );
  return pollReference.id;
}

export async function getPoll(pollId) {
  const pollRef = doc(db, 'polls', pollId);
  const pollDoc = await getDoc(pollRef);
  console.log(`%cFetched poll with Id: ${pollId}`, 'color: green;');
  return pollDoc.data();
}

export async function sendVotes(pollId, choices) {
  const poll = await getPoll(pollId);
  const updatedFields = { ...poll.fields };
  console.log(updatedFields);
  console.log(choices);
  for (const choice in choices) {
    updatedFields[choice] += choices[choice];
  }

  const pollRef = doc(db, 'polls', pollId);

  await updateDoc(pollRef, {
    fields: updatedFields,
  });

  console.log(`%cSent votes to poll with Id: ${pollId}`, 'color: green;');
}
