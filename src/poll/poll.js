import * as firestore from '../api/firestore_poll'

export class Poll {

    static create(userId, title, fields, allow_multiselect) {
        console.log('user id is ' + userId)
        const params = {
            user_id: userId,
            title: title,
            fields: fields,
            allow_multiselect: allow_multiselect
        }

        if (Poll.verifyParams(params)) {

            firestore.createPoll(params)
        }

    }

    static delete() {

    }

    static get link() {

    }

    static get results() {

    }

    static get poll() {

    }

    static vote() {

    }

    static verifyParams(pollObject) {
        for (const key in pollObject) {
            if (pollObject[key] == null) {
                throw new Error(`Poll has null value on "${key}" key`)
            }
        }
        return true;
    }
    static addDeletionTime() { }
    static addLink() { }
    static addUserId() {

    }
}