import React from 'react';

/**
 * TermsOfService Component
 *
 * This component renders the Terms of Service page for the Blog App.
 * It provides an overview of the platform's rules and guidelines that users must follow.
 *
 * Features:
 * - Displays key terms and conditions for using the Blog App.
 * - Emphasizes respect, compliance, and content ownership.
 * - Encourages a positive and engaging user experience.
 *
 * @component
 */
const TermsOfService: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-lg shadow-lg h-[70vh] flex flex-col justify-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-8 text-center">Terms of Service</h1>
            <p className="text-gray-700 text-xl text-center mb-16">
                Welcome to Blog App! By using our platform, you're agreeing to these terms. Let's keep it simple and fun! 🤝
            </p>

            <p className="text-gray-700 text-lg mb-6">Here's the deal:</p>
            <ul className="list-disc list-inside text-gray-700 text-lg space-y-4 mb-16">
                <li>📜 <b>Respect:</b> Be kind and respectful to others. No hate speech or offensive content.</li>
                <li>📝 <b>Your Content:</b> What you post is yours. Just make sure it’s original and doesn't violate any laws.</li>
                <li>⚖️ <b>Compliance:</b> Follow all applicable laws and our community guidelines.</li>
                <li>🔄 <b>Changes:</b> We might update these terms occasionally, but we’ll let you know when we do.</li>
                <li>🚫 <b>Account Suspension:</b> We reserve the right to suspend accounts that violate our rules.</li>
            </ul>

            <p className="text-gray-700 text-lg text-center mb-8">
                By using Blog App, you’re agreeing to keep it awesome. Let’s make this a great place for everyone! 🚀
            </p>
            <p className="text-gray-700 text-center text-lg">Happy blogging! 😊</p>
        </div>
    );
};

export default TermsOfService;
