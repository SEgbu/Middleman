import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../../config/Supabase";

type QueryType = {
    data: any;
    onRemove: (id: number) => void;
};

type submissionDataType = {
    filePath: string; 
    queryId: number;
};

export const Query = (props: QueryType) => {
    const { data, onRemove } = props;

    const [isInfoShown, setInfoShown] = useState(false);

    const [queryRemoveError, setQueryRemoveError] = useState<string>("");

    const submissionRef = useRef<HTMLInputElement>(null);

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

    const handleSubmission = async () => {

        if (submissionRef.current && submissionRef.current.files){
            let submissionData : submissionDataType = {
                filePath: "public/"+submissionRef.current.files[0].name,
                queryId: data.id
            }

            const {error} = await supabase
                                        .from("submissions")
                                        .insert({filePath: submissionData.filePath, queryId: submissionData.queryId});

            if (error){
                console.log("Submission Error: " + error.message);
            }
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
            <input type="file" ref={submissionRef} onChange={handleSubmission}/>        </div>
    )
}