import React from 'react';
import { Dumbbell } from 'lucide-react';

const Loading = () => {
    return (
        <div className="loading-container" style={{ 
            height: '100vh', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center',
            background: 'var(--bg-primary)'
        }}>
            <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                <div className="spinner" style={{ 
                    width: '60px', 
                    height: '60px', 
                    borderWidth: '3px',
                    borderTopColor: 'var(--accent-primary)' 
                }}></div>
                <Dumbbell 
                    size={24} 
                    style={{ 
                        position: 'absolute', 
                        top: '50%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)',
                        color: 'var(--accent-primary)'
                    }} 
                />
            </div>
            <p style={{ 
                color: 'var(--text-secondary)', 
                fontWeight: '500', 
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontSize: '0.8rem'
            }}>
                Loading Cult Fitness
            </p>
        </div>
    );
};

export default Loading;
