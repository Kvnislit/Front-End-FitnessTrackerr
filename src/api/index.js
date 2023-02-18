

export const fetchRoutines = async () => {
  const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/routines', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

export async function fetchActivities() {
  const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/activities`);
  return await response.json();
}


export const exchangeTokenForUser = (setToken, setUser) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    fetch("https://fitnesstrac-kr.herokuapp.com/api/users/me", {
      headers: {
        "Content-Type": "application/json",
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
  const response = await fetch("http://fitnesstrac-kr.herokuapp.com/api/users/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  const data = await response.json();
  const token = data.token;
  window.localStorage.setItem("token", token);
  return token;
};

export const postRoutine = async (token, name, goal) => {
  const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines`, {
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
};

export const registerUser = async (username, password) => {
  try {
    const response = await fetch("https://fitnesstrac-kr.herokuapp.com/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const fetchAllPublicRoutinesForAUser = async (username, token) => {
  try {
    const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/users/routines`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }

};

export const deleteRoutine = async (routineId, token) => {
  try {
    const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}`, {
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