import React from 'react'
import {Header} from "../../../components";

const Trips = () => {
    return (
        <main className="all-users wrapper">
            <Header
                title="Manage Users"
                description="View and edit AI-generated travel plans"
                ctaText="Create Trip"
                ctaUrl="/admin/create-trip"
            />
        </main>
    )
}
export default Trips
