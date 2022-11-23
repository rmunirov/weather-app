import React, { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './current-temperature.module.scss';
import Icon, { IconNameType } from '../icon/icon';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const cn = classNames.bind(styles);
const CLASS_NAME = 'CurrentTemperature';

type PropsType = {
    value: number;
    state: string;
    iconName: IconNameType;
};

export const CurrentTemperatureSkeleton: FC = () => {
    return (
        <div className={cn(CLASS_NAME)}>
            <div className={cn(`${CLASS_NAME}__picture`)}>
                <Skeleton circle height="100%" />
            </div>
            <div className={cn(`${CLASS_NAME}__temperature`)}>
                <div className={cn(`${CLASS_NAME}__temperature__value`)}>
                    <Skeleton width="100px" />
                </div>
                <div className={cn(`${CLASS_NAME}__temperature__state`)}>
                    <Skeleton width="100px" />
                </div>
            </div>
        </div>
    );
};

const CurrentTemperature: FC<PropsType> = ({ value, state, iconName }) => {
    return (
        <div className={cn(CLASS_NAME)}>
            <div className={cn(`${CLASS_NAME}__picture`)}>
                <Icon name={iconName} color="primary" />
            </div>
            <div className={cn(`${CLASS_NAME}__temperature`)}>
                <div className={cn(`${CLASS_NAME}__temperature__value`)}>
                    <span>{value + '°'}</span>
                </div>
                <div className={cn(`${CLASS_NAME}__temperature__state`)}>
                    <span>{state}</span>
                </div>
            </div>
        </div>
    );
};

export default CurrentTemperature;
