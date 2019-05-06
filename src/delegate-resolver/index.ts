import liskClient from "../api";
import knownSender from "./known-sender";

let delegatesList = {};

const fetchDelegates = async () => {
  console.log("starting to fetch all delegates");
  let list = [];
  let offset = 0;
  while (offset >= 0) {
    const delegates: any = await liskClient.delegates.get({
      limit: 100,
      offset
    });
    offset += 100;
    if (delegates.data.length < 100) {
      offset = -1;
    }
    list = [...list, ...delegates.data];
  }

  console.log("Found " + list.length + " delegates");
  delegatesList = {
    ...knownSender
  };
  list.forEach(d => {
    delegatesList[d.account.address] = d.username;
  });
};

const getNameFromAddress = (address: string) => {
  return delegatesList[address];
};

export { fetchDelegates, getNameFromAddress };
