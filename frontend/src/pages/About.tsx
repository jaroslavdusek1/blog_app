// src/pages/About.tsx
import React from 'react';

/**
 * About Component
 *
 * This component renders the About page for the Blog App.
 * It provides an overview of the platform and its features in a friendly and engaging way.
 *
 * Features:
 * - Welcomes users with a warm introduction to the Blog App.
 * - Lists key features of the platform, such as account creation, article publishing, and commenting.
 * - Encourages users to register and start exploring the app.
 */
const About: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-lg shadow-lg h-[70vh] flex flex-col justify-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-8 text-center"> Welcome to Blog App!</h1>
            <p className="text-gray-700 text-xl text-center mb-16">
                Hello there we're happy you're here! This is your cozy corner to share your thoughts, read stuff and connect with cool people. 🐱‍👓
            </p>

            <p className="text-gray-700 text-lg mb-6">Here's what you can find out here:</p>
            <ul className="list-disc list-inside text-gray-700 text-lg space-y-4 mb-16">
                <li>✅ <b>Create your account</b> with a unique username and password—super quick and easy!</li>
                <li>📝 <b>Write and publish articles</b>, basically about anything you want 😉.</li>
                <li>🛠️ <b>Edit your stuff</b> anytime. It's your space!</li>
                <li>👀 <b>Read what others are sharing</b> and discover new perspectives.</li>
                <li>💬 <b>Comment on posts</b>, share your thoughts, and keep the convo going.</li>
                <li>🔥 <b>Rate comments</b> to show some love for the best ones!</li>
            </ul>

            <p className="text-gray-700 text-lg text-center mb-8">
                Hit that register button and let's get started!
            </p>
            <p className="text-gray-700 text-center text-lg">Happy hacking! 🚀</p>
        </div>
    );
};

export default About;
