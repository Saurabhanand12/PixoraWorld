import { setAuthUser } from '@/redux/authSlice';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { use, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Signup = () => {

    const {user} = useSelector(store => store.auth);
    const [input, setinput] = useState({
        username: "",
        email: "",
        password: ""
    });
    
    const navigate = useNavigate();


    const changeEventHandler = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value });
    }
    const [loading, setloading] = useState(false);

    const signupHandler = async (e) => {
        e.preventDefault();
        try {
            setloading(true);
            const res = await axios.post('http://localhost:7000/api/v1/user/register', input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                navigate('/login');
                toast.success(res.data.message);
                setinput({
                    username: "",
                    email: "",
                    password: ""
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setloading(false);
        }
    }
    useEffect(()=>{
            if(user){
                navigate('/');
            }
        },[]);
    return (
        <div className="bg-slate-900 flex items-center justify-center w-screen h-screen bg-gray-100">
            <form onSubmit={signupHandler} className="bg-white shadow-lg rounded-lg flex flex-col gap-5 p-8 w-96">

                {/* Header */}
                <div className="text-center mb-4">
                    <h1 className="text-4xl font-bold italic">Pixora</h1>
                    <p className="text-gray-500 text-sm"><span className='text-black text-xl'>Signup</span> to see & interact with your friends</p>
                </div>

                {/* Username */}
                <div className="flex flex-col">
                    <label className="mb-1 font-medium">Username:</label>
                    <input type="text" name="username" value={input.username} onChange={changeEventHandler}
                        className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                    <label className="mb-1 font-medium">Email:</label>
                    <input type="email" name="email" value={input.email} onChange={changeEventHandler}
                        className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                {/* Password */}
                <div className="flex flex-col">
                    <label className="mb-1 font-medium">Password:</label>
                    <input type="password" name="password" value={input.password} onChange={changeEventHandler}
                        className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                {
                    loading ? (
                        <button>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </button>
                    ) : (
                        <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                        SignUp
                        </button>
                    )
                }
                <div className='px-8'> Already have an Account ? <a href="/Login" className='px-2 text-sky-600'> Login</a></div>
            </form>
        </div>
    )
}

export default Signup
