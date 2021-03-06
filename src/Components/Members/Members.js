import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {ClipLoader} from 'react-spinners';
import {Link, Redirect} from 'react-router-dom';
import './members.css';

const Members = props => {
    const [users, setUsers] = useState([]);
    const [mappedUsers, setMappedUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);

    useEffect(() => {
        axios.get('/api/users')
            .then(res => {
                setUsers(res.data);
                setLoadingUsers(false);
            })
            .catch(err => alert(err));
    }, [])

    useEffect(() => {
        setMappedUsers(users.map((user, index) => (
            <Link to={{pathname: `/profile/${user.user_id}`}} key={index}>
                <div className='user-box' >
                    <section className='user-info'>
                        <img src={user.avatar} alt='user avatar' />
                        <h1>{user.name} </h1>
                    </section> 
                </div>
            </Link>
        )));
    }, [users]);

    return (
        <div>
            {props.auth.loggedIn === true
            ?<div className='member-view'>
                {loadingUsers !== true
                ? <div className='mapped-users'>
                    {mappedUsers}
                </div>
                : <ClipLoader 
                    className='loader' 
                    size={300}
                    color={'#ffffff'}
                    css={'position: absolute; left: 47%; top: 50%; transform: translate(-50%, -50%);'}/>
                }
                
            </div>
            :<div>
                <Redirect to='/' />
            </div>
            }
        </div>
        
    )
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}

export default connect(mapStateToProps)(Members);