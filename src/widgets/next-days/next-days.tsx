import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './next-days.module.scss';
import WeatherInfoFull from '../../components/weather-info-full/weather-info-full';
import { useWindowSize, WindowSizeType } from '../../hooks';
import { BreakpointsEnum } from '../../__data__/constants/breakpoints';
import WeatherInfoShort from '../../components/weather-info-short/weather-info-short';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../__data__/store';
import { fetchDaysForecast } from '../../__data__/slices/daily-forecast';
import { WeatherCodesEnum } from '../../__data__/constants/weather-codes';
import { IconNameType } from '../../components/icon/icon';
import { getISODate } from '../../utils/date';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Banner } from '../../components';

const cn = classNames.bind(styles);
const CLASS_NAME = 'NextDays';
// TODO sometimes back get only one record
const NextDays: FC = () => {
    const MAX_DAYS_TO_SHOW = 5;
    const windowSize: WindowSizeType = useWindowSize();
    const { t, i18n } = useTranslation();
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [screenSize, setScreenSize] = useState<'small' | 'medium'>('medium');

    const dispatch = useAppDispatch();

    const loading = useAppSelector((store) => store.days.isLoading);
    const error = useAppSelector((store) => store.days.error);
    const forecast = useAppSelector((store) => store.days.data);
    const city = useAppSelector((store) => store.cities.city);

    useEffect(() => {
        dispatch(fetchDaysForecast({ start: getISODate(1), end: getISODate(5), location: city }));
    }, [city]);

    useEffect(() => {
        if (windowSize.width < BreakpointsEnum.phoneSmall) {
            setIsMobile(true);
            setScreenSize('small');
        } else if (windowSize.width < BreakpointsEnum.phoneMedium) {
            setIsMobile(true);
            setScreenSize('medium');
        } else {
            setIsMobile(false);
        }
    }, [windowSize.width]);

    if (loading) {
        return (
            <div className={cn(CLASS_NAME)}>
                <Skeleton containerClassName={cn(`${CLASS_NAME}__title`)} width="30%" />
                <Skeleton containerClassName={cn(`${CLASS_NAME}__items`)} count={5} width="100%" height="38px" />
            </div>
        );
    }

    if (!forecast || error) {
        return <Banner mode="error" value={error ? error : t('info.message')} />;
    }

    const infoShort = [];
    const infoFull = [];
    for (let i = 0; i < forecast.daily.time.length; i++) {
        if (i >= MAX_DAYS_TO_SHOW) {
            break;
        }
        infoShort.push(
            <WeatherInfoShort
                key={forecast.daily.time[i]}
                time={new Date(forecast.daily.time[i]).toLocaleDateString(i18n.language, { weekday: 'short' })}
                temperature={`${Math.round(forecast.daily.temperature_2m_min[i])}/${Math.round(forecast.daily.temperature_2m_max[i])}`}
                iconName={`day-${WeatherCodesEnum[forecast.daily.weathercode[i]]}` as IconNameType}
                iconColor="primary"
                size={screenSize}
            />,
        );
        infoFull.push(
            <WeatherInfoFull
                key={forecast.daily.time[i]}
                date={new Date(forecast.daily.time[i])}
                highTempValue={`${Math.round(forecast.daily.temperature_2m_max[i])}°`}
                lowTempValue={`${Math.round(forecast.daily.temperature_2m_min[i])}°`}
                rainValue={`${forecast.daily.rain_sum[i]} ${forecast.daily_units.rain_sum}`}
                windValue={`${Math.round(forecast.daily.windspeed_10m_max[i])} ${forecast.daily_units.windspeed_10m_max}`}
                iconName={`day-${WeatherCodesEnum[forecast.daily.weathercode[i]]}` as IconNameType}
            />,
        );
    }

    return (
        <div className={cn(CLASS_NAME)}>
            <div className={cn(`${CLASS_NAME}__title`)}>{t('nextDays.title')}</div>
            <div className={cn(`${CLASS_NAME}__items`)}>{isMobile ? infoShort : infoFull}</div>
        </div>
    );
};

export default NextDays;
