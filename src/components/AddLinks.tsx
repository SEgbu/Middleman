import DOMPurity from "dompurify"

type addLinksType = {
    text : string;
}

export const AddLinks = (props : addLinksType) => {
    const {text} = props;

        //BUG: http links dont work just https
        const linkRegex : RegExp = /(http(|s)?\:\/\/)?(www\.)?[^\s]+\.[^\s]+/g;

        const replacer = (matched : string) => {
            let withProtocol = matched;
            
            if(!withProtocol.startsWith("http")) {
                withProtocol = "http://" + matched;
            }
            
            // BUG: DOM Purify is not allowing links to be open in new tabs
            const newStr = `<a
                rel="noreferrer noopener"
                target="_blank"
                href="${withProtocol}/"
            >
                ${matched}
            </a>`;
            
            return newStr;
        }

        const outString : string = text.replace(linkRegex, replacer); 

        console.log(outString);

        return (
            <div dangerouslySetInnerHTML={{__html: DOMPurity.sanitize(outString)}}>
            </div>
        );
}
