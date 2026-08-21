import { ReactNode } from 'react';

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

export function Button({
  onClick,
  disabled = false,
  children,
  variant = 'primary',
  type = 'button',
  fullWidth = false,
}: ButtonProps) {
  const baseClasses = 'px-4 py-2 rounded-lg font-semibold transition-colors duration-200 border-none cursor-pointer text-base';

  const variantClasses = variant === 'primary'
    ? 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed'
    : 'bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:bg-gray-400 disabled:cursor-not-allowed';

  const widthClasses = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${widthClasses}`}
    >
      {children}
    </button>
  );
}
