import { useState, useEffect,useCallback } from 'react';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import CommentBox from '../components/CommentBox'
import url from '../url'
import { useTranslation } from 'react-i18next';


const creatorname = Cookies.get('username');
const creatorId = Cookies.get('id');

const CreatePost = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { t } = useTranslation();

    const onRefresh = useCallback(() => {
      setRefreshing(true); 
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);

    useEffect(() => {
      }, []);
    
      const [formData, setFormData] = useState({
        creatorname: creatorname,
        creatorId: creatorId,
        heading: '',
        content: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (postData) => {
        try {
            const datatoapi = await fetch(`${url}/Post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });
            const detailsdata = await datatoapi.json();

            toast.success(detailsdata.message,{
              onClose: setTimeout(function () { window.location.reload(1); }, 1500)
          });
                     
            

        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to create post. Please try again later.')
        }
    };

    
  return (
    <div className="text-center " >
      {/* <form 
      onSubmit={handleSubmit}
      > */}
        <div className="form-floating">
          <input
            type="heading"
            className="form-control"
            id="heading"
            name="heading"
            value={formData.heading}
            placeholder="Enter your heading"
            onChange={handleChange}
            autoComplete="off"
            required
            style={{ boxShadow: "0 0 6px rgba(0, 0, 0, 0.2)"}}
          />
          <label htmlFor="heading">{t('Fheading')}</label>
        </div>
        
      <CommentBox postId="postId" heading={formData.heading} type="post" onCommentSubmit={handleSubmit} />
      <Toaster />
    </div>
  );
};

export default CreatePost;
