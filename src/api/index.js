const BASE_URL = 'http://fitnesstrac-kr.herokuapp.com/api';

export const fetchAllRoutines = async () => {
  try {
    const response = await fetch(`${BASE_URL}/routines`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to fetch all routines: ${error}`);
  }
};

export const fetchActivities = async () => {
  try {
    const response = await fetch(`${BASE_URL}/activities`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to fetch activities: ${error}`);
  }
};

export const exchangeTokenForUser = (setToken, setUser) => {
  const token = window.localStorage.getItem('token');
  if (token) {
    fetch(`${BASE_URL}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setToken(token);
        setUser(data);
      })
      .catch((error) => console.error(error));
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await response.json();
    const token = data.token;
    window.localStorage.setItem('token', token);
    return token;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to login: ${error}`);
  }
};

export const postRoutine = async (token, name, goal) => {
  try {
    const response = await fetch(`${BASE_URL}/routines`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        goal: goal,
        isPublic: true,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to post routine: ${error}`);
  }
};

export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to register user: ${error}`);
  }
};

export const fetchAllPublicRoutinesForAUser = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${username}/routines`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to fetch all public routines for a user: ${error}`);
  }
};


export const deleteRoutine = async (routineId, token) => {
  try {
    const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const attachActivityToRoutine = async (routineId, token, activityId, count, duration) => {
  try {
    const response = await fetch(`${BASE_URL}/routines/${routineId}/activities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        activityId: activityId,
        count: count,
        duration: duration,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to attach activity to routine: ${error}`);
  }
};

