import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Spinner from '../../components/Spinner';
import api from '../../api';
import { handleError } from '../../AppContext';
import NotFound from '../NotFound';

export default function VerifyRegistration() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const reference = queryParams.get('reference');
  const [success, setSuccess] = useState(undefined);

  useEffect(() => {
    api
      .get(`/registrations/verify/${reference}`)
      .then((response) => {
        setSuccess(true);
      })
      .catch((error) => {
        handleError(error);
        setSuccess(false);
      });
  }, []);

  if (success === undefined) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: '100dvh' }}
      >
        <Spinner />
      </div>
    );
  }

  if (!success) {
    return (
      <>
        <div className="container-fluid">
          <div className="container my-5">
            <h2 className="display-3">Transaction Unsuccessful</h2>
            <h5 className="text-muted">
              We're sorry, but it seems there was an issue with your
              registration.
            </h5>
            <p>
              Unfortunately, your registration for the upcoming event could not
              be processed successfully. If you believe this is an error or if
              you encounter any issues, please reach out to our support team for
              assistance. We apologize for any inconvenience this may have
              caused. You may attempt the registration process again, or if you
              have questions, feel free to contact us for further guidance.
            </p>
            <p>
              Thank you for your understanding, and we appreciate your interest
              in our events.
            </p>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="container-fluid">
        <div className="container my-5">
          <h2 className="display-3">Registration Successful: {}</h2>
          <h5 className="text-muted">
            Your registration for the upcoming event has been successfully
            completed.
          </h5>
          <p>
            We are thrilled to have you join us, and we look forward to an
            enriching experience together. You will receive a confirmation email
            shortly with all the details you need to make the most of the event.
            If you have any further questions or require assistance, feel free
            to reach out to our support team.
          </p>
          <p>
            Thank you for choosing to be a part of this exciting event, and we
            can't wait to see you there!
          </p>
        </div>
      </div>
    </>
  );
}
