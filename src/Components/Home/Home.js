import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {changeNavColor, changeBtnColor, changeSideColor} from '../../redux/portfolioReducer';
import {ClipLoader} from 'react-spinners';
import {Link} from 'react-router-dom';
import './home.css';

const Home = props => {

    const [posts, setPosts] = useState([]);
    const [mappedPosts, setMappedPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(true);

    useEffect(() => {    
        axios.get('/api/posts')
            .then(res => {
                setPosts(res.data);
                setLoadingPosts(false);
            })
            .catch(err => alert(err));
        props.changeNavColor('nav-bar-color-1');
        props.changeBtnColor('auth-btn');
        props.changeSideColor('side-profile-color-1');
    }, [])

    useEffect(() => {
        setMappedPosts(posts.map((post, index) => (
            <div className='post-box' key={index}>
                <time className='timestamp'>{post.post_date}</time>
                <section className='author-title'>
                    <Link to={`/profile/${post.user_id}`}><div className='author-box'>
                        <img src={post.avatar} alt='user avatar' />
                        <h1>{post.name} </h1>
                    </div></Link>
                    <h2>{post.post_title}</h2>
                </section>
                {post.post_image
                ? <a target='_blank' rel='noopener noreferrer' href={post.post_image}><img className='content-image' src={post.post_image} alt='' /></a>
                : null
                }
                <p>{post.post_content}</p>
            </div>
        )));
    }, [posts]);

    return (
        <div className='home-view'>
            {loadingPosts !== true
            ? <div className='mapped-posts'>
                {mappedPosts}
            </div>
            : <ClipLoader 
                className='loader' 
                size={300}
                color={'#ffffff'}
                css={'position: absolute; left: 47%; top: 50%; transform: translate(-50%, -50%);'}/>
            }
            
        </div>
    )
}

export default connect(null, {changeNavColor, changeBtnColor, changeSideColor})(Home);