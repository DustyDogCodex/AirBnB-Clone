import { useContext } from "react"
import { UserContext } from "../UserContext"
import AccountInfo from "../components/AccountInfo"
import axios from "axios"

function Profile() {
     //getting userInfo from context
    const { userInfo } = useContext(UserContext)

    //function to logout user
    async function logout(){
        await axios.get(
            'http://localhost:5000/auth/logout',
            { withCredentials: true }
        )
        .then(res => {
            if(res.data){
                window.location.href = '/'
            }
        })
    }

    return (
    <>
        <h1>Account</h1>
        <p>
            <span 
                className="text-indigo-500 text-xl font-robotoMono font-semibold">{userInfo?.name}
            </span>,
            <span 
                className="text-indigo-500 text-md font-robotoMono font-semibold">{userInfo?.email}
            </span>
        </p> 
        <div
            className="flex flex-col items-center justify-start"
        >
            <h1 className="text-3xl mt-10">Personal Info</h1>
            <AccountInfo info={"Legal Name"} value={userInfo.name} />
            <AccountInfo info={"Email address"} value={userInfo.email} />
            <AccountInfo info={"Address"} value={'Not provided'} />
        </div>
        <button
            type="button"
            className="bg-red text-white rounded-full text-2xl px-6 py-2 mt-5"
            onClick={logout}
        >
            Log Out
        </button>
    </>
  )
}

export { Profile }