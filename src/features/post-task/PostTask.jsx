import React, { useEffect, useState } from 'react';
import {
  Box,
  Tab,
  Tabs,
  Typography,
  TextField,
  FormControlLabel,
  Button,
  RadioGroup,
  FormControl,
  Radio,
  Divider,
  InputAdornment,
} from '@mui/material';
import styles from './postTask.module.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Laptop, LocationOn, Place } from '@mui/icons-material';

function TabPanel(props) {
  const { children, value, title, index, ...other } = props;
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Typography variant='h6' sx={{ mt: 1 }} className={styles.topTitle}>
        {title}
      </Typography>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function PostTask() {
  const [value, setValue] = useState(0);
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [isFlexibleDate, setIsFlexibleDate] = useState(false);
  const [locationType, setLocationType] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [taskDetails, setTaskDetails] = useState('');
  const [budget, setBudget] = useState('');

  const handleLocationChange = (event) => {
    setLocationType(event.target.value);
  };

  const handleFlexibleDate = () => {
    const newFlexibility = !isFlexibleDate;
    setIsFlexibleDate(newFlexibility);

    if (newFlexibility) {
      setSelectedDate(null);
    }
  };

  const handleDateChange = (newValue) => {
    if (newValue) {
      setIsFlexibleDate(false);
    }
    setSelectedDate(newValue);
  };

  const totalSteps = 4;

  const handleNext = () => {
    if (value < totalSteps - 1) {
      setValue(value + 1);
    }
  };

  const handleBack = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };

  const isStepComplete = () => {
    switch (value) {
      case 0: // Title & Date step
        return (
          taskTitle.trim() !== '' && (selectedDate !== null || isFlexibleDate)
        );
      case 1: // Location step
        return (
          locationType !== '' &&
          (locationType !== 'in-person' || zipCode.trim() !== '')
        );
      case 2: // Details step
        return taskDetails.trim() !== '';
      case 3: // Budget step
        return budget.trim() !== '' && !isNaN(budget) && parseFloat(budget) > 0;
      default:
        return false;
    }
  };

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        height: 'auto',
        bgcolor: 'background.paper',
      }}
      className={styles.tabContainer}
    >
      <Tabs
        orientation='vertical'
        variant='scrollable'
        value={value}
        aria-label='Vertical tabs'
        sx={{ borderRight: 1, borderColor: 'divider' }}
        className={styles.tabTitle}
      >
        <Tab
          label='Title & Date'
          {...a11yProps(0)}
          className={styles.tabButton}
        />
        <Tab label='Location' {...a11yProps(1)} className={styles.tabButton} />
        <Tab label='Details' {...a11yProps(2)} className={styles.tabButton} />
        <Tab label='Budget' {...a11yProps(3)} className={styles.tabButton} />
      </Tabs>
      <Box sx={{ width: '60%' }}>
        <TabPanel
          value={value}
          index={0}
          className={styles.titleTab}
          title="What's your task?"
        >
          <Typography variant='h6' className={styles.tabTitle}>
            In a few words, what do you need done?{' '}
          </Typography>
          <TextField
            fullWidth
            label='Eg: I need to move my sofa'
            variant='outlined'
            margin='normal'
            className={styles.taskTitle}
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />

          <Box>
            <Typography variant='h6' sx={{ mt: 1 }} className={styles.tabTitle}>
              When do you need this done?
            </Typography>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                margin: '2rem 0',
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='Select date'
                  value={selectedDate}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <Divider
                orientation='vertical'
                flexItem
                textAlign='center'
                sx={{ fontSize: '0.8rem', margin: '0 1rem' }}
              >
                OR
              </Divider>
              <Button
                variant='outlined'
                className={styles.flexButton}
                onClick={handleFlexibleDate}
                sx={{
                  backgroundColor: isFlexibleDate ? '#E5BD31' : '#f0f0f0',
                  borderColor: isFlexibleDate ? '#E5BD31' : '#f0f0f0',
                  fontWeight: isFlexibleDate ? 'bold' : 'normal',
                  color: isFlexibleDate ? 'white' : 'black',
                }}
              >
                I'm flexible
              </Button>
            </Box>
          </Box>
        </TabPanel>

        <TabPanel value={value} index={1} title='Where should it be done?'>
          <Typography variant='h6' className={styles.tabTitle}>
            Tell us where
          </Typography>
          <FormControl component='fieldset' sx={{ margin: '1rem' }}>
            <RadioGroup
              row
              value={locationType}
              onChange={handleLocationChange}
            >
              <FormControlLabel
                value='in-person'
                label={
                  <div
                    className={`${styles.optionCard} ${
                      locationType === 'in-person' ? styles.selected : ''
                    }`}
                  >
                    <LocationOn />
                    <Typography variant='body1'>In-person</Typography>
                    <Typography>I need the Flexer physically there</Typography>
                  </div>
                }
                control={<Radio className={styles.hiddenRadio} />}
                className={styles.formControlLabel}
              />
              <FormControlLabel
                value='online'
                label={
                  <div
                    className={`${styles.optionCard} ${
                      locationType === 'online' ? styles.selected : ''
                    }`}
                  >
                    <Laptop />
                    <Typography variant='body1'>Online</Typography>
                    <Typography>The Flexer can do my task from home</Typography>
                  </div>
                }
                control={<Radio className={styles.hiddenRadio} />}
                className={styles.formControlLabel}
              />
            </RadioGroup>
            {locationType === 'in-person' ? (
              <>
                {' '}
                <TextField
                  fullWidth
                  placeholder='Enter your ZIP Code'
                  variant='outlined'
                  className={styles.zipCodeInput}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Place />
                      </InputAdornment>
                    ),
                  }}
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </>
            ) : (
              ''
            )}
          </FormControl>
        </TabPanel>

        <TabPanel
          value={value}
          index={2}
          title='Provide more details
'
        >
          <Typography variant='h6' className={styles.tabTitle}>
            What are the details?
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            label='Write a summary of the key details'
            variant='outlined'
            margin='normal'
            value={taskDetails}
            onChange={(e) => setTaskDetails(e.target.value)}
          />
        </TabPanel>
        <TabPanel value={value} index={3} title='Set your budget'>
          <Typography variant='h6' className={styles.tabTitle}>
            Suggest your budget
          </Typography>
          <TextField
            fullWidth
            label='What is your budget?'
            variant='outlined'
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            margin='normal'
            InputProps={{
              startAdornment: <Typography variant='h6'>$</Typography>,
            }}
          />
        </TabPanel>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color='inherit'
            disabled={value === 0}
            onClick={handleBack}
            sx={{
              mr: 1,
              backgroundColor: value ? '#3FA1CE' : '',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              color: 'white',
            }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button
            variant='contained'
            onClick={handleNext}
            disabled={!isStepComplete()}
            sx={{
              mr: 1,
              backgroundColor: '#080826',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
            }}
          >
            {value === totalSteps - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}