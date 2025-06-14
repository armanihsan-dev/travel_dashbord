import {Header, StatsCard, TripCard} from "../../../components";
import {allTrips, dashboardStats} from "~/constants";
import {useLoaderData} from "react-router";
import {clientLoader} from "~/loaders/clinetLoader";

export async function loader() {
    throw new Error("some error thrown in a loader");
}


const Dashboard = () => {
    const user = useLoaderData()
    const {totalUser, usersJoined, totalTrips, tripsCreated, userRole} = dashboardStats
    return (
        <main className='dashboard wrapper'>
            <Header  title={`Welcome ${user.name} 👋`}  description='Track activity, trends and popular destinations in real time'/>
            <section className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    <StatsCard headerTitle="Total Users" total={totalUser}
                               currentMonthCount={usersJoined.currentMonth} lastMonthCount={usersJoined.lastMonth}/>
                    <StatsCard headerTitle="Total Trips" total={totalTrips}
                               currentMonthCount={tripsCreated.currentMonth} lastMonthCount={tripsCreated.lastMonth}/>
                    <StatsCard headerTitle="User Role" total={userRole.total}
                               currentMonthCount={userRole.currentMonth} lastMonthCount={userRole.lastMonth}/>

                </div>
            </section>
            <section className="container flex">
                <h1 className="text-xl font-semibold text-dark-100">Created Trips</h1>
                <div className='trip-grid'>
                    {allTrips.slice(0,4).map(({id,name,imageUrls,itinerary,tags,estimatedPrice})=>(
                        <TripCard key={id} id={id.toString()} name={name} imageUrl={imageUrls[0]}
                                  location={itinerary?.[0].location ?? ''} price={estimatedPrice} tags={tags}/>
                    ))}
                </div>
                </section>
        </main>
    )
}
export {clientLoader}
export default Dashboard
