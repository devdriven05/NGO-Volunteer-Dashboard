import React from 'react'

const Footeer = () => {
    return (
        <footer className="py-12 bg-white">
            <div className="mx-auto px-4 text-center text-black">
                <p>&copy; {new Date().getFullYear()} VolunteerHub All rights reserved.</p>
            </div>
        </footer>

    )
}

export default Footeer
