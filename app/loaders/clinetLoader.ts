// ~/app/loaders/clientLoader.ts
import { redirect } from "react-router-dom";
import { account } from "~/appwrite/client";
import { storeUserData } from "~/appwrite/auth";

export async function clientLoader() {
    try {
        const user = await account.get();
        if (!user?.$id) return redirect('/sign-in');

        const userData = await storeUserData();
        if (userData?.status === 'user') return redirect('/');

        return userData;
    } catch (e) {
        console.log('Error in client loader', e);
        return redirect('/sign-in');
    }
}
