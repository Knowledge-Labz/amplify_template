import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { motion } from "framer-motion";
import { useAppStore } from 'src/store/app-store';
import CreationForm from 'src/components/dashboard/creation-form';
import LanguageToggle from 'src/components/dashboard/components/language-toggle';
import Toaster from './components/toaster';
import { i18nStrings } from 'src/i18n/strings';

export const DashboardView = ({ ...rest }) => {
  let [elevation, setElevation] = React.useState(6);
  // taking what we need from the store
  let [
    iFaceMode, 
    iFaceLang
  ] = useAppStore((state) => [
    state.iFaceMode,  
    state.iFaceLang
  ]);
  
  return (
    // Box is main container
    <Box>
        {/** motion div manages animation of its children content */}
        <motion.div
            initial={{ y: "80%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ type: "spring", stiffness: 90 }}
            style={{ textAlign: "center" }}
        >
          {/** Paper here is the sheet-like display windows that casts a shadow on the background */}
          <Paper
            onMouseEnter={() => setElevation(14)}
            onMouseLeave={() => setElevation(6)}
            elevation={elevation} 
            sx={{ width: '60%', mb: 2, ml: "20%", mr: "20%" }}
          >
            {/** Grid the content. Every container can contain items. One "line" is split into 12 segments and represents the full width of the parent container. An item can be a container and split its own size as grid items */}
            <Grid container spacing={0}>
              {/** Emptyness, taking 11/12 of the space from the left */}
              <Grid item xs={10} md={11}>
              </Grid>
              {/** Final item of the Grid line, taking the last 12th of space (so full right of container) */}
              <Grid item xs={2} md={1}>
                <motion.div
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.75
                  }}
                >
                  {/** Language toggle iconbutton */}
                  <LanguageToggle/>
                </motion.div>
              </Grid>
              {/** Grid item taking the full Grid line (12 segments) */}
              <Grid item xs={12} md={12}>
                <h2>{i18nStrings[iFaceLang].dashboard.create.title}</h2>
              </Grid>
              {/** Render the Form inside parent Grid */}
              <CreationForm />
            </Grid>
          </Paper>
        </motion.div>
      <Toaster/>
    </Box>
  );
};