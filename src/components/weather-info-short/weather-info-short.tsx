import React, { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './weather-info-short.module.scss';
import Icon, { IconColorsType, IconNameType } from '../icon/icon';

const cn = classNames.bind(styles);
const CLASS_NAME = 'WeatherInfoShort';

type PropsType = {
    time: string;
    temperature: string;
    iconName: IconNameType;
    iconColor: IconColorsType;
    size?: 'small' | 'medium' | 'large';
};

const WeatherInfoShort: FC<PropsType> = ({ time, iconName, iconColor, temperature, size = 'large' }) => {
    return (
        <div
            className={cn(CLASS_NAME, {
                [`${CLASS_NAME}--isSmall`]: size === 'small',
                [`${CLASS_NAME}--isMedium`]: size === 'medium',
                [`${CLASS_NAME}--isLarge`]: size === 'large',
            })}
        >
            <div className={cn(`${CLASS_NAME}__time`)}>{time}</div>
            <div className={cn(`${CLASS_NAME}__icon`)}>
                <Icon name={iconName} color={iconColor} />
            </div>
            <div className={cn(`${CLASS_NAME}__temperature`)}>{temperature}</div>
        </div>
    );
};

export default WeatherInfoShort;
