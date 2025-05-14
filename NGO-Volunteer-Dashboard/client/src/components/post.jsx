import React from 'react'
import Header from '../pages/Header'
import JobForm from './JobForm'

const posts = () => {
    return (
        <div className="flex flex-col">
            <Header />
            <h2 className="flex-1 pt-8 mx-auto w-[90%] text-3xl font-bold tet-black">
                Create a Job Post
            </h2>

            <div className="flex pt-8 w-[90%] mx-auto justify-center items-center">
                <JobForm />
            </div>
        </div>
    )
}

export default posts
