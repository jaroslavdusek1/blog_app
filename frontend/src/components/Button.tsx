import React from 'react';

/**
 * Button Component
 *
 * A reusable button component that renders children as its content.
 *
 * @param {Object} props - The props for the Button component.
 * @param {React.ReactNode} props.children - The content to display inside the button.
 * @returns {JSX.Element} - The rendered button component.
 */
const Button = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return <button>{children}</button>;
};

export default Button;
