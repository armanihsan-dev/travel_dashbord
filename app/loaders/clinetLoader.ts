// ~/app/loaders/clientLoader.ts
import { redirect } from "react-router-dom";
import { account } from "~/appwrite/client";
import {getAllUsers, getGooglePicture, getUser, storeUserData} from "~/appwrite/auth";
import {getTripsByTravelStyle, getUserGrowthPerDay, getUsersAndTripsStats} from "~/appwrite/dashboard";
import {registerLicense} from "@syncfusion/ej2-base";
import {getAllTrips} from "~/appwrite/trips";
import {parseTripData} from "../../lib/utils";

export async function clientLoader() {
    try {
        const user = await account.get();
        const [currentUserData,dashboardStats,trips,userGrowth,tripsByTravelStyle,allUsers]= await Promise.all([
            getUser(),
            getUsersAndTripsStats(),
            getAllTrips(4,0),
            getUserGrowthPerDay(),
            getTripsByTravelStyle(),
            getAllUsers(4,0)
        ])
        const allTrips =  trips.allTrips.map(({ $id, tripDetail, imageUrls }) => ({
                id: $id,
                ...parseTripData(tripDetail),
                imageUrls: imageUrls ?? []
        }))
        const mappedUsers: UsersItineraryCount[] = allUsers.users.map((user)=>({
            imageUrl:user.imageUrl,
            name:user.name,
            count:user.itineraryCount ?? Math.floor(Math.random() * 10)+1
        }))

        if (!user?.$id) return redirect('/sign-in');

        const userData = await storeUserData();
        if (userData?.status === 'user') return redirect('/');
        return {user,currentUserData,dashboardStats,allTrips,
            userGrowth,
            tripsByTravelStyle,
            allUsers: mappedUsers};
    } catch (e) {
        console.log('Error in client loader', e);
        return redirect('/sign-in');
    }
}
