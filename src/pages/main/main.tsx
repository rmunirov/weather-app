import React, { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './main.module.scss';
import { TodayWeather, WeatherByHour, NextDays, Location } from '../../widgets';

const cn = classNames.bind(styles);
const CLASS_NAME = 'MainPage';

const MainPage: FC = () => {
    return (
        <div className={cn(CLASS_NAME)}>
            <div className={cn(`${CLASS_NAME}__location-and-date`)}>
                <Location />
            </div>
            <div className={cn(`${CLASS_NAME}__today-weather`)}>
                <TodayWeather />
            </div>
            <div className={cn(`${CLASS_NAME}__weather-by-hour`)}>
                <WeatherByHour />
            </div>
            <div className={cn(`${CLASS_NAME}__next-days`)}>
                <NextDays />
            </div>
        </div>
    );
};

export default MainPage;
