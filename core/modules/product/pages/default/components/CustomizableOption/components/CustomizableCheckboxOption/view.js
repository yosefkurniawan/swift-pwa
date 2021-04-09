import React from 'react';
import CheckBox from '@common_checkbox';
import Typography from '@common_typography';

const ViewCustomizableCheckboxOption = ({
    title = 'test', data = [], selected = [],
    onChange = () => {}, error = '',
}) => (
    <div className="column">
        {
            data && data.length > 0 && (
                <CheckBox
                    name={title}
                    label={title}
                    data={data}
                    value={selected || []}
                    flex="column"
                    onChange={onChange}
                />
            )
        }
        {
            error && error !== '' && (
                <Typography color="red">{error}</Typography>
            )
        }
    </div>
);

export default ViewCustomizableCheckboxOption;
