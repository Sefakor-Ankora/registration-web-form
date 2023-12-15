import React from 'react';
import EventList from './eventList';

export default function Home() {
  return (
    <>
      <div className="container-fluid my-5">
        <div className="container">
          <div className="container-fluid">
            <h1>WACREN: Event Registration</h1>
            <p>
              Discover and Register for Open Events with WACREN! Explore our
              curated list of upcoming events and secure your spot today. Join a
              community of researchers, educators, and innovators pushing the
              boundaries of knowledge and collaboration in West and Central
              Africa.
            </p>
          </div>
          <div className="container-fluid">
            <EventList />
          </div>
        </div>
      </div>
    </>
  );
}
