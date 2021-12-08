const sleep = (timeout) => new Promise((resolve) => setTimeout(resolve, 1300));

const fakeApi = {
  setPublicStatus: async (_status) => {
    await sleep(1300);
    return;
  },
  getPublishedDate: async (_status) => {
    await sleep(1100);
    return new Date();
  },
  getProStatus: async (_status) => {
    await sleep(2000);
    return false;
  },
};

export default fakeApi;
