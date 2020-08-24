import React, { useCallback, useState } from 'react';
import axios from 'axios';
import {useDropzone} from 'react-dropzone';
import {v4 as randomString} from 'uuid';
import {RingLoader} from 'react-spinners';
import {connect} from 'react-redux';
import {Switch, Redirect} from 'react-router-dom';
import './post.css';

const Post = props => {
    const onDrop = useCallback(acceptedFiles => {
        getSignedRequest(acceptedFiles);
    }, []);

    
    const getSignedRequest = ([file]) => {
        setIsUploading(true);
        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;
        axios
            .get('/api/sign-s3', {
                params: {
                    'file-name': fileName, 
                    'file-type': file.type
                }
            })
            .then(res => {
                const {signedRequest, url} = res.data;
                uploadFile(file, signedRequest, url);
            })
            .catch(err => {
                console.log(err)
                setIsUploading(false);
            });
    }

    const uploadFile = (file, signedRequest, url) => {
        const options = {
            headers: {
                'Content-Type': file.type
            }
        };

        axios
            .put(signedRequest, file, options)
            .then(() => {
                setIsUploading(false);
                setImage(url);
            })
            .catch(err => {
                setIsUploading(false);
                if (err.response.status === 403) {
                    alert(`Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check err.${err.stack}`);
                }
                else {
                    setIsUploading(false);
                    alert(`ERROR: ${err.status}\n ${err.stack}`);
                }
            })
    }

    const createPost = (userId) => {
        const body = {userId, title, image, content}

        axios.post('/api/posts', body)
            .then(res => {
                setRedirect(true);
            })
            .catch(err => alert(err));
    }

    const {getRootProps, getInputProps} = useDropzone({onDrop});
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [redirect, setRedirect] = useState(false);

    return (
        <Switch>
            {redirect !== true
            ? <div className='create-post-box'>
                <input className='title-box' placeholder='Title of post. 100 character limit' maxLength='100' value={title} onChange={e => setTitle(e.target.value)} />
                <img className='image-preview' src={image} alt='' />
                <div className='drop-box' {...getRootProps()}>
                    {isUploading
                    ? <RingLoader color={'#ffffff'} />
                    : <div className='drop-input'>
                        <input {...getInputProps()}/>
                        <p>Drag 'n' drop or click to upload an image.</p>
                    </div>
                    }
                </div>
                <textarea className='long-text-box' placeholder='Post text. 400 character limit' maxLength='400' value={content} onChange={e => setContent(e.target.value)} ></textarea>
                <button className='create-post-btn' onClick={() => createPost(props.user.userId)}>Post</button>
            </div>
            : <Redirect to='/home'/>
            }
            
        </Switch>
    )
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(Post);