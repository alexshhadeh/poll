export const routes = {
  homeView: '/',
  loginView: '/login',
  signupView: '/register',
  createPollView: '/create',
  pollView: '/poll',
  pollResultsView: '/results',
  manageView: '/manage',
  pollViewById: (pollId: string) => `/poll?id=${pollId}`,
  pollResultsViewById: (pollId: string) => `/results?id=${pollId}`,
};
