import React from 'react';
import './App.css';
import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';
import coronaImage from './image/covid.png'
import { Typography, Grid } from '@material-ui/core'

class App extends React.Component {
    state = {
        data: {},
        country: ''
    }

    async componentDidMount() {
        const data = await fetchData();
        this.setState({ data: data })
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        this.setState({ data: fetchedData, country: country })
    }
    render() {
        const { data, country } = this.state;
        return (
            <div className={styles.container}>
                <Grid item xs={12}>
                    <img className={styles.image} src={coronaImage} alt="Covid-19"/>
                    <Typography variant="h5">Covid-19</Typography>
                </Grid>
                <Cards data={data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>
            </div>
        );
    }
}

export default App;
