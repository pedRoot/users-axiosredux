import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  getAll,
  removeAll,
} from '../../actions/users';

const List = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  const refreshData = () => {
    setCurrentUser(null);
    setCurrentIndex(-1);
  };

  const setActiveUser = (user, index) => {
    setCurrentUser(user);
    setCurrentIndex(index);
  };

  const removeAllUsers = () => {
    dispatch(removeAll())
      .then(response => {
        console.log(response);
        refreshData();
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">

      <div className="col-md-6">
        <h4>Users List</h4>

        <ul className="list-group">
          {users &&
            users.map((user, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveUser(user, index)}
                key={index}
              >
                <img src={user.avatar}
                alt={user.name}
                  className="img-responsive rounded-circle"
                  style={{ maxheight: '10px', maxwidth: '10px' }} />
                <p>
                  <label>
                    <strong>Names:</strong>
                  </label>{" "}{user.first_name} {user.last_name}
                </p>
                <p>
                  <label>
                    <strong>Email:</strong>
                  </label>{" "}{user.email}
                </p>
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllUsers}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentUser ? (
          <div>
            <h4>Detail</h4>
            <img src={currentUser.avatar}
              alt={currentUser.first_name}
              className="img-responsive rounded-circle"
              style={{ maxheight: '20px', maxwidth: '20px' }} />
            <div>
              <label>
                <strong>First Name:</strong>
              </label>{" "}{currentUser.first_name}
            </div>
            <div>
              <label>
                <strong>Last Name:</strong>
              </label>{" "}{currentUser.last_name}
            </div>
            <div>
              <label>
                <strong>Email:</strong>
              </label>{" "}
              {currentUser.email}
            </div>

            <Link
              to={"/users/" + currentUser.id}
              className="btn btn-primary"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a user...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;