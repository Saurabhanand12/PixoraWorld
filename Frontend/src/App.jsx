import Signup from './components/Signup'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import MainLayout from './components/MainLayout'
import Home from './components/Home'
import Login from './components/Login'
import Profile from './components/Profile'
import Editprofile from './components/Editprofile'
import Chatpage from './components/Chatpage'
import { io } from 'socket.io-client';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSocket } from './redux/socketSlice'
import { setOnlineUsers } from './redux/chatSlice'
import { setLikeNotification } from './redux/rtnSlice'
import Protected from './components/Protected'

const browserrouter = createBrowserRouter([
  {
    path: "/",
    element: <Protected><MainLayout /></Protected>,
    children: [
      {
        path: "/",
        element: <Protected><Home /></Protected>
      },
      {
        path: "/Profile/:id",
        element: <Protected><Profile /></Protected> 
      },
      {
        path: '/account/edit',
        element: <Protected><Editprofile /></Protected> 
      },
      {
        path: '/chat',
        element: <Protected><Chatpage /></Protected> 
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
])

function App() {
  const {user} = useSelector(store => store.auth);
  const { socket } = useSelector(store => store.socketio);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const socketio = io('http://localhost:7000', {
        query: {
          userId: user?._id
        },
        transports: ['websocket'],
        withCredentials: true,
      });
      dispatch(setSocket(socketio));

      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers || []));
      });

      socketio.on('notification', (notification) => {
        dispatch(setLikeNotification(notification));
      })

      return () => {
        socketio.close();
        dispatch(setSocket(null));
      }
    } else if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  }, [user, dispatch]);

  return (
    <>
      <RouterProvider router={browserrouter} />
    </>
  )
}

export default App
