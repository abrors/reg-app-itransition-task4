import { useState, useEffect } from "react";
import EmptyUserList from "../components/UI/EmptyUserList";
import axios from "axios";

let temp = 0;

function Users() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  function editStatus(editUsername, editStatus) {
    axios.post(`/auth/change-status`, {
      username: editUsername,
      status: editStatus,
    });
    console.log("Status of " + editUsername + "changed to: " + editStatus);
    console.log("EditStatus getUser()");
    temp++;
    getUsers();
  }
  async function deleteUser(username) {
    console.log(username);

    await axios.delete("/auth/delete-user", { data: { username: username } });
    console.log("User " + username + " deleted");
    temp++;
    getUsers();
  }
  async function getUsers() {
    try {
      const res = await axios.get("/auth/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    console.log("useEffect getUser()");
    getUsers();
  }, [temp]);

  function refresh() {
    temp++;
  }

  return (
    <section>
      {localStorage.getItem("token") ? (
        <ul>
          <h1>All Users</h1>
          <button onClick={refresh} className="btn btn-success">Refresh</button>
          {data.map((user) => (
            <li key={user._id} className="card padding-1rem ">
              <h3>{user.username}</h3>
              <div className="list-item">
                <div>
                  <p>Last Login: {user.lastLogin}</p>
                  <p>Created at: {user.createdAt}</p>
                  <p>Status: {user.status}</p>
                </div>
                <div>
                  {user.status === "blocked" ? (
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => editStatus(user.username, "active")}
                    >
                      Unlock
                    </button>
                  ) : null}
                  {user.status === "active" ? (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => editStatus(user.username, "blocked")}
                    >
                      Block
                    </button>
                  ) : null}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => deleteUser(user.username)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyUserList />
      )}
    </section>
  );
}

export default Users;
