import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Switch, Redirect} from 'react-router-dom';
import './events.css';

const Events = props => {

    const createEvent = (userId) => {
        console.log(userId, title, date, time, tz, details);
        const body = {userId, title, date, time, tz, details};

        axios.post('/api/events', body)
            .then(() => {
                setRedirect(true);
                setTitle('');
                setDate('');
                setTime('');
                setTZ('');
                setDetails('');
            })
            .catch(err => alert(err));
    }
    
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [tz, setTZ] = useState('');
    const [details, setDetails] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [allowCreate, setAllowCreate] = useState(true);

    useEffect(() => {
        let d = new Date();
        let dISO = d.toISOString();
        let splitIndex = dISO.indexOf('T');
        setCurrentDate(dISO.slice(0, splitIndex));
    }, [])

    useEffect(() => {
        setRedirect(false);
    }, [redirect]);

    return (
        <Switch>
            <div className='events-page-view'>
                {props.location.pathname === '/events/new-event'
                ?
                    <div className='events-page-view'>
                        {redirect !== true
                        ?
                            <div className='new-event-page'>
                                <section className='title-section'>
                                    <h1>Event Title:</h1>
                                    <input maxLength='75' placeholder='Max 75 characters' onChange={e => setTitle(e.target.value)} value={title} />
                                </section>
                                <section className='date-section'>
                                    <h1>Event Date:</h1>
                                    <input type='date' min={currentDate} onChange={e => setDate(e.target.value)} value={date} />
                                </section>
                                <section className='time-section'>
                                    <h1>Event Time:</h1>
                                    <input className='time' type='time' onChange={e => setTime(e.target.value)} value={time} />
                                    <h1>Time Zone:</h1>
                                    <input className='time-zone' placeholder='Example: PST' onChange={e => setTZ(e.target.value)} value={tz} />
                                </section>
                                <section className='details-section'>
                                    <h1>Event Details:</h1>
                                    <textarea onChange={e => setDetails(e.target.value)} value={details} ></textarea>
                                </section>
                                <button className='submit-event-btn' disabled={allowCreate} onClick={() => createEvent(props.user.userId)}>Create Event</button>
                            </div>
                        : <Redirect to='/events' />
                        }
                    </div>
                : 
                    <div className='events-page'>
                        events
                    </div>
                }
            </div>
        </Switch>
    )
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(Events);