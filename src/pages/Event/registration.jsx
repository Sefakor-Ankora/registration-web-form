import React, { useEffect, useState } from 'react';
import { Input, Submit, Select } from '../../components/Form';
import { handleError, useAppContext } from '../../AppContext';
import Spinner from '../../components/Spinner';
import formDataToObject from '../../utils/FormDataToObject';
import api from '../../api';
import { showToast } from '../../components/Toast';

export default function RegistrationForm({ eventId }) {
  const { affiliations, getAffiliations } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [registrationRequired, setRegistrationRequired] = useState(false);

  useEffect(() => {
    getAffiliations();
  }, []);

  const createParticipant = async (formData) => {
    api
      .post(`/participants`, formData)
      .then((response) => {
        if (response.status === 201) {
          registerParticipant(formData);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(setRegistrationRequired(false));
  };

  const registerParticipant = (formData) => {
    api
      .post(`/events/${eventId}/registrations`, {
        ...formData,
        callback_url: `https://eventsregistration.wacren.net/verify`,
      })
      .then((response) => {
        setRegistrationRequired(false);
        if (response.data.data.auth_url === '#') {
          showToast('Registration success!');
          return;
        }
        showToast('Successful: redirecting to payment page.');
        window.location.href = response.data.data.auth_url;
      })
      .catch((error) => handleError(error));
  };

  const validateWithEmail = (email) => {
    api
      .get(`/participants/email/${email}`)
      .then((response) => {
        registerParticipant({ email });
      })
      .catch((error) => {
        setRegistrationRequired(true);
      });
  };

  return (
    <>
      <h6 className="display-6" style={{ fontSize: '22px' }}>
        Enter your email to begin registration:
      </h6>
      <form
        onSubmit={async (e) => {
          setLoading(true);
          e.preventDefault();
          const formData = await formDataToObject(new FormData(e.target));
          if (registrationRequired === true) {
            createParticipant(formData);
          } else {
            validateWithEmail(formData.email);
          }
          setLoading(false);
        }}
      >
        <Input name="email" type="email" readOnly={registrationRequired}>
          Email
        </Input>
        {registrationRequired === true ? (
          <>
            <Input name="firstname">Firstname</Input>
            <Input name="lastname">Lastname</Input>
            <Input name="organisation">Institution/Organisation</Input>
            <Input name="phone">Phone</Input>
            {affiliations === undefined ? (
              <Spinner />
            ) : (
              <Select
                name="affiliation"
                items={affiliations.items.map((aff) => {
                  return {
                    name: aff,
                    value: aff,
                  };
                })}
              >
                Affiliation
              </Select>
            )}
          </>
        ) : (
          ''
        )}
        <Submit loadingState={loading}>Register</Submit>
      </form>
    </>
  );
}
