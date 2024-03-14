import DOMPurity from "dompurify"

type addLinksType = {
    text : string;
}

export const AddLinks = (props : addLinksType) => {
    const {text} = props;

        const linkRegex : RegExp = /(https?\:\/\/)?(www\.)?[^\s]+\.[^\s]+/g;

        const replacer = (matched : string) => {
            let withProtocol = matched;
            
            if(!withProtocol.startsWith("http")) {
                withProtocol = "http://" + matched;
            }
           
            const newStr = `<a
                class="text-link"
                href="${withProtocol}"
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
