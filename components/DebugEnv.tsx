import { useEffect } from "react";
import {registerLicense} from "@syncfusion/ej2-base";

function DebugEnv() {
    useEffect(() => {
        registerLicense(import.meta.env.VITE_SYNCFUSION_API_KEY);
        console.log("Syncfusion Key from env:", import.meta.env.VITE_SYNCFUSION_API_KEY);
    }, []);

    return null;
}

export default DebugEnv;