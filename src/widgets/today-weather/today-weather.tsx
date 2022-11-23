import React, { FC, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './today-weather.module.scss';
import { CurrentStats, CurrentTemperature, CurrentTemperatureSkeleton, CurrentStatsSkeleton, Banner } from '../../components';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../__data__/store';
import { fetchDayForecast } from '../../__data__/slices/daily-forecast';
import { WeatherCodesEnum } from '../../__data__/constants/weather-codes';
import { IconNameType } from '../../components/icon/icon';
import { getISODate } from '../../utils/date';

const cn = classNames.bind(styles);
const CLASS_NAME = 'TodayWeather';

const TodayWeather: FC = () => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const loading = useAppSelector((store) => store.day.isLoading);
    const error = useAppSelector((store) => store.day.error);
    const forecast = useAppSelector((store) => store.day.data);
    const city = useAppSelector((store) => store.cities.city);

    const today = getISODate();
    const currentHour = new Date().getHours();
    const isDayTime = currentHour > 6 && currentHour < 20;

    useEffect(() => {
        dispatch(fetchDayForecast({ start: today, end: today, location: city }));
    }, [city]);

    if (loading) {
        return (
            <div className={cn(CLASS_NAME)}>
                <CurrentTemperatureSkeleton />
                <CurrentStatsSkeleton />
            </div>
        );
    }

    if (!forecast || error) {
        return <Banner mode="error" value={error ? error : t('info.message')} />;
    }

    const stats = [
        { title: t('state.high'), value: `${Math.round(forecast.daily.temperature_2m_max[0])}°` },
        { title: t('state.wind'), value: `${Math.round(forecast.current_weather.windspeed)}${forecast.daily_units.windspeed_10m_max}` },
        { title: t('state.sunrise'), value: `${forecast.daily.sunrise[0].split('T')[1]}` },
        { title: t('state.low'), value: `${Math.round(forecast.daily.temperature_2m_min[0])}°` },
        { title: t('state.precipitation'), value: `${forecast.daily.rain_sum[0]}${forecast.daily_units.rain_sum}` },
        { title: t('state.sunset'), value: `${forecast.daily.sunset[0].split('T')[1]}` },
    ];

    return (
        <div className={cn(CLASS_NAME)}>
            <CurrentTemperature
                value={Math.round(forecast.current_weather.temperature)}
                state={t(`weatherCode.${WeatherCodesEnum[forecast.current_weather.weathercode]}`)}
                iconName={`${isDayTime ? 'day-' : 'night-'}${WeatherCodesEnum[forecast.current_weather.weathercode]}` as IconNameType}
            />
            <CurrentStats stats={stats} />
        </div>
    );
};

export default TodayWeather;
