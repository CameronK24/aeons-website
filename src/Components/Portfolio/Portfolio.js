import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {changeNavColor, changeBtnColor, changeSideColor, changeBackgroundImage} from '../../redux/portfolioReducer';
import background from '../../images/IMG_20190624_161724.jpg';
import picture1 from '../../images/PXL_20201005_224245401(1).jpg'
import picture2 from '../../images/IMG_20190706_212923.jpg'
import picture3 from '../../images/20190324_214840.jpg'
import picture4 from '../../images/PXL_20201206_050659626.jpg'
import picture5 from '../../images/IMG_20190929_164201.jpg'
import picture6 from '../../images/20160713_153255.jpg'
import picture7 from '../../images/20160622_194846.jpg'
import picture8 from '../../images/20150804_175548.jpg'
import './portfolio.css'

const Portfolio = props => {
    const [slideIndex, setSlideIndex] = useState(0);
    const [images, setImages] = useState([picture1, picture2, picture3, picture4, picture5, picture6, picture7, picture8]);
    const [navStyle, setNavStyle] = useState('portfolio-nav');
    const aboutRef = useRef();
    const skillsRef = useRef();
    const projectsRef = useRef();

    const next = async () => {
        let x = slideIndex + 1;
        setSlideIndex(x);
        if (slideIndex === (images.length - 1)) {
            setSlideIndex(0);
        }
    }

    const prev = async () => {
        let x = slideIndex - 1;
        setSlideIndex(x);
        if (slideIndex === 0) {
            setSlideIndex(images.length - 1);
        }
    }

    const dotSelect = async (n) => {
        setSlideIndex(n);
    }

    const refScroll = async (reference) => {
        if (reference.current) {
            reference.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }

    useEffect(() => {
        let dots = document.getElementsByClassName('dot');
        let slides = document.getElementsByClassName('my-slides');
        for (let x = 0; x < dots.length; x++) {
            dots[x].className = dots[x].className.replace(' active', '');
            slides[x].className = slides[x].className.replace(' active-slide', '');
        }
        slides[slideIndex].className += " active-slide";
        dots[slideIndex].className += " active";
    }, [slideIndex])

    useEffect(() => {
        props.changeNavColor('nav-bar-color-2');
        props.changeBtnColor('auth-btn-2');
        props.changeSideColor('side-profile-color-2');
        props.changeBackgroundImage(`url(${background})`);
    }, [])

    return (
        <div className='portfolio-page'>
            <div className='portfolio-view'>
                <section className='header-section'>
                    <h1 className='portfolio-header'>Cameron Kelly's Portfolio</h1>
                </section>

                <section className={navStyle}>
                    <h3 onClick={() => refScroll(aboutRef)}>About</h3>
                    <div></div>
                    <h3 onClick={() => refScroll(skillsRef)}>Skills</h3>
                    <div></div>
                    <h3 onClick={() => refScroll(projectsRef)}>Projects</h3>
                </section>
                
                <section className='main-portfolio'>
                    <h2 ref={aboutRef}>About Me</h2>
                    <section className='about'>
                        <div className='bio'>
                            <p>I was born and raised in Utah. I love Video Games, Hard Rock, Guitar, Driving, Biking, Hiking, and of course, Programming. I have an adorable old cat named Reeses that I love very much.</p>
                            <p>Development has been something I have wanted to fully dive into for over a decade. I took some classes in high school but never went anywhere with those. I had an IT job where I had to do some Web Development and I fell in love with it. Now I create awesome websites like this one.</p>
                            <div className='dank-links'>
                                <a href='https://www.linkedin.com/in/cameron-kelly-7b7232122/'>Linkedin</a>
                                <a href='https://docs.google.com/document/d/1V5lT5qvEd30ONHQgoBdKnYdPSXZPyNzkZ2jwrI268IU/edit?usp=sharing'>Resume</a>
                                <a href='https://github.com/CameronK24?tab=repositories'>Github</a>
                            </div>
                        </div>
                    </section>
                    <section className='slideshow'>
                        <div className='number-text'>{slideIndex + 1} / {images.length}</div>
                        <div className='my-slides fade'>
                            <img src={images[0]} />
                            <div className='caption'>Me on my deck</div>
                        </div>
                        <div className='my-slides fade'>
                            <img src={images[1]} />
                            <div className='caption'>My cat Reeses</div>
                        </div>
                        <div className='my-slides fade'>
                            <img src={images[2]} />
                            <div className='caption'>My ebony beauty</div>
                        </div>
                        <div className='my-slides fade'>
                            <img src={images[3]} />
                            <div className='caption'>Another of my kitty</div>
                        </div>
                        <div className='my-slides fade'>
                            <img src={images[4]} />
                            <div className='caption'>Manti-la Sal National Forest</div>
                        </div>
                        <div className='my-slides fade'>
                            <img src={images[5]} />
                            <div className='caption'>Cedar Breaks</div>
                        </div>
                        <div className='my-slides fade'>
                            <img src={images[6]} />
                            <div className='caption'>Utah Valley</div>
                        </div>
                        <div className='my-slides fade'>
                            <img src={images[7]} />
                            <div className='caption'>Arches National Park</div>
                        </div>
                        <a className='prev' onClick={prev}>&#10094;</a>
                        <a className='next' onClick={next}>&#10095;</a>
                        <section className='slide-dots'>
                            <span className='dot' onClick={() => dotSelect(0)}></span>
                            <span className='dot' onClick={() => dotSelect(1)}></span>
                            <span className='dot' onClick={() => dotSelect(2)}></span>
                            <span className='dot' onClick={() => dotSelect(3)}></span>
                            <span className='dot' onClick={() => dotSelect(4)}></span>
                            <span className='dot' onClick={() => dotSelect(5)}></span>
                            <span className='dot' onClick={() => dotSelect(6)}></span>
                            <span className='dot' onClick={() => dotSelect(7)}></span>
                        </section>
                    </section>
                    <h2 ref={skillsRef}>SKILLERINO'S</h2>
                    <section className='skills'>
                        <ul className='skill-section'> <p>THE BASICS</p>
                            <li>HTML</li>
                            <li>CSS</li>
                            <li>JAVASCRIPT</li>
                        </ul>
                        <ul className='skill-section'> <p>THE COOLER STUFF</p>
                            <li>REACT JS</li>
                            <li>NODE JS</li>
                            <li>EXPRESS JS</li>
                            <li>REACT NATIVE</li>
                            <li>BCRYPT JS</li>
                            <li>REACT REDUX</li>
                            <li>REACT HOOKS</li>
                            <li>SOCKET.IO</li>
                        </ul>
                        <ul className='skill-section'> <p>THE PEOPLE SKILLS</p>
                            <li>Communication</li>
                            <li>Team Work</li>
                            <li>I'm a super cool guy</li>
                            <li>Collaborative</li>
                            <li>I love to make people laugh</li>
                            <li>Customer Service</li>
                        </ul>
                    </section>
                    <h2 ref={projectsRef}>PROJECTS</h2>
                    <section className='projects'>
                        <div className='single-project'>
                            <a href='https://orderofbahamut.com/'>
                                <h3>Order of Bahamut</h3>
                            </a>
                            <iframe className='site-preview' src='https://orderofbahamut.com/'></iframe>
                            <p></p>
                        </div>
                        <div className='single-project'>
                            <a href='http://www.jam-sessions.live/'>
                                <h3>Jam Sessions</h3>
                            </a>
                            <iframe className='site-preview' src='http://www.jam-sessions.live/'></iframe>
                            <p></p>
                        </div>
                    </section>
                </section>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}

export default connect(mapStateToProps, {changeNavColor, changeBtnColor, changeSideColor, changeBackgroundImage})(Portfolio);