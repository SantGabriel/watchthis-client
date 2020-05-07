const serverURL = "http://localhost:5000";

export const apiRequest = (method, route, body, query) => {
  let currentUser = sessionStorage.getItem("user");
  return new Promise((resolve, reject) => {
    let serviceUrl = serverURL + route;
    if (query) {
      serverURL += getQueryString(query);
    }
    fetch(serviceUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(currentUser && { Authorization: JSON.parse(currentUser).token }),
      },
      ...(body && { body: JSON.stringify(body) }),
    })
      .then((res) => parseResponse(res))
      .then((data) => resolve(data))
      .catch((err) => {
        console.error(`error ${method} ${route}: ${err.message}`);
        reject(err);
      });
  });
};

const parseResponse = (response) =>
  new Promise((resolve, reject) => {
    if (response.ok) {
      resolve(response.json());
    } else {
      reject(response.text());
    }
  });

const getQueryString = (query) =>
  "?" +
  Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
