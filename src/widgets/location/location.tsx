import React, { FC, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './location.module.scss';
import { FindCity, LocationAndDate } from '../../components';
import { useAppSelector } from '../../__data__/store';

const cn = classNames.bind(styles);
const CLASS_NAME = 'Location';

const Location: FC = () => {
    const [edit, setEdit] = useState(false);

    const city = useAppSelector((store) => store.cities.city);

    const handleClick = () => {
        setEdit(true);
    };

    const handleSelectCity = () => {
        setEdit(false);
    };

    if (!city) {
        return <FindCity selected={handleSelectCity} />;
    }

    return (
        <div className={cn(CLASS_NAME)} onClick={handleClick}>
            {edit ? <FindCity selected={handleSelectCity} /> : <LocationAndDate city={city} />}
        </div>
    );
};

export default Location;
