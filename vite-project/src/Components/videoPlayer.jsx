import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import VideoCardPlayer from './VideoCard_player';
import VideoCard from "./VideoCard";
import { useAuth } from "../Context/UserAuth";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faThumbsUp, faThumbsDown, faShare, faHeart } from '@fortawesome/free-solid-svg-icons';

function VideoPlayer() {
    const { isLogin } = useAuth();
    const { videoId: videoId } = useParams();
    const [videoDetails, setVideoDetails] = useState(null);
    const [userData, setUserData] = useState(null);
    const [relatedVideos, setRelatedVideos] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [category, setCategory] = useState("");
    const [showDescription, setShowDescription] = useState(false);
    const [editCommentId, setEditCommentId] = useState(null);
    const [editCommentText, setEditCommentText] = useState("");
    const [channel, setChannel] = useState(null);
    const loginEmail = localStorage.getItem('email');
    const url = `http://localhost:5200/api/user/${loginEmail}`;

    // Fetch user data by email
    const fetchUserDataByEmail = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                },
            });
            setUserData(response.data);

        } catch (error) {
            console.error("Network error getting data:", error.message);
            setErrorMsg(error.message || 'Network error');
        }
    };

    useEffect(() => {
        fetchUserDataByEmail();
    }, [videoId])

    // fetch videodetails
    const fetchVideoDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5200/api/videos/${videoId}`);
            setVideoDetails(response.data);
            setCategory(response.data.category);
            setComments(response.data.comments);
        } catch (error) {
            console.error("Error fetching video details:", error);
            setErrorMsg("Failed to load video details.");
        }
    };

    useEffect(() => {
        fetchVideoDetails();
    }, [videoId]);

    // Fetch related video
    useEffect(() => {
        const fetchRelatedVideos = async () => {
            if (category) {
                try {
                    const response = await axios.get(`http://localhost:5200/api/videos/category/${category}`);
                    setRelatedVideos(response.data);
                } catch (error) {
                    console.error("Error fetching related videos:", error);
                    setErrorMsg("Failed to load related videos.");
                }
            }
        };

        fetchRelatedVideos();
    }, [category]);

    // fetch channel data
    const fetchChannel = async () => {
        try {
            const response = await axios.get(`http://localhost:5200/api/channel/data/${videoDetails?.channelId}`);
            setChannel(response.data.channel);
            setErrorMsg('');
        } catch (error) {
            setErrorMsg('Failed to load channel data.');
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchChannel();
    }, [videoDetails]);

    // handle add comment
    const handleAddComment = async () => {
        if (isLogin) {
            if (!newComment.trim()) return;

            try {
                const response = await axios.post(`http://localhost:5200/api/videos/${videoId}/comments`, { userId: userData?._id, userAvatar: userData.avatar, username: userData.username, text: newComment });
                setComments(prevComments => [...prevComments, response.data]);
                fetchVideoDetails();
                setNewComment("");
            } catch (error) {
                console.error("Error adding comment:", error);
                setErrorMsg("Failed to add comment.");
            }
        } else {
            setErrorMsg('Please login !! ')
        }
    };

    // handle delete comment
    const handleDeleteComment = async (commentId) => {
        if (isLogin) {
            try {
                await axios.delete(`http://localhost:5200/api/videos/${videoId}/del/comments/${commentId}`,
                    { data: { userId: userData?._id }});
                fetchVideoDetails();
            } catch (error) {
                console.error("Error deleting comment:", error);
                setErrorMsg(error.message.includes('403')? 'Invalid user' : error.message);
            }
        } else {
            setErrorMsg('Please login !! ')
        }
    };

    // handle edit comment
    const handleEditComment = (commentId, currentText) => {
        setEditCommentId(commentId);
        setEditCommentText(currentText);
    };

    const handleUpdateComment = async () => {
        if (isLogin) {
            if (!editCommentText.trim()) return;

            try {
                await axios.put(`http://localhost:5200/api/videos/${videoId}/edt/comments/${editCommentId}`, { text: editCommentText, userId: userData?._id  });
                setEditCommentId(null);
                setEditCommentText("");
                fetchVideoDetails();
            } catch (error) {
                console.error("Error updating comment:", error);
                setErrorMsg(error.message.includes('403')? 'Invalid user' : error.message);
            }
        } else {
            setErrorMsg('Please login !! ')
        }
    };

    // handle like
    const handleLike = async () => {
        if (isLogin) {
            try {
                await axios.post(`http://localhost:5200/api/videos/${videoId}/likes`, { userId: userData?._id }); // Replace with actual userId
                fetchVideoDetails(); // Refresh video details 
            } catch (error) {
                console.error("Error liking the video:", error.response?.data.message || error.message);
            }
        } else {
            alert('Please login !! ')
        }
    };

    //handle dislike
    const handleDislike = async () => {
        if (isLogin) {
            try {
                await axios.post(`http://localhost:5200/api/videos/${videoId}/dislikes`, { userId: userData?._id }); // Replace with actual userId
                fetchVideoDetails(); // Refresh video details 
            } catch (error) {
                console.error("Error disliking the video:", error.response?.data.message || error.message);
            }
        } else {
            alert('Please login !! ')
        }
    };


    return (
        <div className="flex lg:gap-11 xl:gap-5 flex-col lg:flex-row min-h-screen sm:ml-20 sm:mr-5 md:ml-24">
            <div className="flex-1 bg-white">
                {videoDetails ? (
                    <div>
                        <div>
                            {/* Videoplayer card */}
                            <VideoCardPlayer key={videoId} videoId={videoId} videoDetails={videoDetails} channelId={videoDetails.channelId} />

                            {/* like-deslike section */}
                            <div className="flex justify-stretch sm:justify-end  overflow-x-auto pb-2 px-2 items-center mt-2">
                                <div className="flex gap-6 lg:gap-14 ">
                                    <button onClick={handleLike} className={`flex items-center shadow-sm rounded-full bg-slate-200 p-1 px-2 gap-1  ${videoDetails.likedBy.includes(userData?._id) ? "text-blue-500" : "text-gray-600"} `}>
                                        <FontAwesomeIcon icon={faThumbsUp} />
                                        <span>{videoDetails.likes}</span>
                                    </button>
                                    <button onClick={handleDislike} className={`flex items-center shadow-sm rounded-full bg-slate-200 p-1 px-2 gap-1  ${videoDetails.dislikedBy.includes(userData?._id) ? "text-red-600" : "text-gray-600"} `}>
                                        <FontAwesomeIcon icon={faThumbsDown} />
                                        <span>{videoDetails.dislikes}</span>
                                    </button>
                                    <button className="flex items-center shadow-sm rounded-full bg-slate-200 p-1 px-2 gap-1 text-gray-600 hover:text-blue-500">
                                        <FontAwesomeIcon icon={faShare} />
                                        <span>Share</span>
                                    </button>
                                    <button className="flex items-center shadow-sm rounded-full bg-slate-200 p-1 px-2 gap-1 text-gray-600 hover:text-blue-500">
                                        <FontAwesomeIcon icon={faHeart} />
                                        <span>Thanks</span>
                                    </button>
                                </div>
                            </div>

                            {/* channel info */}
                            <div className="flex justify-between items-center bg-slate-100 sm:rounded-md mt-2 p-2 lg:py-5">
                                <Link to={`/channel/${videoDetails?.channelId}`} className="flex flex-row items-center">
                                    {channel ? (
                                        <>
                                            <img
                                                className="bg-gray-600 w-10 h-10 object-cover rounded-full mr-2"
                                                src={channel.profilePicture}
                                                alt="Channel Logo"
                                            />
                                            <p className="text-sm lg:text-lg font-semibold">{videoDetails.channelName}</p>
                                        </>
                                    ) : (
                                        <div className="bg-gray-400 w-9 h-9 rounded-full animate-pulse" />
                                    )}
                                </Link>

                                {channel && (
                                    <button className="bg-black text-white py-1 px-3 rounded-full">Subscribe</button>
                                )}
                            </div>
                        </div>

                        {/* discription */}
                        <div className="border-b w-full mt-2">
                            <button
                                onClick={() => setShowDescription(!showDescription)}
                                className="ml-2 text-blue-500 text-sm"
                            >
                                {showDescription ? "Hide Description" : "Show Description"}
                            </button>

                            {showDescription && (
                                <p className="m-2 text-xs text-balance p-3">{videoDetails.description}</p>
                            )}

                        </div>
                    </div>
                ) : (
                    <p>Loading video details...</p>
                )}

                {/* comment section */}
                <div className="mt-4 px-2">
                    <h2 className="text-sm sm:text-lg font-semibold">Comments</h2>
                    {comments.length > 0 ? (
                        comments.map(comment => (
                            <div key={comment._id} className="flex justify-between items-center mt-2 border-b pb-2">
                                {editCommentId === comment._id ? (
                                    <>
                                        <input
                                            type="text"
                                            className="border rounded p-1"
                                            value={editCommentText}
                                            onChange={(e) => setEditCommentText(e.target.value)}
                                        />
                                        <button onClick={handleUpdateComment} className="text-green-500">Update</button>
                                        <button onClick={() => setEditCommentId(null)} className="text-gray-500">Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <div className=" w-full flex flex-row justify-between rounded-md px-3 py-1">
                                           
                                            <div className=" flex flex-row gap-4 items-center">
                                                <img className="w-9 h-9 rounded-full" src={comment.userAvatar} alt="avatar" />
                                                <div>
                                                <p className="text-sm font-semibold">{comment.username}</p>
                                                <p className="text-base w-full ">{comment.text}</p>
                                                </div>
                                                
                                            </div>

                                            <div className="flex gap-4">
                                                <button onClick={() => handleEditComment(comment._id, comment.text)} className="text-blue-500">
                                                    <FontAwesomeIcon icon={faPen} />
                                                </button>
                                                <button onClick={() => handleDeleteComment(comment._id)} className="text-red-500">
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}
                    <textarea
                        className="w-full mt-2 border rounded p-2"
                        rows="3"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                    />
                    <button onClick={handleAddComment} className="mt-2 bg-blue-500 text-white px-4 py-1 md:py-2 rounded">Add Comment</button>
                    {errorMsg && <p className="text-red-500">{errorMsg}</p>}
                </div>
            </div>
            
            {/* Related video section */}
            <h3 className="font-semibold text-lg max-sm:mt-5 lg:hidden md:my-10 px-2">Related Videos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5 lg:w-1/4 xl:mx-20">
                <h3 className="font-semibold text-lg max-lg:hidden max-sm:mt-5 md:mb-2 px-2">Related Videos</h3>
                {relatedVideos.map((video) => (
                    <VideoCard
                        key={video.videoId}
                        videoId={video.videoId}
                        videoDetails={video}
                        channelId={video.channelId}
                    />
                ))}
            </div>
        </div>
    );
}

export default VideoPlayer;
