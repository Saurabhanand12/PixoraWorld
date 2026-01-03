import datauriparser from "datauri/parser.js";
import path from 'path';

const parser =  new datauriparser();

const getdatauri = (file) => {
    const extname = path.extname(file.originalname).toString();
    return parser.format(extname,file.buffer).content;
};
export default getdatauri;