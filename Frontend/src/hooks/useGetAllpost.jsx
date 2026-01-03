import { setPosts } from '@/redux/postSlice';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllpost = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchallpost = async () => {
            try {
                const res = await axios.get('http://localhost:7000/api/v1/post/all', { withCredentials: true });
                if (res.data.success && res.data.posts) {
                    dispatch(setPosts(res.data.posts));
                }

            } catch (error) {
                console.log(error);
            }
        }
        fetchallpost();
    }, []);
}

export default useGetAllpost;