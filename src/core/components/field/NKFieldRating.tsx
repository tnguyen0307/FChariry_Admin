import * as React from 'react';

import { Rating } from 'react-simple-star-rating';

interface FieldRatingProps {
    value: string;
}

const FieldRating: React.FC<FieldRatingProps> = ({ value }) => {
    return (
        <div className=" flex items-center justify-between">
            <Rating initialValue={Number(value)} className="  " size={20} readonly />
        </div>
    );
};

export default FieldRating;
