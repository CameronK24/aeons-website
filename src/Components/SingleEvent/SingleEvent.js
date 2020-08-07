import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {RingLoader} from 'react-spinners';
import {connect} from 'react-redux';
import './singleEvent.css';

const SingleEvent = props => {

    const [event, setEvent] = useState({});
    const [creator, setCreator] = useState({});
    const [time, setTime] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const {id} = props.match.params;
        axios.get(`/api/events/${id}`)
            .then(res => {
                setEvent(res.data[0]);   
                // setIsLoading(false);
            })
            .catch(err => alert(err));
    }, []);

    useEffect(() => {
        if (event.user_id) {
            const dateIndex = event.event_date.indexOf('T');
            const eventDate = event.event_date.slice(0, dateIndex);
            setTime(eventDate);
            axios.get(`/api/users/${event.user_id}`)
            .then(user => {
                setCreator(user.data[0]);
                setIsLoading(false);
            })
            .catch(err => alert(err));
        }      
    }, [event]);

    return (
        <div className='single-event-view'>
            {isLoading !== true
            ? 
                <div className='single-event-box'>
                    <section className='creator-title'>
                        <Link to={`/profile/${creator.user_id}`}><div className='creator-box'>
                            <img src={creator.avatar} alt='event creator' />
                            <h1>{creator.name}</h1>
                        </div></Link>
                        <h2>{event.event_title}</h2>
                    </section>
                    <section className='event-time'>
                        <h3>Event Time:</h3>
                        <p>{time}</p>
                        <p>{event.event_time}</p>
                        <p>{event.event_timezone}</p>
                    </section>
                    <section className='event-details-box' >
                        <h3>Event Details:</h3>
                        <p>{event.event_details}</p>
                    </section>
                    {creator.user_id === +props.user.userId
                    ?
                        <section className='edit-buttons'>
                            <button>Edit Event</button>
                            <button>Delete Event</button>
                        </section>
                    : null
                    }
                </div>
            : <RingLoader 
                size={300}
                color={'#ffffff'} 
                css={'position: absolute; left: 47%; top: 50%; transform: translate(-50%, -50%);'}/>
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