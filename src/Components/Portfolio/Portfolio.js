import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {changeNavColor, changeBtnColor, changeSideColor, changeBackgroundImage} from '../../redux/portfolioReducer';
import './portfolio.css'

const Portfolio = props => {
    const [slideIndex, setSlideIndex] = useState(0);
    const [images, setImages] = useState(['https://lh3.googleusercontent.com/pw/ACtC-3dqp3TVMFo-HSMdY3aXUiuDa6wpEFAxyy4E9qokjLuuWiuPeIrjDtrNPL40ABMp-8a7AKlX1EyOdmDDuKAZKlJLgnPptZq9yZqA4WfCAJsB_bSdoTXuWn92PC6wHKAkc440lYDbAJcfL95rATSzgpl_=w702-h936-no?authuser=0', 'https://lh3.googleusercontent.com/FaEoaKIPxle6BeoJHZWdTWkwtmnvdLtpvLCdE80MIIBYJi6T5nhghx3HHykLwmDTC0_4K2-wupqvHpU4RuRwc3vU1HealtFMjAgBbGRInWX7JFkoUNKZzBNtER2aXEKtVvYa5jln68gBtCQvWCS5s15KepQ22ROvZudWVqcbEGIHPkNiL5vOHko2Ov6laMlkeGrAfUENuO4gLnYx_zbViKvKaychVOi7LIHHCsmTwxXgYYaPTtm6wnnC5NgZnfPMIMwz5B9ZvD7Fs1L1czSEFvLhUqNzkdTYHSfJYlkIjS0mQASBopQXGGPM-AQomLcxuILHrDZfVoprueqKbNWEbbIgRnfvUKf1-3UaQyR2w84ciCNM0n10J-OVscmcY-IybQqnLPsE9CQhqJC_WelW95tsjou9tjUR2ZVSZj0ndyZWF_RhOwRTdk7pk92dEUhyJwzFLA86i4JygCF_qg64JFaXIAtNVe6Fcl6ma19eRywqoc83BCkmUQofq7RqU_Vwx0PkZ_ZwbQ9_aUJKh4hivgjAOZGt6nYl708Hu6keFHcOHdu2XPq0glBW63_wqotAOhQIQlmWr4scesAXZv0IY4OnjUuBrysYd4fQNB6slo2TqDLV9yzFtypaMXzEzI5JP58oOysTs-0EU586sfF_EkkXeGysmZyXPF1tH-juuhmt-ZTBRjkJmxgaetc7=w702-h936-no?authuser=0', 'https://lh3.googleusercontent.com/KDyE2n__IZwo8uS7lZJrXrJvny8GieaNMDdWPZsg3GKVDN_KgZP64gqaY8yZtQAfcaiJOd7OZDfDUCXkJAEHYqOm_6VnmgulX0ST5-8UrwSI4_OrVPbi0XtyTf86SdhE8xwfyYBv-0UtG1cZX_y9NSBbjR20dr6wfn4dc_GvAn_OsOp2eaxYsLGR-hbeK3VBHBrvevsCC3L_ZNWiKzqbNx7-nxWL2d65jtB-8xbreLUHSgEaROj4JQjTAPkO6T7ZPislLfHkzsHDTUr20IU6IKvBQF8T1rX6_V4Sq0LoJ-wDHCvpLYjpoqSnnSCd6qU3lLIi9SuYtsw5nQ4s7684LmtobGEYWngOlm8g2lEzljbrlWXLWO4AfvAzd9LwQnQmhOyjY3CmrgLGeZzQ34eeGCHO-BaEfEc3F9Y21_yzlzZtr887AUc0bEBtrSUzhv6snzsUrurkdMu3a3S9Rt2txF0Ar04Mf56mSmIBXLTN_RsM_XkYUL4DMUWUhXCaXGG6shclT-b1LN6jZiXVRYZk_qPaE5KE3v16o16vFGQ_N-R2jc-9MJ6M9yG2mP1BZw2tJ-s6sNsYjIsaP52JPgcdchuuTGv62kUyE5NkDOHMguM2Ad7pQEIZrzHDG112s2LFFk21L_kfoxvx8uNSLj4BGh-ilidUXSRJ-Ftr2Jjr1tNmOU4zdsSBz0OISld5=w702-h936-no?authuser=0', 'https://lh3.googleusercontent.com/eTLpcIIrjqB26c3I1kheCJOV9BmSOrublPaPHnMIxtKnG2mOc7gX-Z9ynfrCexv2QRFeLupkO106tgWVl97Q7-BDrzqBRjH6yYs-lCV3_CHJaayhwJw51ERTrmYm2xNrBNWrmKu8YAenf6Z5M4t8Wz0u_17XZ4vwU-KT2mgzG-KZjAWRwrBzhWc6chVv_Tl4qSS4S3lQeNV-OaKi_STfLQlRZZJdMWUHwItepB2-Q5Iav932UUgVnrYECa0KzZgAsMo66BdhIsLd05O1Vj9Rb2-MUBHN-K2cYPxe9m0R6t1Xq6IpJpAVHLwwApEUlEZbqLtNw7B7atLFKYCdk8DYynZJdk0SRmz9qRmeRPSu1Shu-H_AlQTEWEQVIHl4s4009GVm_kHweyW9fXFuhaO9eoMvlGDImwdnLKFctH7uthuFvjUQBWpQiGWAob60c3b74azAvX8UBZwt3LGLjo4njUlkKUOuuClyocC4Cu2bkFgooK0ROaMt2pNiDD-86cvOKr-UwmNf9FxJBqyUVVPEJuRsDmHx7XfZR9virTSBv8c-KwKJ-i00EkLsMKiYkbfi-xu-HJKvRnG-o8k6AootGoVu0nGgAltlXL2w2gcu9_UwJELeRUTIg-HhZGQPHoH-Szge5gJeCGc0M9SiptzlxG_eekoLPSwIO32_anAS2SiK3eOxmxMJyMKTwpMn=w1248-h936-no?authuser=0', 'https://lh3.googleusercontent.com/Jh4IBeUSGn2t49CmstTe97bXWK6uX-9PHuKMNVJRiNBXFKReFgI2JinvNwSAh35NbR1M3OIpa5B4QLXubSyz0wR3ViIfxA2Y7Hn788rpy-bEYhAxrcjMarawQ_JSfqmgkaJeUMdroWvv79dmTYVkH7R0HbuGTsjQU9Mhdh3OwCHbo7GQesMJnD-EK5_6kzONGmt-vH92A3ct59-K09xwfZHSDI2J586BDwf70D4Ik2FhSN7V0VL-7uQ1ZwGqhvjhY_NK9QEj7Sk_bVATAWqKB0Ek4ZUVWKB77EGmjxSwVmQ1_yHoZNccPiJmTyrpfkHVCShb4x727RVeCG4ofHbTy-tZQCxGvuhwlkmydXlgRYqza0fStXW9-0XmQVkJcAGQdkTkZKtMycg37hkeIjJC-Kvq-otxfvDVmWDmHEDrYO49oOEocgA2iF5aWjs9stGee0XhjXOeAjNXV143sPj7y-TTU9BEAuVuJMnteT1aN4hb2WAihroxkTgzwhsOh_Yc1HgV_F75wZulO-5o-UMwPo4R6Qwmfgc2-Xce5pONLdphAim7CEoPruVAQT1Y-P_x8VEHmr0AQeh6riFL8O2zi3Lh3zkJC71Y-T41-dEocCJZLzbEk9LiSmEHGGZZ3gra7fMoVZQLyigOoFH4R-Zj3tBdoT9r0FYcB_HNzVKqgFQMLFKLVt7iiNFc4z_F=w1248-h936-no?authuser=0', 'https://lh3.googleusercontent.com/XlbpMgh_H5dZRaIOQancnOaVWdJprB7yVXHdSEvPcLuZQsoGBeENRIX1hNk3ySwal0QCRWkI7BSl3ht0VIROJ7qawagbmFZavG4v1xBRiWPXTu7a00mUQBBxMBeH4RdF1-IsRdVctUOkxTonZCYfcz5dbAiXPAn3y2wBUuCzZ_l0q-2S2e5_TGJ0hM8rPPnfOx_RIL1s5L9PRC-fxB_sryVgZgf0tklNpzCNvKj73Nav12oKWm98iFnh_KWj3_dK9OgIi5jj4CzbkhXlGTjjLb8CUCQ2oVQW9OdplZ2GpOZYR9D3s_HJWOVZl03rTdRl-2eU8MVqLgjO0bjQwDE8a2gjhocxiMsUfk_nG5udk74qAL-iOvMyVDD4sq0O-GiA70s4j5ElItlJ03Udwo-2QtlgoXklqeHXYtZQPUTeD2QFshjfuFH4bt58mUK1vs66Vtu0_DXPr6G0G4DlQMNslbhUC2Uymlr5GJPLF328NjqzC_c5c8EnYEpwLGDXA5DHUYx6qFo1O2K807jOAxjyaYftTLW318XCSHIpt8ipdfubSnXHL2YmoL0W2VTasnuuJmlBUR40yFiO_ov_rurIAMC2hHW3GYESZrw1rbHbgN-TjX4Xad1CJZtb1zSjlP3EUdLDRGKECLGvxLHoyiFYMDgGV6iW0qf8UtrpcnD-MRwQxXa1LT3y07GeAHbe=w1664-h936-no?authuser=0', 'https://lh3.googleusercontent.com/WMTgz7KLzgdTnN3CnEvWoYS9xe61UvE2jP4BU7JwhnJc66JiLigZDHk45dzV53MHe68Qxh0lPu_YUgUFP4865NBBeD7Cne7YrNW7ws3CDDfMW3P22d4D-LbHyMUT4iwUHVvCnAGU1Gtii1t8-yKWaV8b21rDqcpHXSh9qT6Zd3nV-K6nQxM-K9ERa_iL3KEbwTpr6N0oVTnWVBkXylOMIVFs5leQb70Rsp576TjVlSA96551rPCGpPEVfb6CjXuJHRXTbNJLRs_jIeHShyB3i1PiYfcyOSn4EtyaoFcl9ftf9xX8rWta-IMqeIJE6lDNGnycJKbvmNqjezABaMqCbsgwLpxS_ZTHN2xgmWC8Z2GL06ArJmAeK5V36ggZ1eY4mE3pY3LbzJRa6XKB3pX_Mbzru8-hiQMhBKRKbpC6_iNpPXn7jxpZ2GNvla9euk6zfYxyc8kdezlsehAsCB9F8dOBLJI-nvOak_ruuV5Iml042q5UcB0JXO-65MoQhSUN0cJEtCfkA5y96uFQMr1uv_nkKHsQU9NMh6BM92Gyf8hrB_215BpcAa4J86VMl537xgM9eM0DlO1SJcGkQh7ilTtiHBEIp1f6se47WCQZYkHGxcTOuwgx9J0milt92_YwGk8I13JQv7n8BEJX3nQ1vml_GDDZ3-PG5s68wPLyoq5JzzWd81BW5NR22z8y=w1664-h936-no?authuser=0', 'https://lh3.googleusercontent.com/JNQkIDd5s8nvfWPVk7eaoaOCGad6ffVyhQRRdSfP6VAGgFfndMaBKdJM8HLNLQOU5jSTTJ0oSNWcatKdEtCGSc5BFF3nRFTVNTJUn49kes5PpcaZQBwB1q9-RDnrwFZEqsz29t4Sp5E0Kd7IVJsFwkWH0TmroQDyspFC5jCQf0xYlsb98Xj8rZ1b8TMgLmyfbKNmp-P-S3Cmfxw9TxUKwT2kuHvO_1uxcPl_2NBGduKAcZ7Kxw957GmtOfs-5kQ_ZbGOw-XVP2GcluCpH4d03dqvy7RQVZi9n1_y7GXDrtfIzMHNORBN2sQjOV3CFG2nIgzCj_Il9TsZOdaSeLjq0mSFXcEnyI4B8Reg_cxDwTJyyL0hblRn4TzhXWLZfcxazeBjYla_qOjXccEkK-uKdgs3rmqc88ViSd-U3Hvk5sLCWsSX5e7a1od1ICXd9KKlUVx0jZKrJqS9Kh3BTDi6-lRkiOYNaRPGQHO8SBY_AprQNkweexrOh0SJ2myPQzOwlhCs0RLGqfVov8c9jYLMv8n_EI2dv_8Pykv_nu_Vpq52RV3DHN93CPwU4RdaLIphg7V76Gr_SB4fIDdt6Jo9HosMeQ5f45evcA1yBdHCnebc5i-UvhbwYfHX5GXeL2jKwVl6VT7ZfKB8P7rjEv3KigJLHMJvc-GuQYi1NzWmj1sONeakQQ0TSrzAE-BI=w1664-h936-no?authuser=0']);
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
        if (window.scrollX === 200) {
            console.log('peepee');
            console.log(aboutRef.current);
        }
    })

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
        props.changeBackgroundImage("url('https://lh3.googleusercontent.com/9WpnICxB4JTooQlEzquyAcH8JAkbdSRjskqO6i2t7O5yLj2jcOEtC7eNB3DqGZAGaoZ9shzE-ckxDl-KoXNDhhnIK4rbyC3QEWu4oC--N7GxxmTxbaJxQcRYjjBHRGB3SJF74jj2bP8gKWPTaIJBETlS4MMbyn0AZtroQ0BVqHASI-scmhSXguTMN7RIztrqcz601vUGAFmY9LBUcA1w3OPJcAiOhSdSPQ0xO47Ek24GxG9RdT2e7YED0B383TXJ8FMVkz1aN3OAdB677zsMxejRlKIIumY1B0j5sQfbsg8XxnM8HdVlNNbdCWRmZ4vSDBKiU0wDR3TZX9Fxx38oH_b_WPqMm7gglhEhPUHVlptW_l0dd_yuyuDEXVCwUdfPyd-t07il6ULlvKyzKzujwB9dinmlO8caQzdFEIrkeruKcOEDoOdxwm28hnOhAf8NQoNuJSfQlneaxBjQa6U8Jsg51VpftibnLGiSZ7JbZttHQu-uyXrIOOdlkWXU6sVDRJZNAU-CYZShBclJ7YgozYTBdOijIDppPDqZDTVziKhZBKoK4WTbX2hFbTD26GH2ROGRkc6GgZXNCJUHBdn7f-wvuR07wFRj2tGcEM-L4TfKx5xGxolS_CwWwav7XKUwlrih0Ds8lGuE0__WYf7ROdKHV2ft0k8iANhzgFKC7sEPLevdzgHIfqMc4Xht=w1248-h936-no?authuser=0')")
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
                    <h2>About Me</h2>
                    <section ref={aboutRef} className='about'>
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
                    <section className='slideshow pictures'>
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
                    <h2>SKILLERINO'S</h2>
                    <section ref={skillsRef} className='skills'>
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
                    <h2>PROJECTS</h2>
                    <section ref={projectsRef} className='projects'>
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