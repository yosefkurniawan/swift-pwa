import React from 'react';
import NewsletterForm from '@plugin_newsletter';

const MagezonNewsletter = () => (
    <div>
        <NewsletterForm />
        <style jsx global>
            {`
                    .toggle-wrapper {
                        display: flex;
                        flex-direction: column;
                    }
                `}
        </style>
    </div>
);

export default MagezonNewsletter;
