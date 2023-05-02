import * as firestore from '../api/firestore_poll';

export class Poll {
  static async create(userId, title, fields, allow_multiselect) {
    const lastPollId = await this.getPollIdByUserId(userId);
    if (lastPollId) {
      this.delete(lastPollId);
    }
    const params = {
      user_id: userId,
      title: title,
      fields: fields.reduce((acc, curr) => {
        acc[curr] = 0;
        return acc;
      }, {}),

      allow_multiselect: allow_multiselect,
    };

    if (Poll.verifyParams(params)) {
      return firestore.createPoll(params);
    }
  }

  static async delete(pollId) {
    firestore.deletePoll(pollId);
  }

  static async results(pollId) {
    const poll = await firestore.getPoll(pollId);
    return poll.fields;
  }

  static async poll(pollId) {
    const poll = await firestore.getPoll(pollId);
    //Return only field names to hide current vote results
    poll.fields = Object.keys(poll.fields);
    return poll;
  }

  static async vote(pollId, choices) {
    console.log('Sending vote choices');
    if (this.verifyVotingChoices(choices)) {
      await firestore.sendVotes(pollId, choices);
    }
  }

  static verifyParams(pollObject) {
    for (const key in pollObject) {
      if (pollObject[key] == null) {
        throw new Error(`Poll has null value on "${key}" key`);
      }
    }
    return true;
  }

  static verifyVotingChoices(choices) {
    if (choices && Object.keys(choices).length) {
      return true;
    } else {
      throw new Error('No choices were provided!');
    }
  }

  static async toggleAllowViewResults(pollId, allowMultiselect) {
    firestore.toggleAllowViewResults(pollId, allowMultiselect)
  }

  static async getPollIdByUserId(userId) {
    return firestore.getPollIdByUserId(userId);
  }
}
