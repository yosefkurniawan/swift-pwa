/* eslint-disable no-underscore-dangle */
import React from 'react';
import { modules } from '@config';
import CustomizableCheckboxOption from '@plugin_cutomizableitem/components/CustomizableCheckboxOption';
import CustomizableRadioOption from '@plugin_cutomizableitem/components/CustomizableRadioOption';
import CustomizableDropDownOption from '@plugin_cutomizableitem/components/CustomizableDropDownOption';
import CustomizableAreaOption from '@plugin_cutomizableitem/components/CustomizableAreaOption';
import CustomizableFieldOption from '@plugin_cutomizableitem/components/CustomizableFieldOption';
import CustomizableFileOption from '@plugin_cutomizableitem/components/CustomizableFileOption';
import CustomizableMultipleOption from '@plugin_cutomizableitem/components/CustomizableMultipleOption';
import CustomizableDateOption from '@plugin_cutomizableitem/components/CustomizableDateOption';

const CustomizableOption = ({
    options = [], ...other
}) => (
    <>
        {
            options && options.length > 0
                        && options.map((item, key) => {
                            if (item.__typename === 'CustomizableMultipleOption'
                            && modules.product.customizableOptions.availableOptions.CustomizableMultipleOption) {
                                return <CustomizableMultipleOption key={key} {...item} {...other} />;
                            }

                            if (item.__typename === 'CustomizableCheckboxOption'
                            && modules.product.customizableOptions.availableOptions.CustomizableCheckboxOption) {
                                return <CustomizableCheckboxOption key={key} {...item} {...other} />;
                            }

                            if (item.__typename === 'CustomizableRadioOption'
                            && modules.product.customizableOptions.availableOptions.CustomizableRadioOption) {
                                return <CustomizableRadioOption key={key} {...item} {...other} />;
                            }

                            if (item.__typename === 'CustomizableDropDownOption'
                            && modules.product.customizableOptions.availableOptions.CustomizableDropDownOption) {
                                return <CustomizableDropDownOption key={key} {...item} {...other} />;
                            }

                            if (item.__typename === 'CustomizableAreaOption'
                            && modules.product.customizableOptions.availableOptions.CustomizableAreaOption) {
                                return <CustomizableAreaOption key={key} {...item} {...other} />;
                            }

                            if (item.__typename === 'CustomizableFieldOption'
                            && modules.product.customizableOptions.availableOptions.CustomizableFieldOption) {
                                return <CustomizableFieldOption key={key} {...item} {...other} />;
                            }

                            if (item.__typename === 'CustomizableFileOption'
                            && modules.product.customizableOptions.availableOptions.CustomizableFileOption) {
                                return <CustomizableFileOption key={key} {...item} {...other} />;
                            }

                            if (item.__typename === 'CustomizableDateOption'
                            && modules.product.customizableOptions.availableOptions.CustomizableDateOption) {
                                return <CustomizableDateOption key={key} {...item} {...other} />;
                            }

                            return null;
                        })
        }
    </>
);

export default CustomizableOption;
