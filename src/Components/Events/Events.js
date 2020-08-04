import React, { useEffect } from 'react';
import './events.css';

const Events = props => {
    

    return (
        <div>
            {props.location.pathname === '/events/new-event'
            ?
                <div className='new-event-page'>
                    <section className='title-section'>
                        <h1>Event Title:</h1>
                        <input />
                    </section>
                    <section className='date-section'>
                        <h1>Event Date:</h1>
                        <input type='date' />
                    </section>
                    <section className='time-section'>
                        <h1>Event Time:</h1>
                        <input type='time' />
                    </section>
                    <section className='details-section'>
                        <h1>Event Details:</h1>
                        <textarea></textarea>
                    </section>
                </div>
            :
                <div className='events-page'>
                    events
                </div>
            }
        </div>
    )
}

export default Events;