import React, { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './location-and-date.module.scss';
import { CityType } from '../../__data__/model/cities';
import { useTranslation } from 'react-i18next';

const cn = classNames.bind(styles);
const CLASS_NAME = 'LocationAndDate';

type PropsType = {
    city: CityType;
};

const LocationAndDate: FC<PropsType> = ({ city }) => {
    const { i18n } = useTranslation();
    const date = new Date();

    if (!city) {
        return null;
    }

    return (
        <div className={cn(CLASS_NAME)}>
            <div className={cn(`${CLASS_NAME}__location`)}>
                <span>{i18n.language === 'ru' ? city.name : city.english}</span>
            </div>
            <div className={cn(`${CLASS_NAME}__date`)}>
                <span>{date.toLocaleString(i18n.language, { weekday: 'long', day: 'numeric', month: 'long' })}</span>
            </div>
        </div>
    );
};

export default LocationAndDate;
