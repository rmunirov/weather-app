import React, { FC, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './weather-by-hour.module.scss';
import { useTranslation } from 'react-i18next';
import { WeatherInfoShort, Banner } from '../../components';
import { useAppDispatch, useAppSelector } from '../../__data__/store';
import { fetchHourlyForecast } from '../../__data__/slices';
import { WeatherCodesEnum } from '../../__data__/constants/weather-codes';
import { IconNameType } from '../../components/icon/icon';
import { getISODate } from '../../utils/date';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const cn = classNames.bind(styles);
const CLASS_NAME = 'WeatherByHour';

const WeatherByHour: FC = () => {
    const HOURS_COUNT = 7;
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const loading = useAppSelector((store) => store.hourly.isLoading);
    const error = useAppSelector((store) => store.hourly.error);
    const forecast = useAppSelector((store) => store.hourly.data);
    const city = useAppSelector((store) => store.cities.city);

    useEffect(() => {
        dispatch(fetchHourlyForecast({ start: getISODate(), end: getISODate(1), location: city }));
    }, [city]);

    const currentHour = new Date().getHours();
    const isDayTime = currentHour > 6 && currentHour < 20;
    const elements = [];

    if (loading) {
        return (
            <div className={cn(CLASS_NAME)}>
                <Skeleton containerClassName={cn(`${CLASS_NAME}__title`)} width="30%" />
                <Skeleton containerClassName={cn(`${CLASS_NAME}__items`)} count={7} width="100%" height="150px" />
            </div>
        );
    }

    if (!forecast || error) {
        return <Banner mode="error" value={error ? error : t('info.message')} />;
    }

    for (let i = 0; i < HOURS_COUNT; i++) {
        elements.push(
            <WeatherInfoShort
                key={forecast.hourly.time[currentHour + i]}
                time={new Date(forecast.hourly.time[currentHour + i]).getHours().toString() + ':00'}
                temperature={Math.round(forecast.hourly.temperature_2m[currentHour + i]) + '°'}
                iconName={`${isDayTime ? 'day-' : 'night-'}${WeatherCodesEnum[forecast.hourly.weathercode[i]]}` as IconNameType}
                iconColor="primary"
            />,
        );
    }

    return (
        <div className={cn(CLASS_NAME)}>
            <div className={cn(`${CLASS_NAME}__title`)}>{t('weatherByHour.title')}</div>
            <div className={cn(`${CLASS_NAME}__items`)}>{elements}</div>
        </div>
    );
};

export default WeatherByHour;
