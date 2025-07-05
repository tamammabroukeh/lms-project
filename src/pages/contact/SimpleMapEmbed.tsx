import React from 'react';

interface SimpleMapEmbedProps {
    mapUrl: string;
    height?: string;
    width?: string;
}

const SimpleMapEmbed: React.FC<SimpleMapEmbedProps> = ({
    mapUrl,
    height = '400px',
    width = '100%',
}) => {
    return (
        <div className="w-full overflow-hidden rounded-lg shadow-md">
            <iframe
                title="Google Map Location"
                src={mapUrl}
                width={width}
                height={height}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
    );
};

export default SimpleMapEmbed;