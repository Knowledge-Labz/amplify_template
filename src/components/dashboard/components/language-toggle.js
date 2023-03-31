import LanguageIcon from '@mui/icons-material/Language';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { useAppStore } from 'src/store/app-store';

export default function LanguageToggle() {
  let [iFaceLang, setIFaceLang] = useAppStore((state) => [state.iFaceLang, state.setIFaceLang]);
  return (
    <Tooltip title={iFaceLang === "fr" ? "Switch to English" : "Continuer en français"}>
        <IconButton
            color={iFaceLang === "fr" ? "error" : "primary"}
            aria-label="toggle language"
            onClick={() => {
                setIFaceLang(iFaceLang === "en" ? "fr" : "en");
            }}
        >
            <LanguageIcon fontSize="large"/>
        </IconButton>
    </Tooltip>
  );
}