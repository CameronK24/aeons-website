import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Switch, Redirect, Link} from 'react-router-dom';
import {ClipLoader} from 'react-spinners';
import './events.css';

const Events = props => {

    const createEvent = (userId) => {
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
    
    const [events, setEvents] = useState([]);
    const [mappedEvents, setMappedEvents] = useState([]);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [tz, setTZ] = useState('');
    const [details, setDetails] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [allowCreate, setAllowCreate] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (props.location.pathname === '/events/new-event') {
            let d = new Date();
            let dISO = d.toISOString();
            let splitIndex = dISO.indexOf('T');
            setCurrentDate(dISO.slice(0, splitIndex));
            setIsLoading(false);
        }
        else if (props.location.pathname === '/events') {
            setIsLoading(true);
            axios.get('/api/events')
                .then(res => {
                    setEvents(res.data);
                    setIsLoading(false);
                })
                .catch(err => alert(err));
        }
        
    }, [props.location.pathname]);

    useEffect(() => {
        setRedirect(false);
    }, [redirect]);

    useEffect(() => {
        if (title && date && time && tz && details) {
            setAllowCreate(false);
        }
    }, [title, date, time, tz, details]);

    useEffect(() => {
        setMappedEvents(events.map((event, index) => {
            const dateIndex = event.event_date.indexOf('T');
            const eventDate = event.event_date.slice(0, dateIndex);
            return (
                <Link to={`/event/${event.event_id}`} key={index}  >
                    <div className='event-box'>
                        <h1>{event.event_title}</h1>
                        <section className='event-box-time'>
                            <h2>{eventDate} </h2>
                            <h2>{event.event_time} {event.event_timezone}</h2>
                        </section>
                        <p>Click to view Event Details</p>
                    </div>
                </Link>
            )
        }))
    }, [events])

    return (
        <div>
            {props.auth.loggedIn === true
            ?
                <Switch>
                    {isLoading !== true
                    ?
                        <div className='events-page-view'>
                            {props.location.pathname === '/events/new-event'
                            ?
                                <div className='events-page-view'>
                                    {redirect !== true
                                    ?
                                        <div className='events-page-view-inner'>
                                            <div className='new-event-page'>
                                                <section className='text-fields'>
                                                    <h1>Event Title:</h1>
                                                    <h1>Event Date:</h1>
                                                    <h1>Event Time:</h1>
                                                    <h1>Event Details:</h1>
                                                </section>
                                                <section className='input-fields'>
                                                    <input maxLength='75' placeholder='Max 75 characters' onChange={e => setTitle(e.target.value)} value={title} />
                                                    <input type='date' min={currentDate} onChange={e => setDate(e.target.value)} value={date} />
                                                    <section className='time-section'>
                                                        <input className='time' type='time' onChange={e => setTime(e.target.value)} value={time} />
                                                        <h1 className='time-zone-text'>Time Zone:</h1>
                                                        <div>
                                                            <h1 className='tz'>TZ:</h1>
                                                            <input className='time-zone' placeholder='Example: PST' onChange={e => setTZ(e.target.value)} value={tz} />
                                                        </div>
                                                    </section>
                                                    <textarea onChange={e => setDetails(e.target.value)} value={details} ></textarea>
                                                </section>
                                            </div>
                                            <button className='submit-event-btn' disabled={allowCreate} onClick={() => createEvent(props.user.userId)}>Create Event</button>
                                        </div>
                                    : <Redirect to='/events' />
                                    }
                                </div>
                            : 
                                <div className='events-page'>                          
                                    {mappedEvents}
                                </div>
                            }
                        </div>
                    : <ClipLoader
                        size={200}
                        color={'#ffffff'} 
                        css={'position: static; margin-left: 50%; margin-top: 25%; transform: translate(-50%, -50%)'} />
                    }       
                </Switch>
            : <Redirect to='/'/>
            }
        </div>
        
    )
}

function mapStateToProps(state) {
    return {
        user: state.user,
        auth: state.auth
    };
}

export default connect(mapStateToProps)(Events);