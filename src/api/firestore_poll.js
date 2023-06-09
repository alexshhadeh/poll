import db from './firestore_db';

import { collection, query, where, addDoc, doc, deleteDoc, getDoc, getDocs, updateDoc } from 'firebase/firestore';

export async function createPoll(pollDocument) {
  const pollReference = await addDoc(collection(db, 'polls'), pollDocument);
  return pollReference.id;
}

export async function updatePollStats(allow_multiselect) {
  const statsRef = doc(db, 'statistics', "created_polls");
  const statsDoc = await getDoc(statsRef);
  const statsDocData = statsDoc.data();
  if (allow_multiselect) {
    statsDocData.multi_select += 1;
  } else {
    statsDocData.single_select += 1;
  }

  await updateDoc(statsRef, statsDocData);
  console.log(`%cPoll statistics has been updated successfully.`, 'color: green;');
}
export async function deletePoll(pollId) {
  const pollRef = doc(db, "polls", pollId);
  deleteDoc(pollRef)
    .then(() => {
      console.log(`%cPoll with id: ${pollId} has been deleted successfully.`, 'color: green;');
    })
    .catch(error => {
      console.log(error);
    })
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
  for (const choice in choices) {
    updatedFields[choice] += choices[choice];
  }

  const pollRef = doc(db, 'polls', pollId);

  await updateDoc(pollRef, {
    fields: updatedFields,
  });

  console.log(`%cSent votes to poll with Id: ${pollId}`, 'color: green;');
}

export async function toggleAllowViewResults(pollId, allowViewResults) {
  const pollRef = doc(db, 'polls', pollId);
  console.log('toggling allow in firestore poll')
  updateDoc(pollRef, {
    allow_view_results: allowViewResults,
  });
}

export async function getPollIdByUserId(userId) {
  const pollsCollection = collection(db, 'polls');
  const q = query(pollsCollection, where("user_id", "==", userId));
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs[0]?.id;
}