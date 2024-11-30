import React from 'react';

/**
 * PrivacyPolicy Component
 *
 * This component renders the Privacy Policy page for the Blog App.
 * It explains how user data is collected, stored, and protected.
 *
 * Features:
 * - Provides transparency about data handling and user control.
 * - Highlights security measures and respect for user privacy.
 * - Encourages users to contact support for any privacy-related queries.
 *
 * @component
 */
const PrivacyPolicy: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-lg shadow-lg h-[70vh] flex flex-col justify-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-8 text-center">Privacy Policy</h1>
            <p className="text-gray-700 text-xl text-center mb-16">
                Your privacy is important to us. Here's how we handle your data and ensure your experience is safe and secure. 🛡️
            </p>

            <p className="text-gray-700 text-lg mb-6">What we do with your data:</p>
            <ul className="list-disc list-inside text-gray-700 text-lg space-y-4 mb-16">
                <li>🔒 <b>Data Security:</b> Your information is stored securely and never shared without your consent.</li>
                <li>👤 <b>User Control:</b> You can edit or delete your account and articles at any time.</li>
                <li>📧 <b>Email Protection:</b> We don't send spam or share your email address.</li>
                <li>🛠️ <b>Improvements:</b> We analyze anonymized data to improve your experience.</li>
            </ul>

            <p className="text-gray-700 text-lg text-center mb-8">
                If you have any questions, feel free to contact us. We're here to help! ✉️
            </p>
            <p className="text-gray-700 text-center text-lg">Thank you for trusting us! 😊</p>
        </div>
    );
};

export default PrivacyPolicy;
