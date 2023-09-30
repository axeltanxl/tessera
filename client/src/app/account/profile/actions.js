import { cookies } from "next/headers"
// import { signOut } from "next-auth/react"


export const fetchDetails = async () => {
    const token = cookies().get("jwt_spring").value;
    const res = await fetch(`${process.env.SPRING_BACKEND}/users/accountDetails`, 
    {
        method: 'GET',
        headers : {"Authorization": `Bearer ${token}`,}
    });
    if(!res.ok){
        throw new Error('Failed to fetch data')
    }
    const details = res.json();
    return details;
}

export const updateDetails = async ({userID, newDetails}) => {
    const token = cookies().get("jwt_spring").value;
    console.log(`${process.env.SPRING_BACKEND}/users/update/${userID}`)
    const res = await fetch(`${process.env.SPRING_BACKEND}/users/update/${userID}`, 
    {
        method: 'PUT',
        headers : {"Authorization": `Bearer ${token}`,}
    });
    if(!res.ok){
        throw new Error('Failed to fetch data')
    }
    // const details = res.json();
    // return details;
}