import React, { FC, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './find-city.module.scss';
import { useAppDispatch, useAppSelector } from '../../__data__/store';
import { fetchCities } from '../../__data__/slices';
import { citiesActions } from '../../__data__/slices/cities';
import { useTranslation } from 'react-i18next';

const cn = classNames.bind(styles);
const CLASS_NAME = 'FindCity';

type PropsType = {
    selected: () => void;
};

const FindCity: FC<PropsType> = ({ selected }) => {
    const [city, setCity] = useState('');
    const { t } = useTranslation();

    const dispatch = useAppDispatch();
    const error = useAppSelector((store) => store.cities.error);
    // TODO mb do true only when first loading, after always false
    // const loading = useAppSelector((store) => store.cities.isLoading);
    const cities = useAppSelector((store) => store.cities.cities);

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setCity(value);

        const element = cities?.find((item) => item.full_name === value);
        if (element) {
            dispatch(citiesActions.updateCity(element));
            selected();
        } else if (value.length >= 2) {
            dispatch(fetchCities(value));
        }
    };

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    if (error && !cities) {
        return <div>Error...</div>;
    }

    return (
        <div className={cn(CLASS_NAME)}>
            <input
                list="cities"
                value={city}
                onChange={handleValueChange}
                onClick={() => setCity('')}
                placeholder={t('findCity.placeholder')}
            />
            <datalist id="cities" className={cn(`${CLASS_NAME}__datalist`)}>
                {cities &&
                    cities.map((item) => {
                        return <option key={item.id} value={item.full_name} />;
                    })}
            </datalist>
        </div>
    );
};

export default FindCity;
