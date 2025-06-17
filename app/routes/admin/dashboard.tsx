import {Header, StatsCard, TripCard} from "../../../components";
import {useLoaderData} from "react-router";
import {clientLoader} from "~/loaders/clinetLoader";
import {
    Category,
    ChartComponent,
    ColumnSeries,
    Inject,
    SeriesCollectionDirective, SeriesDirective,
    SplineAreaSeries,
    Tooltip
} from "@syncfusion/ej2-react-charts";
import {DataLabel} from "@syncfusion/ej2-maps";
import {tripXAxis, tripyAxis, userXAxis, useryAxis} from "~/constants";
import {ColumnDirective, ColumnsDirective, GridComponent} from "@syncfusion/ej2-react-grids";
export {clientLoader}
const Dashboard = () => {
    const {currentUserData,dashboardStats,allTrips,
        userGrowth,
        tripsByTravelStyle,
        allUsers} = useLoaderData()

    const trips = allTrips.map((trip:any) => ({
        imageUrl: trip.imageUrls[0],
        name: trip.name,
        interest: trip.interests  ,
    }))

    const usersAndTrips = [
        {
            title: 'Latest user signups',
            dataSource: allUsers,
            field: 'count',
            headerText: 'Trips created'
        },
        {
            title: 'Trips based on interests',
            dataSource: trips,
            field: 'interest',
            headerText: 'Interests'
        }
    ]


    const {totalUsers,totalTrips,tripsCreated}=dashboardStats
    return (
        <main className='dashboard wrapper'>
            <Header  title={`Welcome ${currentUserData.name}👋`}  description='Track activity, trends and popular destinations in real time'/>
            <section className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    <StatsCard headerTitle="Total Users" total={totalUsers}
                               currentMonthCount={dashboardStats.usersJoined.currentMonth} lastMonthCount={dashboardStats.usersJoined.lastMonth}/>
                    <StatsCard headerTitle="Total Trips" total={totalTrips}
                               currentMonthCount={tripsCreated.currentMonth} lastMonthCount={tripsCreated.lastMonth}/>
                    <StatsCard headerTitle="Active Users" total={dashboardStats.userRole.total}
                               currentMonthCount={dashboardStats.userRole.currentMonth} lastMonthCount={dashboardStats.userRole.lastMonth}/>

                </div>
            </section>
            <section className="container flex">
                <h1 className="text-xl font-semibold text-dark-100">Created Trips</h1>
                <div className='trip-grid'>
                    {allTrips.map((trip:any) => (
                        <TripCard
                            key={trip.id}
                            id={trip.id.toString()}
                            name={trip.name!}
                            imageUrl={trip.imageUrls[0]}
                            location={trip.itinerary?.[0]?.location ?? ''}
                            tags={[trip.interests!, trip.travelStyle!]}
                            price={trip.estimatedPrice!}
                        />
                    ))}
                </div>
                </section>
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <ChartComponent
                    id="chart-1"
                    primaryXAxis={userXAxis}
                    primaryYAxis={useryAxis}
                    title="User Growth"
                    tooltip={{enable: true}}
                >
                    <Inject services={[ColumnSeries,SplineAreaSeries,Category,DataLabel,Tooltip]}/>
                    <SeriesCollectionDirective>
                        <SeriesDirective
                            dataSource={userGrowth}
                            xName="day"
                            yName="count"
                            type="Column"
                            name="Column"
                            columnWidth={0.3}
                            cornerRadius={{topLeft: 10, topRight: 10}}
                        />
                        <SeriesDirective
                            dataSource={userGrowth}
                            xName="day"
                            yName="count"
                            type="SplineArea"
                            name="Wave"
                            fill="rgba(71, 132, 238, 0.3)"
                            border={{ width: 2, color: '#4784EE'}}
                        />
                    </SeriesCollectionDirective>
                </ChartComponent>
                <ChartComponent
                    id="chart-2"
                    primaryXAxis={tripXAxis}
                    primaryYAxis={tripyAxis}
                    title="Trip Trends"
                    tooltip={{ enable: true}}
                >
                    <Inject services={[ColumnSeries, SplineAreaSeries, Category, DataLabel, Tooltip]} />

                    <SeriesCollectionDirective>
                        <SeriesDirective
                            dataSource={tripsByTravelStyle}
                            xName="travelStyle"
                            yName="count"
                            type="Column"
                            name="day"
                            columnWidth={0.3}
                            cornerRadius={{topLeft: 10, topRight: 10}}
                        />
                    </SeriesCollectionDirective>
                </ChartComponent>
            </section>
                <section className='user-trip wrapper'>
                    {usersAndTrips.map(({ title, dataSource, field, headerText}, i) => (
                        <div key={i} className="flex flex-col gap-5">
                            <h3 className="p-20-semibold text-dark-100">{title}</h3>

                            <GridComponent dataSource={dataSource} gridLines="None">
                                <ColumnsDirective>
                                    <ColumnDirective
                                        field="name"
                                        headerText="Name"
                                        width="200"
                                        textAlign="Left"
                                        template={(props: UserData) => (
                                            <div className="flex items-center gap-1.5 px-4">
                                                <img src={props.imageUrl} alt="user" className="rounded-full size-8 aspect-square" referrerPolicy="no-referrer" />
                                                <span>{props.name}</span>
                                            </div>
                                        )}
                                    />

                                    <ColumnDirective
                                        field={field}
                                        headerText={headerText}
                                        width="150"
                                        textAlign="Left"
                                    />
                                </ColumnsDirective>
                            </GridComponent>
                        </div>
                    ))}
                </section>

        </main>
    )
}

export default Dashboard
