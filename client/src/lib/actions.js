'use server'


export async function login(data){

    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/auth/login`, data)
        localStorage.setItem("jwt", res.data.token);
        console.log(res.data.message);

       
    } catch (error) {
        console.log("error: ", error);
    }


}