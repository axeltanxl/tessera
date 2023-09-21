import { getServerSession } from "next-auth";


export const authenticated = async() => {
    const authsession =  await getServerSession();
    console.log("authsession", authsession);
    return (!authsession || !authsession.user);
}