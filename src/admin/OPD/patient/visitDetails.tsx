import { useEffect } from "react";
import { useParams } from "react-router-dom";

const VisitDetails = () => {

    const path = useParams()

    useEffect(()=>{
        console.log(path);
    },[])

    return (
        <div>Visit Details</div>
    )
}

export default VisitDetails