import { queryDataType } from "./QueryInput";

type QueryWindowProps = {
    handleSubmit : any;
    setQueryData : React.Dispatch<React.SetStateAction<queryDataType>>;
}

export const QueryWindow = (props : QueryWindowProps) => {
    const {handleSubmit, setQueryData} = props;

    return (
        <>
            {/* TODO: Check for empty field and don't allow submit if so */}
            {/* TODO: If max people field is empty then create another block of jsx saying btw max people will be set to infinity */}
            <form onSubmit={handleSubmit}>
                <label htmlFor="queryWindowTitle">Query: </label>
                <input type="text" id="queryWindowTitle" onChange={(e) => setQueryData(qd => ({...qd, query: e.target.value}))}/>
                <br />
                <label htmlFor="queryWindowDescription">Description: </label>
                <textarea id="queryWindowDescription" onChange={(e) => setQueryData(qd => ({...qd, description: e.target.value}))}></textarea>
                <br />
                <label htmlFor="queryWindowMaxPeople">Max People: </label>
                <input type="number" id="queryWindowMaxPeople" onChange={(e) => setQueryData(qd => ({...qd, maxPeople: Number(e.target.value)}))}></input>
                <label htmlFor="queryWindowReward" defaultValue={2}>Reward: </label>
                <input type="number" id="queryWindowReward" onChange={(e) => setQueryData(qd => ({...qd, reward: Number(e.target.value)}))}></input>
                <br />
                <input type="submit" value="Submit" />
            </form>
        </>
    );
}