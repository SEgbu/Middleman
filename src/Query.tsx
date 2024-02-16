type QueryType = {
    id: string;
    content: string;
};

export const Query = (props: QueryType) => {
    const { content } = props;

    return (
        <div>
            <label htmlFor="info">{content} </label>
            <button id="info">More Info</button>
        </div>
    )
}