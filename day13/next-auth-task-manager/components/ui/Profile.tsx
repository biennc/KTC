import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Profile = async () => {
     const session = await getServerSession(authOptions)
     if(!session || !session.user) {
        return (
            <div>
                <h1>You are not logged in</h1>
            </div>
        )
     }
     //Gọi API trong server component
    const response = await fetch(`${process.env.NEXTAUTH_URL}/auth/profile`, {
        headers: {
        'Authorization': `Bearer ${session.user.accessToken}`,
        },
    });
    if (!response.ok) {
        return 'Error fetching profile data';
    }
    const data = await response.json();
    console.log('data: ',data);

  return (
    <div>
        <h1>Profile</h1>
        <div className="profile">
            <p>Name: {data.name}</p>
            <p>Email: {data.email}</p>
        </div>
    </div>
  )
}

export default Profile