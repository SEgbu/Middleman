import { useState } from "react";

type QueryType = {
    data: any;
};

export const Query = (props: QueryType) => {
    const { data } = props;

    const [isInfoShown, setInfoShown] = useState(false);

    return (
        <div>
            <label htmlFor="info">{data.query} </label>
            {
                data.description != "" &&  
                <>
                    <button id="info" onClick={() => {
                        setInfoShown(!isInfoShown);
                    }}>
                        {!isInfoShown ? "More Info" : "Less Info"}
                    </button>

                    {(isInfoShown) && <p>{data.description}</p>}
                </>
            }
        </div>
    )
}