// https://docs.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin/consumer/context
// https://docs.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/sign-in-with-linkedin?context=linkedin/consumer/context

const client_id = process.env.VUE_APP_LINKEDIN_APP_ID;
const urlCallback = process.env.VUE_APP_LINKEDIN_CALLBACK_URL;

const loadLinkedInSignIn = async () => true;

const createLinkedInSignInUrl = () =>
  `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${client_id}&redirect_uri=${urlCallback}&state=ayrgyaan${Math.random()}&scope=r_liteprofile r_emailaddress`;

export { loadLinkedInSignIn, createLinkedInSignInUrl }
