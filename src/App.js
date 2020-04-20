import React from 'react';
import './App.css';
// import Cards from './components/Cards/Cards';
// import Chart from './components/Chart/Chart';
// import CountryPicker from './components/CountryPicker/CountryPicker';
import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api'; 

class App extends React.Component {
    state = {
        data: {},
    }

    async componentDidMount() {
        const data = await fetchData();
        this.setState({ data: data })

        console.log(data)
    }
    
    render() {
        const { data } = this.state;
        return (
            <div className={styles.container}>
                <Cards data={data}/>
                <Chart />
                <CountryPicker />
            </div>
        );
    }
}

export default App;
