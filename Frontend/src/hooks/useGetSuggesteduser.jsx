import { setSuggesteduser } from '@/redux/authSlice';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useGetSuggesteduser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggesteduser = async () => {
      try {
        const res = await axios.get('http://localhost:7000/api/v1/user/suggested', {
          withCredentials: true,
        });

        if (res.data?.success) {
          dispatch(setSuggesteduser(res.data?.users || []));
        }
      } catch (error) {
        console.log(error);

        // 🔹 Handle 401 Unauthorized gracefully
        if (error.response && error.response.status === 401) {
          // Redirect to login
          navigate('/login', { replace: true });
        }
      }
    };

    fetchSuggesteduser();
  }, [dispatch, navigate]);
};

export default useGetSuggesteduser;
