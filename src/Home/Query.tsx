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
        const { error : errorInSubmissionDatabase} = await supabase 
                                .from("submissions")
                                .delete()
                                .eq("queryId", data.id);

        if(errorInSubmissionDatabase) {
            console.log("Deletion Error in Submission Database: "+ errorInSubmissionDatabase.message);
        }

        const { data : listOfSubmissionData, error : listOfSubmissionsError } = await supabase
                                                                    .storage
                                                                    .from('submissions')
                                                                    .list(data.id, {
                                                                        limit: 100,
                                                                        offset: 0,
                                                                        sortBy: { column: 'name', order: 'asc' },
                                                                    })

        if (listOfSubmissionsError) {
            console.log("Couldn't print out list of submission in storage: " + listOfSubmissionsError);
        }
        else if (listOfSubmissionData){
            const { error : errorInStorage } = await supabase
                                            .storage
                                            .from('submissions')
                                            .remove(listOfSubmissionData.map(sd => data.id + "/" + sd.name));
            
            if (errorInStorage) {
                console.log("Deletion error for storage bucket: "+ errorInStorage.message);
            }
        }

        const { error : errorInQueryDatabase} = await supabase
            .from("queries")
            .delete()
            .eq("id", data.id);

        if (errorInQueryDatabase) {
            setQueryRemoveError("Can't remove query");
            console.log(queryRemoveError + ": " + errorInQueryDatabase.message);
        }
        else {
            onRemove(data.id);
        }
    
    }

    const handleSubmission = async () => {
        // insert submission info and upload submission file to storage
        if (submissionRef.current && submissionRef.current.files) {
            let submissionData: submissionDataType = {
                filePath: data.id +"/" + submissionRef.current.files[0].name,
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