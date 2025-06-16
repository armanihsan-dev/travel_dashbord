// ~/app/loaders/clientLoader.ts
import { redirect } from "react-router-dom";
import { account } from "~/appwrite/client";
import {getGooglePicture, getUser, storeUserData} from "~/appwrite/auth";
import {getUsersAndTripsStats} from "~/appwrite/dashboard";

export async function clientLoader() {
    try {
        const user = await account.get();
        const currentUserData = await getUser();
        const dashboardStats = await getUsersAndTripsStats();
        if (!user?.$id) return redirect('/sign-in');

        const userData = await storeUserData();
        if (userData?.status === 'user') return redirect('/');
        return {user,currentUserData,dashboardStats};
    } catch (e) {
        console.log('Error in client loader', e);
        return redirect('/sign-in');
    }
}
