import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2'
import styles from './Chart.module.css'
import cx from 'classnames'
import { AppBar, Tabs, Tab, Typography, Box, makeStyles } from '@material-ui/core';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#fff',
        // backgroundColor: theme.palette.background.paper,
    },
}));

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
    const [dailyData, setDailyData] = useState({})
    const classes = useStyles();
    const [value, setValue] = useState(0);
    useEffect(() => {
        const fetchApi = async () => {
            setDailyData(await fetchDailyData())
        }

        fetchApi()
    }, [])

    const lineChart = (
        dailyData.length ?
            (
                <Line
                    data={{
                        labels: dailyData.map(({ date }) => date),
                        datasets: [{
                            data: dailyData.map(({ confirmed }) => confirmed),
                            label: 'Infected',
                            borderColor: 'rgb(116, 28, 176, 1)',
                            fill: true,
                        }, {
                            data: dailyData.map(({ deaths }) => deaths),
                            label: 'Deaths',
                            borderColor: 'rgb(233, 30, 99)',
                            fill: true,
                        }],
                    }}
                />
            ) : null
    )

    const barChart = (
        confirmed ?
            (
                <Bar
                    data={{
                        labels: ['Infected', 'Recovered', 'Deaths'],
                        datasets: [{
                            label: 'People',
                            backgroundColor: ['rgb(116, 28, 176, 1)', 'rgb(76, 175, 80)', 'rgb(233, 30, 99)'],
                            data: [confirmed.value, recovered.value, deaths.value]
                        }],
                    }}
                    options={{
                        legend: { display: false },
                        title: { display: true, text: `Country state in ${country}` }
                    }}
                />
            ) : null
    )

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={cx(styles.container, classes.root)}>
            {/* {country ? barChart : lineChart} */}
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="" indicatorColor="dark" textColor="white">
                    <Tab label="Chart/Bar" {...a11yProps(0)} />
                    {/* <Tab label="Country" {...a11yProps(1)} /> */}
                    <Tab label="Table" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                {country ? barChart : lineChart}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {/* {barChart} */}
                {country ? barChart : 'Please Select A Country'}
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
        </div>
    );
};

export default Chart;