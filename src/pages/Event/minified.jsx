import React from 'react';
import NotFound from '../NotFound';
import Spinner from '../../components/Spinner';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import api from '../../api';
import { Input, Select, Submit } from '../../components/Form';
import formDataToObject from '../../utils/FormDataToObject';
import { handleError } from '../../AppContext';

export default function MiniEventPage() {
  const { slug } = useParams();
  const [event, setEvent] = useState(undefined);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [loading, setLoading] = useState(false);

  const firstname = queryParams.get('firstname');
  const lastname = queryParams.get('lastname');
  const email = queryParams.get('email');

  useEffect(() => {
    api
      .get(`/open_events/${slug}`)
      .then((response) => {
        setEvent(response.data.data);
      })
      .catch((error) => {
        setEvent(null);
        handleError(error);
      });
  }, []);

  const makePayment = (value) => {
    setLoading(true);
    const data = {
      firstname,
      lastname,
      email,
      live_and_work_in_africa: value,
    };
    api
      .post(`/events/${event.id}/registrations/v2`, {
        ...data,
        callback_url: `https://eventsregistration.wacren.net/verify`,
      })
      .then((response) => {
        if (response.data.data.auth_url === '#') {
          window.location.href = `https://eventsregistration.wacren.net/verify?reference=${response.data.data.reference}`;
        }
        window.location.href = response.data.data.auth_url;
      })
      .catch((error) => handleError(error));
  };

  if (event === null || !firstname || !lastname || !email) {
    return <NotFound />;
  }

  if (loading) {
    return <Spinner />;
  }

  if (event === undefined) {
    return <Spinner />;
  }
  return (
    <>
      <div className="container-fluid py-5 my-5 d-flex align-content-center">
        <div className="container" style={{ maxWidth: '500px' }}>
          <div className="text-center">
            <h5 className="text-primary">{event.name} Registration</h5>
            <small className="text-muted">
              Choose a payments option that applies to your registration.
            </small>
            <div className="my-3">
              <button
                className="btn btn-primary btn-lg w-100 my-2"
                onClick={() => {
                  makePayment('true');
                }}
              >
                Within Africa
              </button>
              <button
                className="btn btn-primary btn-lg w-100 my-2"
                onClick={() => {
                  makePayment('false');
                }}
              >
                Outside Africa
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
