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
                toast.success(res.data.message,{ style: {background: "white",borderRadius: "10px"}});
                setinput({
                    username: "",
                    email: "",
                    password: ""
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message,{ style: {background: "white",borderRadius: "10px"}});
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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden
bg-gradient-to-br from-[#020617] via-[#0f172a] to-black">

    <div className="absolute inset-0 animate-gradient opacity-40"></div>

    <div className="absolute w-[600px] h-[600px] bg-blue-500/20 blur-3xl rounded-full 
    -top-40 -left-40 animate-float"></div>

    <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-3xl rounded-full 
    -bottom-40 -right-40 animate-float delay-2000"></div>

    <form onSubmit={signupHandler} className="relative backdrop-blur-2xl bg-white/10 border border-white/20 shadow-[0_0_60px_rgba(59,130,246,0.2)] 
    rounded-3xl flex flex-col gap-6 p-10 w-[380px] text-white transition-all duration-500 hover:scale-[1.02]"> 

        <div className="text-center space-y-2">
            <h1 className="text-4xl font-extrabold italic tracking-wide">
                Pixora
            </h1>

            <p className="text-gray-300 text-sm">
                <span className="block text-lg font-semibold text-white">
                    Create Account 🚀
                </span>
                Join & interact with your friends
            </p>
        </div>

        <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Username</label>
            <input type="text" name="username" value={input.username} onChange={changeEventHandler} placeholder="Enter username"
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none transition-all duration-300
                focus:ring-2 focus:ring-blue-400 focus:bg-white/20 placeholder:text-gray-400"/>
        </div>

        <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Email</label>
            <input type="email" name="email" value={input.email} onChange={changeEventHandler} placeholder="name@example.com"
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none transition-all duration-300
                focus:ring-2 focus:ring-blue-400focus:bg-white/20 placeholder:text-gray-400"/>
        </div>

        <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Password</label>
            <input type="password" name="password" value={input.password} onChange={changeEventHandler} placeholder="name@123"
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none transition-all duration-300
                focus:ring-2 focus:ring-blue-400 focus:bg-white/20 placeholder:text-gray-400"
            />
        </div>

        {loading ? (
            <button
                disabled
                className="flex items-center justify-center py-3 rounded-xl bg-blue-500/70"
            >
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Please wait...
            </button>
        ) : (
            <button type="submit" className="py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600
                hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/30 active:scale-95">
                Sign Up
            </button>
        )}

        {/* Footer */}
        <p className="text-center text-sm text-gray-300">
            Already have an account?
            <a href="/Login"className="ml-2 text-blue-400 font-semibold hover:underline">
                Login
            </a>
        </p>
    </form>
</div>
    )
}

export default Signup
