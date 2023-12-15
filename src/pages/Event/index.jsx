import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Spinner from '../../components/Spinner';
import api from '../../api';
import { handleError } from '../../AppContext';
import NotFound from '../NotFound';
import dateString from '../../utils/dateString';
import RegistrationForm from './registration';
import { FaUser } from 'react-icons/fa6';

export default function EventPage() {
  const { slug } = useParams();
  const [event, setEvent] = useState(undefined);

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

  if (event === null) {
    return <NotFound />;
  }

  if (event === undefined) {
    return <Spinner />;
  }

  return (
    <>
      <div className="container-fluid py-5 bg-light">
        <div className="container">
          <h5 className="text-secondary">{event.name}</h5>
          <h1 className="display-5">{event.theme}</h1>

          <div className="d-wrap my-3">
            <div
              className="badge text-bg-primary me-2"
              style={{ fontSize: '14px', marginTop: '5px' }}
            >
              Start date: {dateString(event.date_from)}
            </div>
            <div
              className="badge text-bg-primary me-2"
              style={{ fontSize: '14px', marginTop: '5px' }}
            >
              End date: {dateString(event.date_to)}
            </div>
            <div
              className="badge text-bg-secondary me-2"
              style={{ fontSize: '14px', marginTop: '5px' }}
            >
              Registration closing date:{' '}
              {dateString(event.registration_close_on)}
            </div>
          </div>

          <div>
            <div dangerouslySetInnerHTML={{ __html: event.description }} />
            <a href={event.url} className="btn btn-lg btn-primary">
              More about this event
            </a>
          </div>
        </div>
      </div>
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 px-md-4 p-0 my-2">
              <h4>Payment Details</h4>

              {event.tiers.length === 0 ? (
                <>
                  <p>This event is currently not accepting registration.</p>
                </>
              ) : (
                <>
                  <p>
                    To secure your spot at this exciting event, the registration
                    fee for this event is as follows:
                  </p>
                  <TierCards tiers={event.tiers} />
                </>
              )}
            </div>
            <div className="col-12 col-md-8 px-md-5 p-0 my-2">
              <RegistrationForm eventId={event.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function TierCards({ tiers }) {
  return (
    <>
      <div className="card">
        <ul className="list-group list-group-flush">
          {tiers.map((tier, index) => {
            return (
              <li className="list-group-item" key={index}>
                <div className="d-flex align-items-center">
                  <FaUser className="text-primary m-0 me-2" />
                  {tier.name} {` - `}
                  {tier.amount === 0 ? (
                    'Free'
                  ) : (
                    <>
                      {tier.amount} {tier.currency} ({tier.description})
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
