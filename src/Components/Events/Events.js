import React, { useState } from 'react';
import './events.css';

const Events = props => {
    
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [tz, setTZ] = useState('');
    const [details, setDetails] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    return (
        <div className='events-page-view'>
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
                        <input className='time' type='time' />
                        <h1>Time Zone:</h1>
                        <input className='time-zone' placeholder='Example: PST' />
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