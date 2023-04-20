import * as auth from '../api/firestore_auth';

export async function createUserWithEmailAndPassword(email, password) {
    auth.firestoreCreateUserWithEmailAndPassword(email, password)
}

export async function signInWithEmailAndPassword(email, password) {
    auth.firestoreSignInWithEmailAndPassword(email, password)
}