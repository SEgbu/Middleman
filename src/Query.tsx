import { useState } from "react";

type QueryType = {
    id: string;
    data: string;
};

export const Query = (props: QueryType) => {
    const { data: stringData } = props;

    const data = JSON.parse(stringData);

    const [isInfoShown, setInfoShown] = useState(false);

    return (
        <div>
            <label htmlFor="info">{data.query} </label>

            {data.description != "" ?
                <>
                    <button id="info" onClick={() => {
                        setInfoShown(!isInfoShown);
                    }}>{!isInfoShown ? "More Info" : "Less Info"}</button>

                    {(isInfoShown) ? <p>{data.description}</p>
                        : null}
                </>
                : null}
        </div>
    )
}