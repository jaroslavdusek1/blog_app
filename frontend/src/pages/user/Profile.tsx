import React, { useEffect, useState } from 'react';
import { AuthService } from '../../services/authService';

interface UserProfile {
    username: string;
    name: string;
    surname: string;
    role: string;
    image: string | null;
}

/**
 * Profile component for displaying and updating the user's profile information.
 * Allows the user to view their profile details and upload a new profile image.
 *
 * @component
 */
const Profile: React.FC = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [error, setError] = useState<string>('');
    const [newImage, setNewImage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    /**
     * Fetches the user's profile data on component mount.
     * Updates the `profile` state with the retrieved data.
     */
    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await AuthService.fetchUserProfile();
                setProfile(data);
            } catch (err) {
                setError('Failed to load profile.');
            }
        };
        loadProfile();
    }, []);

    /**
     * Handles the selection of a new profile image.
     * Converts the selected image file to a Base64 string and updates the `newImage` state.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e - The file input change event.
     */
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setNewImage(reader.result as string);
                setSuccessMessage(null); // Reset success message when a new image is selected
            };
            reader.readAsDataURL(file);
        }
    };

    /**
     * Uploads the new profile image to the server.
     * Updates the user's profile with the new image and displays a success message.
     */
    const handleImageUpload = async () => {
        if (newImage) {
            try {
                await AuthService.updateUserImage(newImage);
                setProfile((prev) => (prev ? { ...prev, image: newImage } : prev));
                setNewImage(null); // Hide the "Save" button after upload
                setSuccessMessage('Upload successful.');
            } catch (err) {
                alert('Failed to upload image.');
            }
        }
    };

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!profile) {
        return <p className="text-gray-500">Loading profile...</p>;
    }

    return (
        <div className="container mx-auto mt-8">
            <div className="relative bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
                {/* Button to upload a new profile image */}
                <div className="absolute top-4 right-4">
                    <label className="text-blue-500 cursor-pointer hover:underline text-sm">
                        Upload New Image
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </label>
                    {newImage && (
                        <button
                            onClick={handleImageUpload}
                            className="mt-2 block bg-blue-500 text-white px-3 py-1 rounded shadow text-sm hover:bg-blue-600"
                        >
                            Save
                        </button>
                    )}
                </div>

                {/* Success message */}
                {successMessage && (
                    <p className="absolute top-16 right-4 text-green-500 text-sm">{successMessage}</p>
                )}

                {/* Profile image or initials */}
                <div className="flex items-center justify-center mb-4">
                    {profile.image ? (
                        <img
                            src={profile.image}
                            alt={`${profile.name} ${profile.surname}`}
                            className="w-32 h-32 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-32 h-32 bg-blue-500 text-white flex items-center justify-center rounded-full text-xl font-bold">
                            {profile.name[0]}
                            {profile.surname[0]}
                        </div>
                    )}
                </div>

                {/* Profile details */}
                <div className="bg-gray-100 shadow-md rounded-lg p-6 max-w-md mx-auto">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-gray-600 font-semibold">Username:</div>
                        <div className="text-black">{profile.username}</div>
                        <div className="text-gray-600 font-semibold">Name:</div>
                        <div className="text-black">{profile.name}</div>
                        <div className="text-gray-600 font-semibold">Surname:</div>
                        <div className="text-black">{profile.surname}</div>
                        <div className="text-gray-600 font-semibold">Role:</div>
                        <div className="text-black">{profile.role}</div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profile;
