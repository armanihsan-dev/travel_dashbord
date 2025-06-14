// ~/app/loaders/clientLoader.ts
import { redirect } from "react-router";
import { account } from "~/appwrite/client";
import { getExistingUser, storeUserData } from "~/appwrite/auth";

export async function clientLoader() {
    try {
        const user = await account.get();
        if (!user?.$id) return redirect('/sign-in');

        const existingUser = await getExistingUser(user.$id);
        if (existingUser?.status === 'user') return redirect('/');

        return existingUser?.$id ? existingUser : await storeUserData();
    } catch (e) {
        console.log('Error in client loader', e);
        return redirect('/sign-in');
    }
}
