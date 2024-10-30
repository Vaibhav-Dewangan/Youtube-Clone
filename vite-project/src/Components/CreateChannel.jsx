import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is installed and imported

const CreateChannel = ({ isOpen, onClose, userId }) => {
    const [formData, setFormData] = useState({
        channelName: '',
        description: '',
        profilePicture: '',
        bannerImage:'',
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Update image preview if the input is the profile picture URL
        if (name === 'profilePicture') {
            setImagePreview(value);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a payload object
        const payload = {
            userId: userId, // Include userId in the payload
            channelName: formData.channelName,
            description: formData.description,
            profilePicture: formData.profilePicture, // Directly using the URL
            bannerImage: formData.bannerImage,
        };

        // Log payload for debugging
        console.log("Payload:", payload);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5200/api/channel/create', payload, {
                headers: {
                    'Content-Type': 'application/json', // Set content type to application/json
                    'Authorization': `Bearer ${token}`
                }
            });

            setSuccess('Channel created successfully!');
            setError('');
            // Reset form data
            setFormData({ channelName: '', description: '', profilePicture: '' });
            setImagePreview(null);
            onClose(); // Close modal
        } catch (err) {
            // Error handling
            setError(err.response?.data?.message || 'Something went wrong.');
            setSuccess('');
        } finally {
            reloadWindow()
        }
    };

    function reloadWindow() {
        window.location.reload();
    }

    if (!isOpen) return null; // Don't render if not open

    console.log(userId);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <h2 className="text-xl font-semibold text-center mb-4">Create Your Channel</h2>

                {/* Image Preview Section */}
                <div className="flex justify-center mb-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                        {imagePreview ? (
                            <img src={imagePreview} alt="Channel Icon" className="object-cover w-full h-full" />
                        ) : (
                            <span className="text-center">No Icon</span>
                        )}
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <label className="block mb-2">
                        <span className="text-sm font-medium">Channel Name</span>
                        <input
                            type="text"
                            name="channelName"
                            value={formData.channelName}
                            onChange={handleInputChange}
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            placeholder="Enter channel name"
                            required
                        />
                    </label>

                    <label className="block mb-2">
                        <span className="text-sm font-medium">Description</span>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            placeholder="Enter a description"
                            rows="3"
                        />
                    </label>

                    <label className="block mb-2">
                        <span className="text-sm font-medium">Profile Picture URL</span>
                        <input
                            type="text"
                            name="profilePicture"
                            value={formData.profilePicture}
                            onChange={handleInputChange}
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            placeholder="Enter image URL"
                            required
                        />
                    </label>

                    <label className="block mb-2">
                        <span className="text-sm font-medium">Banner Image URL</span>
                        <input
                            type="text"
                            name="bannerImage"
                            value={formData.bannerImage}
                            onChange={handleInputChange}
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            placeholder="Enter image URL"
                            required
                        />
                    </label>

                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    {success && <p className="text-green-500 text-sm mt-2">{success}</p>}

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Create Channel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateChannel;
