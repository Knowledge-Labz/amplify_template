import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import { useAppStore } from 'src/store/app-store';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { i18nStrings } from 'src/i18n/strings';
import TextField from '@mui/material/TextField';
import SearchableDropdown from './components/searchable-dropdown';
import SearchableDropdownSingle from './components/searchable-dropdown-single';
import CreationStepper from './components/creation-stepper';
import { motion } from "framer-motion";
import { useState } from 'react';

export default function CreationForm() {
    let [ 
        // state vars
        iFaceLang,
        isLoading,
        currentStep,  
        RWUsers,
        ROUsers,
        HUsers,
        // state functions
        addToast,
        setIsLoading,
        setCurrentStep,
        setRWUsers,
        setROUsers,
        setHUsers
    ]  = useAppStore((state) => [ 
        state.iFaceLang,
        state.isLoading,
        state.currentStep,
        state.RWUsers,
        state.ROUsers,
        state.HUsers,
        // state functions
        state.addToast,
        state.setIsLoading,
        state.setCurrentStep,
        state.setRWUsers,
        state.setROUsers,
        state.setHUsers
        ]);
        const [dummy, setDummy] = useState("");
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <br/><br/>
            </Grid>
            <Grid item xs={2} md={1}>
                <motion.div
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.75
                    }}
                >
                    {/** The back-arrow button to return to previous step */}
                    <IconButton
                        onClick={() => {
                            if (currentStep > 0) {
                                setCurrentStep(currentStep - 1);
                            }
                        }}
                        disabled={isLoading || currentStep === 0 || currentStep === 5}>
                        <ArrowBackIcon />
                    </IconButton>
                </motion.div>
            </Grid>
            <Grid item xs={8} md={10}>
                <motion.div
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 1
                    }}
      >
            {
            // step 0: collection name
            currentStep === 0 ?
                <TextField 
                    style={{width: '66%'}}
                    label={i18nStrings[iFaceLang].dashboard.create.collectionNameLabel}
                    placeholder={i18nStrings[iFaceLang].dashboard.create.collectionNamePlaceholder}
                    variant="standard" 
                    setFunction={setDummy}
                    disabled={isLoading}/>
             : <></>}
            {
            // step 1: collection owner
            currentStep === 1 ?
                <SearchableDropdownSingle 
                    labelValue={i18nStrings[iFaceLang].dashboard.create.collectionOwnerLabel} 
                    placeholderValue={i18nStrings[iFaceLang].dashboard.create.collectionOwnerPlaceholder}
                    setFunction={setDummy} 
                    disabled={isLoading}/>
              : 
                <></>
            }
            {
            // step 2: RW users
            currentStep === 2 ?
                <SearchableDropdown 
                    labelValue={i18nStrings[iFaceLang].dashboard.create.RWUsersLabel} 
                    placeholderValue={i18nStrings[iFaceLang].dashboard.create.RWUsersPlaceholder}
                    setFunction={setRWUsers} 
                    disabled={isLoading}/>
              : 
                <></>
            }
            {
            // step 3: RO users
            currentStep === 3 ?
                <SearchableDropdown 
                    labelValue={i18nStrings[iFaceLang].dashboard.create.ROUsersLabel} 
                    placeholderValue={i18nStrings[iFaceLang].dashboard.create.ROUsersPlaceholder}
                    setFunction={setROUsers} 
                    disabled={isLoading}/>
              : 
                <></>
            }
            {
            // step 4: H users
            currentStep === 4 ?
                <SearchableDropdown 
                    labelValue={i18nStrings[iFaceLang].dashboard.create.HUsersLabel} 
                    placeholderValue={i18nStrings[iFaceLang].dashboard.create.HUsersPlaceholder}
                    setFunction={setHUsers} 
                    disabled={isLoading}/>
              : 
                <></>
            }
            </motion.div>
            </Grid>
            <Grid item xs={2} md={1}>
                <motion.div
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 1.25
                    }}
                    >
                    {/** The forward-arrow button to advance to next step and start the creation process if last step is reached */}
                    <IconButton
                        onClick={() => {
                            if (currentStep < 4) {
                                setCurrentStep(currentStep + 1);
                            } else {
                                console.log('create group');
                                setIsLoading(true);
                                setCurrentStep(5);
                                addToast({'message': i18nStrings[iFaceLang].notifications.create_azure_groups.launch});
                                // wait 5 seconds, add success toast
                                setTimeout(() => {
                                    addToast({'message': i18nStrings[iFaceLang].notifications.create_azure_groups.success});
                                    setIsLoading(false);
                                    setCurrentStep(0);
                                }, 5000);
                            }
                        }}
                        disabled={isLoading}>
                        <ArrowForwardIcon />
                    </IconButton>
                </motion.div>
            </Grid>
            <br/><br/><br/><br/>
            <Grid item xs={12} md={12}>
                {/** The stepper component to show the current step */}
                <CreationStepper/>
            </Grid>
            <Grid item xs={12} md={12}>
                {/** The loading bar to show when the creation process is running */}
                {isLoading ? <LinearProgress /> : <></>}
            </Grid>
        </Grid>
    );
}