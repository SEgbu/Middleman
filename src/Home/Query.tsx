import { useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../../config/Supabase";

type QueryType = {
    data: any;
    onRemove: (id: number) => void;
};

export const Query = (props: QueryType) => {
    const { data, onRemove } = props;

    const [isInfoShown, setInfoShown] = useState(false);

    const [queryRemoveError, setQueryRemoveError] = useState<string>("");

    const handleRemove = async () => {
        const {error} = await supabase
                                .from("queries")
                                .delete()
                                .eq("id", data.id);

        if (error){
            setQueryRemoveError("Can't remove query");
            console.log(queryRemoveError + ": " + error.message);
        }
        else {
            onRemove(data.id);
        }
    }

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
            <button onClick={handleRemove}>Remove</button>
            <Link to="/edit" state={data}><button>Edit</button></Link>

        </div>
    )
}