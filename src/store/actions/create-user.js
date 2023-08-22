import { API } from 'aws-amplify';

// function getStats() will return stats received from a lambda function in the backend
export const createUser = async(username) => {
    const myInit = {
        body: {
          username,
          action: "create_user"
        }
      };
    //let res = await API.post('BWConsoleAPI', '/bwapi', myInit);

    // wait for five seconds
    await new Promise(r => setTimeout(r, 5000));
    let res = {"success" : true}
    console.log(myInit);
    return res;
}