'use server'


export async function login(data){

    try {
        const res = await axios.post("http://localhost:8080/api/v1/auth/login", data)
        localStorage.setItem("jwt", res.data.token);
        console.log(res.data.message);

       
    } catch (error) {
        console.log("error: ", error);
    }


}