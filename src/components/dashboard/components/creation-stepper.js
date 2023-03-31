import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useAppStore } from 'src/store/app-store';
import { i18nStrings } from 'src/i18n/strings';
import { motion } from "framer-motion";

export default function CreationStepper() {
  let [
    iFaceLang,
    currentStep
  ] = useAppStore((state) => [
    state.iFaceLang,
    state.currentStep
  ]);

  let steps = [
    {
      "fr": i18nStrings["fr"].dashboard.create.stepper.step1,
      "en": i18nStrings["en"].dashboard.create.stepper.step1
    },
    {
      "fr": i18nStrings["fr"].dashboard.create.stepper.step2,
      "en": i18nStrings["en"].dashboard.create.stepper.step2
    },
    {
      "fr": i18nStrings["fr"].dashboard.create.stepper.step3,
      "en": i18nStrings["en"].dashboard.create.stepper.step3
    },
    {
      "fr": i18nStrings["fr"].dashboard.create.stepper.step4,
      "en": i18nStrings["en"].dashboard.create.stepper.step4
    },
    {
      "fr": i18nStrings["fr"].dashboard.create.stepper.step5,
      "en": i18nStrings["en"].dashboard.create.stepper.step5
    }
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.75
      }}
      >
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={currentStep} alternativeLabel>
          {steps.map((label, idx) => (
            <Step key={idx}>
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
                  delay: (0.1 * idx) + 0.75
                }}
            >
              <StepLabel>{label[iFaceLang]}</StepLabel>
              </motion.div>
            </Step>
            
          ))}
        </Stepper>
      </Box>
    </motion.div>
  );
}