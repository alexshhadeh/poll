const base = window.location.origin;

export const routes = {
  homeView: '/poll/',
  loginView: '/poll/login',
  signupView: '/poll/register',
  createPollView: '/poll/create',
  pollView: '/poll/poll',
  pollResultsView: '/poll/results',
  manageView: '/poll/manage',
  managePollById: (pollId: string) => `/poll/manage?id=${pollId}`,
  pollResultsViewById: (pollId: string) => `/poll/results?id=${pollId}`,

  get baseUrl() {
    return base;
  },
};
