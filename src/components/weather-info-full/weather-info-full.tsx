import React, { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './weather-info-full.module.scss';
import Icon, { IconNameType } from '../icon/icon';
import State from '../state/state';
import { useTranslation } from 'react-i18next';

const cn = classNames.bind(styles);
const CLASS_NAME = 'WetherInfoFull';

export type WetherInfoFullPropsType = {
    date: Date;
    iconName: IconNameType;
    lowTempValue: string;
    highTempValue: string;
    windValue: string;
    rainValue: string;
};

const WeatherInfoFull: FC<WetherInfoFullPropsType> = (props) => {
    const { t, i18n } = useTranslation();
    const dateTitle = `${props.date.getDate()}/${props.date.getMonth() + 1}`;
    const dateValue = props.date.toLocaleDateString(i18n.language, { weekday: 'short' });

    return (
        <div className={cn(CLASS_NAME)}>
            <div className={cn(`${CLASS_NAME}__stats`)}>
                <div className={cn(`${CLASS_NAME}__state`)}>
                    <State data={{ title: dateTitle, value: dateValue }} />
                </div>
                <div className={cn(`${CLASS_NAME}__state`)}>
                    <div className={cn(`${CLASS_NAME}__icon`)}>
                        <Icon name={props.iconName} color="primary" />
                    </div>
                </div>
                <div className={cn(`${CLASS_NAME}__state`)}>
                    <State data={{ title: t('state.low'), value: props.lowTempValue }} />
                </div>
                <div className={cn(`${CLASS_NAME}__state`)}>
                    <State data={{ title: t('state.high'), value: props.highTempValue }} />
                </div>
                <div className={cn(`${CLASS_NAME}__state`)}>
                    <State data={{ title: t('state.wind'), value: props.windValue }} />
                </div>
                <div className={cn(`${CLASS_NAME}__state`)}>
                    <State data={{ title: t('state.precipitation'), value: props.rainValue }} />
                </div>
            </div>
        </div>
    );
};

export default WeatherInfoFull;
