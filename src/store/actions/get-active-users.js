import { API } from 'aws-amplify';

// function getStats() will return stats received from a lambda function in the backend
export const getActiveUsers = async(group_name) => {
    const myInit = {
        body: {
          action: "get-active-users",
          group_name // group_name: group_name, in ES6
        }
      };
    //let res = await API.post('BWConsoleAPI', '/bwapi', myInit);
    
    // wait for five seconds
    await new Promise(r => setTimeout(r, 5000));
    let res = [
        {
          "id": "1",
          "name": "John Doe",
          "lastLogin": "2021-08-01T00:00:00.000Z"
        },
        {
          "id": "2",
          "name": "Jane Doe",
          "lastLogin": "2021-08-01T00:00:00.000Z"
        },
        {
          "id": "3",
          "name": "John Smith",
          "lastLogin": "2021-08-01T00:00:00.000Z"
        },
        {
          "id": "4",
          "name": "Jane Smith",
          "lastLogin": "2021-08-01T00:00:00.000Z"
        }
    ]
    console.log(myInit);
    return res;
}