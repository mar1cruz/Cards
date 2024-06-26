import {SyntheticEvent, useState} from 'react';

export const useAccordionState = (initialState: string | false = false) => {
    const [expanded, setExpanded] = useState<string | false>(initialState);

    const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return { expanded, handleChange };
};
