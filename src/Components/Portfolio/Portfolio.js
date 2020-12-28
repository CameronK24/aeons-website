import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {changeNavColor, changeBtnColor, changeSideColor} from '../../redux/portfolioReducer';
import './portfolio.css'

const Portfolio = props => {
    const [slideIndex, setSlideIndex] = useState(1);
    const [slideDisplay, setSlideDisplay] = useState([{display: 'block'}, {display: 'none'}, {display: 'none'}]);

    const changeSlide = async (n) => {
        console.log(n)
        let x = slideIndex;
        x += n
        setSlideIndex(x);
        console.log(slideIndex);
        // showSlide(slideIndex);
    }

    const currentSlide = async (n) => {
        setSlideIndex(n);
        // showSlide(slideIndex);
    }

    useEffect(() => { 
        let i;
        let slides = document.getElementsByClassName("my-slides");
        let dots = document.getElementsByClassName("dot");
        let newArr = slideDisplay;
        if (slideIndex > slides.length) {
            setSlideIndex(0);
        }
        else if (slideIndex < 0) {
            setSlideIndex(slides.length - 1);
        }
        for (i = 0; i < slides.length; i++) {
            newArr[i] = {display: 'none'};
        }
        setSlideDisplay(newArr);
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        newArr[slideIndex] = {display: 'block'};
        setSlideDisplay(newArr);
        // setSlideDisplay[slideIndex - 1]({display: 'block'});
        // setSlideDisplay([slideIndex - 1] = {display: 'block'});
        console.log(slideIndex)
        console.log(slideIndex - 1);
        // console.log(dots);
        // console.log(slides);
        if (slideIndex < 1 || slideIndex > dots.length) {
            dots[0].className += " active";
        }
        else {
            dots[slideIndex - 1].className += " active";
        }
    }, [slideIndex]);

    useEffect(() => {
        props.changeNavColor('nav-bar-color-2');
        props.changeBtnColor('auth-btn-2');
        props.changeSideColor('side-profile-color-2');
    }, [])

    return (
        <div className='portfolio-page'>
            <div className='portfolio-view'>
                <section className='header-section'>
                    <h1 className='portfolio-header'>Cameron Kelly's Portfolio</h1>
                </section>
                
                <section className='main-portfolio'>
                    <h2>About Me</h2>
                    <section className='about'>
                        <div className='bio'>
                            <p>I was born and raised in Utah. I love Video Games, Hard Rock, Guitar, Driving, Biking, Hiking, and of course, programming. I have an adorable old cat named Reeses that I love very much.</p>
                            <p>Development has been something I have wanted to fully dive into for over a decade. I took some classes in high school but never went anywhere with those. I had an IT job where I had to do some Web Development and I fell in love with it. Now I create awesome websites like this one.</p>
                        </div>
                    </section>
                    <section className='slideshow pictures'>
                        <div className='my-slides fade' style={slideDisplay[0]}>
                            <div className='number-text'>1 / 3</div>
                            <img src='https://lh3.googleusercontent.com/pw/ACtC-3dqp3TVMFo-HSMdY3aXUiuDa6wpEFAxyy4E9qokjLuuWiuPeIrjDtrNPL40ABMp-8a7AKlX1EyOdmDDuKAZKlJLgnPptZq9yZqA4WfCAJsB_bSdoTXuWn92PC6wHKAkc440lYDbAJcfL95rATSzgpl_=w702-h936-no?authuser=0' />
                            <div className='caption'>Caption Text</div>
                        </div>
                        <div className='my-slides fade' style={slideDisplay[1]}>
                            <div className='number-text'>2 / 3</div>
                            <img src='https://lh3.googleusercontent.com/FaEoaKIPxle6BeoJHZWdTWkwtmnvdLtpvLCdE80MIIBYJi6T5nhghx3HHykLwmDTC0_4K2-wupqvHpU4RuRwc3vU1HealtFMjAgBbGRInWX7JFkoUNKZzBNtER2aXEKtVvYa5jln68gBtCQvWCS5s15KepQ22ROvZudWVqcbEGIHPkNiL5vOHko2Ov6laMlkeGrAfUENuO4gLnYx_zbViKvKaychVOi7LIHHCsmTwxXgYYaPTtm6wnnC5NgZnfPMIMwz5B9ZvD7Fs1L1czSEFvLhUqNzkdTYHSfJYlkIjS0mQASBopQXGGPM-AQomLcxuILHrDZfVoprueqKbNWEbbIgRnfvUKf1-3UaQyR2w84ciCNM0n10J-OVscmcY-IybQqnLPsE9CQhqJC_WelW95tsjou9tjUR2ZVSZj0ndyZWF_RhOwRTdk7pk92dEUhyJwzFLA86i4JygCF_qg64JFaXIAtNVe6Fcl6ma19eRywqoc83BCkmUQofq7RqU_Vwx0PkZ_ZwbQ9_aUJKh4hivgjAOZGt6nYl708Hu6keFHcOHdu2XPq0glBW63_wqotAOhQIQlmWr4scesAXZv0IY4OnjUuBrysYd4fQNB6slo2TqDLV9yzFtypaMXzEzI5JP58oOysTs-0EU586sfF_EkkXeGysmZyXPF1tH-juuhmt-ZTBRjkJmxgaetc7=w702-h936-no?authuser=0' />
                            <div className='caption'>Caption Text 2</div>
                        </div>
                        <div className='my-slides fade' style={slideDisplay[2]}>
                            <div className='number-text'>3 / 3</div>
                            <img src='https://lh3.googleusercontent.com/KDyE2n__IZwo8uS7lZJrXrJvny8GieaNMDdWPZsg3GKVDN_KgZP64gqaY8yZtQAfcaiJOd7OZDfDUCXkJAEHYqOm_6VnmgulX0ST5-8UrwSI4_OrVPbi0XtyTf86SdhE8xwfyYBv-0UtG1cZX_y9NSBbjR20dr6wfn4dc_GvAn_OsOp2eaxYsLGR-hbeK3VBHBrvevsCC3L_ZNWiKzqbNx7-nxWL2d65jtB-8xbreLUHSgEaROj4JQjTAPkO6T7ZPislLfHkzsHDTUr20IU6IKvBQF8T1rX6_V4Sq0LoJ-wDHCvpLYjpoqSnnSCd6qU3lLIi9SuYtsw5nQ4s7684LmtobGEYWngOlm8g2lEzljbrlWXLWO4AfvAzd9LwQnQmhOyjY3CmrgLGeZzQ34eeGCHO-BaEfEc3F9Y21_yzlzZtr887AUc0bEBtrSUzhv6snzsUrurkdMu3a3S9Rt2txF0Ar04Mf56mSmIBXLTN_RsM_XkYUL4DMUWUhXCaXGG6shclT-b1LN6jZiXVRYZk_qPaE5KE3v16o16vFGQ_N-R2jc-9MJ6M9yG2mP1BZw2tJ-s6sNsYjIsaP52JPgcdchuuTGv62kUyE5NkDOHMguM2Ad7pQEIZrzHDG112s2LFFk21L_kfoxvx8uNSLj4BGh-ilidUXSRJ-Ftr2Jjr1tNmOU4zdsSBz0OISld5=w702-h936-no?authuser=0' />
                            <div className='caption'>Caption Text 3</div>
                        </div>
                        <a className='prev' onClick={() => changeSlide(-1)}>&#10094;</a>
                        <a className='next' onClick={() => changeSlide(1)}>&#10095;</a>
                    </section>
                    <section className='slide-dots'>
                        <span className='dot' onClick={() => currentSlide(1)}></span>
                        <span className='dot' onClick={() => currentSlide(2)}></span>
                        <span className='dot' onClick={() => currentSlide(3)}></span>
                    </section>
                    <h2>SKILLERINO'S</h2>
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
                            <li>I'm a cool ass guy</li>
                            <li>Collaborative</li>
                            <li>I love to make people laugh</li>
                            <li>Customer Service</li>
                        </ul>
                    </section>
                    <h2>PROJECTS</h2>
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

export default connect(mapStateToProps, {changeNavColor, changeBtnColor, changeSideColor})(Portfolio);