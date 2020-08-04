import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {RingLoader} from 'react-spinners';
import './home.css';

const Home = () => {

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
    }, [])

    useEffect(() => {
        setMappedPosts(posts.map((post, index) => (
            <div className='post-box' key={index}>
                <time className='timestamp'>{post.post_date}</time>
                <section className='author-title'>
                    <div className='author-box'>
                        <img src={post.avatar} alt='user avatar' />
                        <h1>{post.name} </h1>
                    </div>
                    <h2>{post.post_title}</h2>
                </section>
                <img className='content-image' src={post.post_image} alt='post picture' />
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
            : <RingLoader 
                className='loader' 
                size={300}
                color={'#ffffff'}
                css={'position: absolute; left: 47%; top: 50%; transform: translate(-50%, -50%);'}/>
            }
            
        </div>
    )
}

export default Home;