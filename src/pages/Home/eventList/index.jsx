import React, { useEffect } from 'react';
import { useAppContext } from '../../../AppContext';
import Spinner from '../../../components/Spinner';
import { Link } from 'react-router-dom';
import './style.css';
import dateString from '../../../utils/dateString';
import { safeText } from '../../../utils/sanitizeHtml';

export default function EventList() {
  const { events, getEvents } = useAppContext();
  useEffect(() => {
    getEvents({});
  }, []);
  if (events === undefined) {
    return <Spinner />;
  }
  return (
    <>
      <div>
        <div className="row gap-3">
          {events.items.map((event, index) => {
            return <EventCard key={index} event={event} />;
          })}
        </div>
      </div>
    </>
  );
}

function EventCard({ event }) {
  return (
    <>
      <div className="card col-12 col-md-5 p-0 bg-light">
        <Link to={`/events/${event.slug}`}>
          <div className="card-body event-card">
            <h5 className="card-title">{event.name}</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">
              {event.theme}
            </h6>
            <p className="card-text two-lines">{safeText(event.description)}</p>
            <div>
              <p className="small">
                {dateString(event.date_from)} - {dateString(event.date_to)}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
