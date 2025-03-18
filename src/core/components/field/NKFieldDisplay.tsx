import * as React from 'react';

import _get from 'lodash/get';

import FieldBadgeApi from './NKFieldBadgeApi';
import FieldBarCode from './NKFieldBarCode';
import FieldBoolean from './NKFieldBoolean';
import FieldIcon from './NKFieldIcon';
import FieldInputBox from './NKFieldInputBox';
import FieldLink from './NKFieldLink';
import FieldLinkButton from './NKFieldLinkButton';
import FieldLocationCard from './NKFieldLocationCard';
import FieldMultiBadgeApi from './NKFieldMultiBadgeApi';
import FiledMultipleImage from './NKFieldMultipleImages';
import FieldMultipleText from './NKFieldMultipleText';
import FieldNumber from './NKFieldNumber';
import FieldRating from './NKFieldRating';
import FieldRichText from './NKFieldRichText';
import FieldText from './NKFieldText';
import FieldThumbnail from './NKFieldThumbnail';
import FieldTime from './NKFieldTime';
import FieldUuid from './NKFieldUuid';

export enum FieldType {
    UUID = 'uuid',
    TEXT = 'text',
    NUMBER = 'number',
    MULTILINE_TEXT = 'multiline_text',
    BOOLEAN = 'boolean',
    THUMBNAIL = 'thumbnail',
    MULTIPLE_IMAGES = 'multiple_images',
    RICH_TEXT = 'rich_text',
    TIME_FULL = 'time_full',
    TIME_DATE = 'time_date',
    TIME_HOUR = 'time_hour',
    LINK_BUTTON = 'link_button',
    LINK = 'link',
    LENGTH = 'length',
    BADGE_API = 'badge_api',
    MULTI_BADGE_API = 'multi_badge_api',
    QR_CODE = 'qr_code',
    BAR_CODE = 'bar_code',
    INPUT_BOX = 'input_box',
    ICON = 'icon',
    LOCATION_CARD = 'location_card',
    CUSTOM = 'custom',
    RATING = 'rating',
}

interface FieldDisplayProps {
    type: FieldType;
    value: any;
    apiAction?: (value: any) => any;
    formatter?: (value: any) => any;
}

const FieldDisplay: React.FC<FieldDisplayProps> = ({ type, value, apiAction, formatter }) => {
    if (formatter) {
        value = formatter(value);
    }

    switch (type) {
        case FieldType.UUID:
            return <FieldUuid value={value} />;
        case FieldType.TEXT:
            return <FieldText value={value} />;
        case FieldType.TIME_FULL:
            return <FieldTime value={value} format="DD/MM/YYYY HH:mm:ss" />;
        case FieldType.TIME_DATE:
            return <FieldTime value={value} format="DD/MM/YYYY" />;
        case FieldType.TIME_HOUR:
            return <FieldTime value={value} format="HH:mm:ss" />;
        case FieldType.BOOLEAN:
            return <FieldBoolean value={value} />;
        case FieldType.LINK_BUTTON:
            return <FieldLinkButton value={value} />;
        case FieldType.THUMBNAIL:
            return <FieldThumbnail value={value} />;
        case FieldType.MULTIPLE_IMAGES:
            return <FiledMultipleImage value={value} />;
        case FieldType.MULTILINE_TEXT:
            return <FieldMultipleText value={value} />;
        case FieldType.NUMBER:
            return <FieldNumber value={value} />;
        case FieldType.LINK:
            return <FieldLink value={value} apiAction={apiAction} />;
        case FieldType.BADGE_API:
            return <FieldBadgeApi value={value} apiAction={apiAction} />;
        case FieldType.RICH_TEXT:
            return <FieldRichText value={value} />;
        case FieldType.BAR_CODE:
            return <FieldBarCode value={value} />;
        case FieldType.INPUT_BOX:
            return <FieldInputBox value={value} />;
        case FieldType.ICON:
            return <FieldIcon value={value} />;
        case FieldType.LOCATION_CARD:
            return <FieldLocationCard value={value} />;
        case FieldType.MULTI_BADGE_API:
            return <FieldMultiBadgeApi value={value} apiAction={apiAction} />;
        case FieldType.LENGTH:
            const length = _get(value, 'length', 0);
            return <FieldText value={length} />;
        case FieldType.CUSTOM:
            return apiAction ? apiAction(value) : value;
        case FieldType.RATING:
            return <FieldRating value={value} />;
    }
};

export default FieldDisplay;
