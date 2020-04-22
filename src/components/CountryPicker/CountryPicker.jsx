import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core'
import styles from './CountryPicker.module.css'
import { fetchCountries } from '../../api';

const CountryPicker = ({ handleCountryChange }) => {
    const [fetchAllCountries, setFetchCountries] = useState([])
    useEffect(() => {
        const fetchCountry = async () => {
            setFetchCountries(await fetchCountries())
        }

        fetchCountry();
    }, [setFetchCountries])
    return (
        <div className={styles.formControl}>
            <FormControl>
                <NativeSelect defaultValue="" onChange={e => handleCountryChange(e.target.value)}>
                    <option value="">Global</option>
                    {
                        fetchAllCountries.map((country, index) => <option value={country.name} key={index} data-thumbnail="https://www.countryflags.io/BD/shiny/64.png">{country.name}-{country.iso}</option>)
                    }
                </NativeSelect>
            </FormControl>
        </div>
    );
};

export default CountryPicker;