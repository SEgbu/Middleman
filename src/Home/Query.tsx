import { useEffect, useRef, useState } from "react";
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

    const [submissionsCount, setSubmissionCount] = useState<number>(0);

    const submissionRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchMySubmissionFile = async () => {
            if (submissionRef.current && submissionRef.current.files) {
                const { data: submissionInfo, error: submissionInfoError } = await supabase
                    .from("submissions")
                    .select()
                    .eq("queryId", data.id);

                if (submissionInfoError) {
                    console.log("Retrieve Submission Info Error: " + submissionInfoError?.message);
                }
                else {
                    setSubmissionCount(submissionInfo.length)
                }

            }
        }
        fetchMySubmissionFile();
    }, [])

    const handleRemove = async () => {
        const { error } = await supabase
            .from("queries")
            .delete()
            .eq("id", data.id);

        if (error) {
            setQueryRemoveError("Can't remove query");
            console.log(queryRemoveError + ": " + error.message);
        }
        else {
            onRemove(data.id);
        }
    }

    const handleSubmission = async () => {
        // insert submission info and upload submission file to storage
        if (submissionRef.current && submissionRef.current.files) {
            let submissionData: submissionDataType = {
                filePath: "public/" + submissionRef.current.files[0].name,
                queryId: data.id
            }

            const { error: uploadError } = await supabase
                .storage
                .from("submissions")
                .upload(submissionData.filePath, submissionRef.current.files[0], { cacheControl: "3600", upsert: false });

            if (uploadError) {
                console.log("Submission Upload Error: " + uploadError.message)
            }
            else {
                const { error: insertError } = await supabase
                .from("submissions")
                .insert({ filePath: submissionData.filePath, queryId: submissionData.queryId });

                if (insertError) {
                    console.log("Submission Insert Error: " + insertError.message);
                }
                else {
                    setSubmissionCount(submissionsCount + 1)
                }
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
            <span> Submission Counter: {submissionsCount} </span>
            <input type="file" id="submission" ref={submissionRef} onChange={handleSubmission} />
        </div>
    )
}