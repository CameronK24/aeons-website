import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {RingLoader} from 'react-spinners';
import './profile.css';

const Profile = props => {

    useEffect(() => {
        const {id} = props.match.params;
        axios.get(`/api/users/${id}`) 
            .then(res => {
                setUser(res.data[0]);
                setIsLoading(false);
            })
            .catch(err => alert(err));
    }, [props.match.params])

    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className='profile-view'>
            <div className='profile-box'>
                <h1>{user.name}</h1>
                {isLoading !== true
                ? <img src={user.portrait} alt='member portrait' />
                : <RingLoader
                    size={300}
                    color={'#ffffff'} 
                    css={'margin-right: 50px;'}/>
                }
            </div>
        </div>
    )
}

export default Profile;