module.exports = {
  //JWT constants
  JWT: {
    EXPIRE_TIME: 3600,
  },

  REQUEST_METHOD: {
    POST: 'POST',
    GET: 'GET',
  },

  D7_CONFIGURATIONS: {
    BASE_URL: 'https://d7networks.com',
    RAPID_TOKEN: '3066c396ddc255f1be8db61ed9998acc6a4e9810',
    METHODS: {
      SEND: 'api/verifier/send',
      VERIFY: 'api/verifier/verify',
    },
    SENDER_ID: 'AUTH_4',
    EXPIRATION: '900',
  },
};
