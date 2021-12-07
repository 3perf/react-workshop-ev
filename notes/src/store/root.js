import { makeAutoObservable } from "mobx";

class RootStore {
  constructor() {
    makeAutoObservable(this);
  }

  publishingConfig = {
    target: "localhost",
    port: "8080",
    username: "admin",
    password: "NotVery$ecret",
  };

  setPublishingTarget = (target) => {
    this.publishingConfig.target = target;
  };
}

export default RootStore;
