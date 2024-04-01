import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';

const creatorname = Cookies.get('username');
const creatorId = Cookies.get('id');

const CreatePost = () => {

    useEffect(() => {
        console.log(creatorname)
        console.log(creatorId)
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const datatoapi = await fetch('http://localhost:4999/Post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const detailsdata = await datatoapi.json();
            console.log(detailsdata.message);
            toast.success('Post created successfully!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
              });
              window.location.reload();
            

        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to create post. Please try again later.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
              });
        }
    };
    
  return (
    <div>
      <form 
      onSubmit={handleSubmit}
      >
        <div className="form-floating">
          <input
            type="heading"
            className="form-control"
            id="heading"
            name="heading"
            value={formData.heading}
            placeholder="Enter your heading"
            onChange={handleChange}
          />
          <label htmlFor="heading">Heading</label>
        </div>
        <div className="form-floating">
          <input
            type="content"
            className="form-control"
            name="content"
            value={formData.content}
            placeholder="Enter your content"
            onChange={handleChange}
          />          
          <label htmlFor="content">Comment</label>
        </div>
        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreatePost;
