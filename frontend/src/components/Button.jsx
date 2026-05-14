import React from 'react';

const Button = ({ 
  children, 
  loading = false, 
  variant = 'primary', 
  type = 'button', 
  onClick, 
  disabled = false,
  icon: Icon,
  className = '',
  ...props 
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <>
          <div className="spinner"></div>
          <span>Processing...</span>
        </>
      ) : (
        <>
          {Icon && <Icon size={18} />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
