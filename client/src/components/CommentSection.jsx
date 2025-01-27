import React from 'react';
import { useState, useEffect } from 'react';
import api from '../Services/api';

function CommentSection({ blog_id }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([])

  useEffect(() => {

    const getComments = async () => {

      try {
        const response = await api.get(`/comment/${blog_id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        setComments(response.data.comments.reverse());
      }

      catch (error) {
        console.log(error);
      }
    }
    getComments();
  }, [comment])

  function handleChange(e) {
    setComment(e.target.value);
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      const response = await api.post(`/comment/${blog_id}`, { comment: comment }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      console.log('comment added successfully');
      setComment('');
    }
    catch (error) {
      console.log("error adding comment", error.response.data);
    }
  }

  return (
    <div className='w-2/4 min-h-fit p-4 bg-gray-600 flex flex-col justify-center rounded-2xl'>
      <form
        className=" p-2 mb-6 rounded shadow-md w-5/6 text-black bg-gray-500"
        onSubmit={handleSubmit}
      >
        <div className='flex w-11/12'>
          <input
            type="text"
            name="comment"
            id="comment"
            value={comment}
            onChange={handleChange}
            className=" border w-5/6 rounded mt-1 none outline-none text-gray-100 px-2 bg-gray-500"
            placeholder="comment something..."
          />
          <button type="submit" className='text-gray-200 w-12 h-6 m-auto hover:bg-slate-700/70 active:bg-slate-700 rounded-lg bg-gray-600 ml-5'>Add</button>
        </div>
      </form>

      <div>
        <div className='flex flex-col text-gray-100'>
          {comments && comments.length>0 ? (
            <div>
              <div className='font-sans mt-3'>All comments</div>
              <hr className='border-2 w-4/5' />
              {comments.map(
                (commentArray) => {
                  return (
                    <div key={`${commentArray._id}`} className='flex font-sans text-lg justify-around items-center p-1 text-gray-300 bg-slate-800 rounded-xl w-11/12 m-2'>
                      <div className='underline'>{commentArray.user.userName}</div>
                      <div className='break-all w-8/12'>{commentArray.comment}</div>
                      <div className='text-xs flex flex-col justify-center items-center'>
                        <div>{commentArray.createdAt.slice(5, 8)}{commentArray.createdAt.slice(0, 4)}</div>
                        <div>{commentArray.createdAt.slice(11, 16)}</div>
                      </div>
                    </div>
                  )
                }
              )}
            </div>) : (<div className='text-sm mt-3'>No comments yet</div>)}
        </div>
      </div>
    </div>
  )
}

export default CommentSection
