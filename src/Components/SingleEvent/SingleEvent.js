import React, {useEffect, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import {RingLoader} from 'react-spinners';
import {connect} from 'react-redux';
import './singleEvent.css';

const SingleEvent = props => {

    const [event, setEvent] = useState({});
    const [creator, setCreator] = useState({});
    const [date, setDate] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [eventId, setEventId] = useState('')
    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');
    const [tz, setTZ] = useState('');
    const [details, setDetails] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentDate, setCurrentDate] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        let d = new Date();
        let dISO = d.toISOString();
        let splitIndex = dISO.indexOf('T');
        setCurrentDate(dISO.slice(0, splitIndex));
        const {id} = props.match.params;
        axios.get(`/api/events/${id}`)
            .then(res => {
                setEvent(res.data[0]);
            })
            .catch(err => alert(err));
    }, []);

    useEffect(() => {
        if (event.event_id) {
            const dateIndex = event.event_date.indexOf('T');
            const eventDate = event.event_date.slice(0, dateIndex);
            setDate(eventDate);
            setEventId(event.event_id);
            setTitle(event.event_title);
            setTime(event.event_time);
            setTZ(event.event_timezone);
            setDetails(event.event_details);
            axios.get(`/api/users/${event.user_id}`)
            .then(user => {
                setCreator(user.data[0]);
                setIsLoading(false);
            })
            .catch(err => alert(err));
        }      
    }, [event]);

    const updateEvent = () => {
        const body = {eventId, title, date, time, tz, details}

        axios.put('/api/events', body)
            .then(res => {
                setIsEditing(false);
            })
            .catch(err => alert(err));
    }

    const deleteEvent = () => {
        let confirmDelete = window.confirm('Are you sure you want to delete this event?');
        if (confirmDelete === true) {
            const id = event.event_id;
            console.log(id);
            axios.delete(`/api/events/${id}`)
                .then(() => {
                    setRedirect(true);
                })
                .catch(err => alert(err));
        }
        else {

        }
    }

    return (
        <div>
            {redirect !== true
            ? 
                <div className='single-event-view'>
                    {isLoading !== true
                    ? 
                        <div className='single-event-view'>
                            {isEditing !== true
                            ? 
                                <div className='single-event-box'>
                                    <section className='creator-title'>
                                        <Link to={`/profile/${creator.user_id}`}><div className='creator-box'>
                                            <img src={creator.avatar} alt='event creator' />
                                            <h1>{creator.name}</h1>
                                        </div></Link>
                                        <h2>{title}</h2>
                                    </section>
                                    <section className='event-time'>
                                        <h3>Event Time:</h3>
                                        <p>{date}</p>
                                        <p>{time}</p>
                                        <p>{tz}</p>
                                    </section>
                                    <section className='event-details-box' >
                                        <h3>Event Details:</h3>
                                        <p>{details}</p>
                                    </section>
                                    {creator.user_id === +props.user.userId
                                    ?
                                        <section className='edit-buttons'>
                                            <button onClick={() => setIsEditing(true)}>Edit Event</button>
                                            <button onClick={deleteEvent}>Delete Event</button>
                                        </section>
                                    : null
                                    }
                                </div>
                            : 
                            <div className='events-page-view-2'>
                                <div className='new-event-page-2'>
                                    <section className='text-fields-2'>
                                            <h1>Event Title:</h1>
                                            <h1>Event Date:</h1>
                                            <h1>Event Time:</h1>
                                            <h1>Event Details:</h1>
                                        </section>
                                        <section className='input-fields-2'>
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
                                            <section className='edit-buttons'>
                                                <button onClick={() => setIsEditing(false)}>Cancel</button>
                                                <button onClick={updateEvent}>Update</button>
                                            </section>
                                        </section>     
                                </div>
                            </div>
                            }
                            
                        </div>
                    : <RingLoader 
                        size={300}
                        color={'#ffffff'} 
                        css={'position: absolute; left: 47%; top: 50%; transform: translate(-50%, -50%);'}/>
                    }
                </div>
            : <Redirect to='/events' />
            }
        </div>
        
    )
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(SingleEvent);