export const routes = {
  homeView: '/',
  loginView: '/login',
  signupView: '/register',
  createPollView: '/create',
  pollView: '/poll',
  pollResultsView: '/results',
  manageView: '/manage',
  pollViewById: (pollId: string) => `/poll?id=${pollId}`,
  managePollById: (pollId: string) => `/manage?id=${pollId}`,
  pollResultsViewById: (pollId: string) => `/results?id=${pollId}`,
};
