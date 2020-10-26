import { PresignedPost } from 'aws-sdk/clients/s3';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import {changeNavColor, changeBtnColor, changeSideColor} from '../../redux/portfolioReducer';
import './portfolio.css'

const Portfolio = props => {
    useEffect(() => {
        props.changeNavColor('nav-bar-color-2');
        props.changeBtnColor('auth-btn-2');
        props.changeSideColor('side-profile-color-2');
    }, [])

    return (
        <div className='portfolio-page'>
            <div className='portfolio-view'>
                <h1 className='portfolio-header'>Cameron Kelly's Portfolio</h1>
                <h2>About Me</h2>
                <section className='about'>
                    <p>I am a scrawny city boy from Orem that has always dreamed big. I always thought "what if I did this" but never actually did anything besides dreaming. I've lived a good life. Not a luxurious life, nor an interesting life, just a good one.</p>
                    <p>I never really cared for going out and being adventurous. I tend to live out that desire through video games. Video games have been an import part of my life, they have and still take up a large portion of my free time. As I've grown though, I've realized that I can't just spend all my time playing Skyrim, or The Legend of Zelda, I have to do different things, work on different things. Recently I rediscovered my passion for development and now there's no way I don't pursue it. Lookout world, Cameron Kelly's gonna shake things up in this bitch!</p>
                    <title>My life so far</title>
                    <p>Born in Payson, Utah, I've spent my whole life living in Utah. Now you might think "So he's Mormon", and you're half right. I was born and raised in the Mormon church, I spent years doing all the things every kid growing up in the Mormon church: Boy Scouts, before they parted ways with it, weekly activities called mutual, and of course, attending church on Sundays.</p>
                    <p>I never really cared about any of that stuff at all. Growing up all I wanted to do was what any normal kid would want to do. Play with their friends, not have school, and just pretend you have no responsibilities. My free time was of course spent playing video games, with my brothers and my friends.</p>
                    <p>I didn't realize it until I was maybe 21 years old, at that point I had left the Mormon church and everything to do with it, but I realized that ever since I was a kid I never really believed what the Mormon church was telling me. Throughout all those years, all those Sundays, all those mutual activities, all those Boy Scouts activities, all the constant drilling of God is real, God loves you, God this, God that, be good and believe or you won't get into heaven. I honestly never truly believed any of it. It was all just background noise to me. I never wanted to do any of those things, I never wanted to go to church, I never wanted to go to mutual, I never wanted to go to Boy Scouts activities. It was all just what I was expected to do.</p>
                    <p>Now my mom, bless her heart. She had to put up with 6 boys all on her own after my parents got divorced. 6 rowdy boys. How we all ended up mostly normal and good people I'll never know. I lucked out to be honest, I am the youngest of the 6, and I'm the 5th one to leave the Mormon church. I can tell my mom isn't super happy about it, she's probably embarrassed that only 1 of her boys wanted to stay in the Mormon church. I've heard a lot of stories about religious parents ostracizing their kids when they leave whatever religion that they are a part of, and I think by some miracle, my mom just isn't like that. Would she love it if we were all Mormon with her, absolutely, but is she willing to accept that we all have our own lives and our own paths? Yes. So for the sake of her family, she puts family over religion, and I know quite a few people where that just isn't possible.</p>
                    <p>Would I say I'm lucky? Yeah absolutely. Do I feel unlucky sometimes? Of course I do. But when I think about what has happened in my life so far, I have to say, I lucked out pretty hard. Are there a lot of things I've never done or been apart of? Yeah, like, I've never been in a fist fight, I've never been further than Wyoming, I've never had a girlfriend (that one hurts the most), I've never played in a band even though I want too and it would be dope as hell, and I never got over my fear of amusement park rides.</p>
                    <p>But there are things I have done. I've climbed several mountains in my area, visited many National Parks, joined a raid static and became an epic gamer, made some amazing friends that do nothing but lift me up, and I hope I do the same for them, had an amazing time at a pizza restaurant as my first job, where I met some amazing people, I got to grow up knowing these incredible human beings. The greatest part about my life though? That would have to be that my family is still together, we all love each other, we accept each other and we always get together.</p>
                </section>
                <p className='tldr'>TLDR: My life has been pretty awesome so far.</p>
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