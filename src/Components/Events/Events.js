import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Switch, Redirect, Link} from 'react-router-dom';
import {RingLoader} from 'react-spinners';
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
    
    const [events, setEvents] = useState([]);
    const [mappedEvents, setMappedEvents] = useState([]);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [tz, setTZ] = useState('');
    const [details, setDetails] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [currentEvent, setCurrentEvent] = useState(0);
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

    // useEffect(() => {
    //     const {index} = props.match.params;
    //     setCurrentEvent(index);
    //     console.log(index);
    // }, [props.match.params]);

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
                        <section>
                            <h2>{eventDate} {event.event_time} {event.event_timezone}</h2>
                        </section>
                        <p>Click to view Event Details</p>
                    </div>
                </Link>
            )
        }))
    }, [events])

    return (
        <Switch>
            {isLoading !== true
            ?
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
                            {mappedEvents}
                        </div>
                    }
                </div>
            : <RingLoader
                size={300}
                color={'#ffffff'} 
                css={'margin-left: 46%; margin-top: 25%; transform: translate(-50%, -50%)'} />
            }       
        </Switch>
    )
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(Events);