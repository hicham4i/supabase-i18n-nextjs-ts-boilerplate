import { User } from "@supabase/supabase-js";


// Define a class to wrap the user object
export class UserWrapper {
    private userData: User;

    constructor(user: User) {
        this.userData = user;
    }

    // Method to check if the user is an admin
    isAllowed(): boolean {
        return !!this.userData?.app_metadata?.claims_admin;
    }
    isAdmin(): boolean {
        return ["admin", "owner"].includes(this.userData?.app_metadata?.userrole as string);
    }
}