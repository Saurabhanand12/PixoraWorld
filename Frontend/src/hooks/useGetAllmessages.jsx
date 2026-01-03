import { setMessages } from '@/redux/chatSlice';
import { setPosts } from '@/redux/postSlice';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllMessage = () => {
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.auth);

    if (!selectedUser?._id) return;

    useEffect(() => {
        const fetchallMessage = async () => {
            try {
                const res = await axios.get(`http://localhost:7000/api/v1/message/all/${selectedUser?._id}`, { withCredentials: true });
                if (res.data.success && res.data.messages) {
                    dispatch(setMessages(res.data.messages));
                }

            } catch (error) {
                console.log(error);
            }
        }
        fetchallMessage();
    }, [selectedUser]);
}

export default useGetAllMessage;