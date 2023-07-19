import React from 'react'

import { Footer, Navbar, Notifications, VideoPlayer, Wrapper } from "../Components/Index"

export default function MainLayout() {
    return (
        <div className='relative z-10 min-h-screen flex justify-between items-center flex-col max-w-7xl mx-auto sm:px-16 px-6'>
            <Navbar />
            <VideoPlayer />
            <Wrapper>
                <Notifications />
            </Wrapper>
            <Footer />
        </div>
    )
}
