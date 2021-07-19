import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { update, remove } from '../../actions/users';
import UserDataService from '../../services/User';

const Show = (props) => {
  const initialState = {
    id: null,
    first_name: '',
    last_name: '',
    email: ''
  };
  const [currentUser, setCurrentUser] = useState(initialState);
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const getUser = id => {
    UserDataService.get(id)
      .then(response => {
        setCurrentUser(response.data.data);
        console.log(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUser(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const updateContent = () => {
    dispatch(update(currentUser.id, currentUser))
      .then(response => {
        console.log(response);

        setMessage('The tutorial was updated successfully!');
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removeTutorial = () => {
    dispatch(remove(currentUser.id))
      .then(() => {
        props.history.push('/users');
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentUser ? (
        <div className="edit-form">
          <h4>User</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">First Name</label>
              <input
                type="text"
                className="form-control"
                id="first_name"
                name="first_name"
                value={currentUser.first_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="last_name"
                name="last_name"
                value={currentUser.last_name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={currentUser.email}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="btn btn-primary" onClick={updateContent}>
            Update
          </button>

          <button className="btn btn-secondary" onClick={removeTutorial}>
            Delete
          </button>

          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default Show;